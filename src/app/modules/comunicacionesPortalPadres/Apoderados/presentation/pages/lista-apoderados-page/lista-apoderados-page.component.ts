import { RequestListaApoderados } from './../../../aplication/dto/request/listaApoderado.request';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apoderado as DomainApoderado } from '../../../domain/entities/apoderado.model';
import { ApoderadoApiService } from '../../../infraestructure/api/apoderado-api.service';
import { ResponseListaApoderados } from '../../../aplication/dto/response/listaApoderado.response';
import { map, Observable, Subscription, of, catchError, timeout, finalize, BehaviorSubject } from 'rxjs';
import { WebSocketServiceService } from '../../../infraestructure/websocket/web-socket-service.service';
import { ApoderadoModel } from '../../../aplication/dto/apoderado.dto';

// ========================================================================
// 1. INTERFACES Y TIPADO
// ========================================================================

// Define la interfaz de filtros para Apoderados
interface ApoderadoFilters {
  apoderado: string | null;
  grado: string | null;
  seccion: string | null;
  vinculo: 'Madre' | 'Padre' | 'Tutor' | null;
    estadoContacto: 'Verificado' | 'Pendiente' | null;
    estado: number; // 0 = Inhabilitados, 1 = Activos, 2 = Todos
}


@Component({
  selector: 'app-lista-apoderados-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-apoderados-page.component.html',
  styleUrls: ['./lista-apoderados-page.component.css'],
})
export class ListaApoderadosPageComponent {

  // ========================================================================
  // ========================================================================
  // 1. INYECCIÓN DE SERVICIOS
  // ========================================================================

  // Router para navegación entre páginas
  private router = inject(Router);
  // Servicio de capa de aplicación que consume la API REST de apoderados
  private apoderadoService = inject(ApoderadoApiService);
  // Servicio de WebSocket (STOMP/SockJS) para recibir actualizaciones en tiempo real
  private wsService = inject(WebSocketServiceService);


  // ========================================================================
  // 2. PROPIEDADES DEL COMPONENTE
  // ========================================================================

  // Opciones de datos maestros (omito la definición por brevedad)
  estados: number[] = [0,1, 2];
  grados: string[] = ['1ro', '2do', '3ro', '4to', '5to'];
  secciones: string[] = ['A', 'B', 'C'];
  vinculos: ('Madre' | 'Padre' | 'Tutor')[] = ['Madre', 'Padre', 'Tutor'];
  estadosContacto: ('Verificado' | 'Pendiente')[] = ['Verificado', 'Pendiente'];

  // Estado actual de los filtros (omito por brevedad)
  filters: ApoderadoFilters = {
    apoderado: null,
    grado: null,
    seccion: null,
    vinculo: null,
     estadoContacto: null,
     estado: 2,
  };

  // ========================================================================
  // 3. DECLARACIONES DE VARIABLES
  // ========================================================================

  private apoderadosSubject = new BehaviorSubject<ApoderadoModel[]>([]);
  apoderadosData$: Observable<ApoderadoModel[]> = this.apoderadosSubject.asObservable();
  private wsSub: Subscription | null = null;
  private wsStatusSub: Subscription | null = null;
  isLoading: boolean = false;
  private reloadTimer: any = null;
  isWsConnected: boolean = false;

  // Alertas y UX
  errorMessage: string | null = null;
  showNewAlert: boolean = false;
  newAlertMessage: string | null = null;
  private alertTimer: any = null;
  private initialLoadDone: boolean = false;

  ngOnInit(): void {
    this.listarApoderados();
    // Intentar una sola conexión al iniciar (evita reintentos continuos si /ws/info falla)
    this.wsService.connectOnce();
    // Conectamos al stream de WebSocket para recibir eventos de apoderados
    this.wsSub = this.wsService.apoderadoChanges$.subscribe((payload) => {
      console.log('WS: mensaje recibido raw:', payload);
      let handled = false;
      // Intentamos interpretar como JSON; si no es JSON limpio, puede ser
      // una notificación tipo "actualiza" enviada desde el backend.
      try {
        const parsed = JSON.parse(payload || 'null');

        // Caso 1: el backend envía un array completo de apoderados -> reemplazamos
        if (Array.isArray(parsed)) {
          console.log('WS: reemplazando lista completa con payload array');
          this.apoderadosSubject.next(parsed);
          if (this.initialLoadDone) this.triggerNewAlert('Lista de apoderados actualizada');
          handled = true;
        } else if (parsed && typeof parsed === 'object') {
          // Detectar si el objeto tiene pinta de ser un apoderado aunque no tenga 'id'
          const keys = Object.keys(parsed).map(k => k.toLowerCase());
          const hasNombres = keys.includes('nombres');
          const hasNd = keys.includes('ndocumento') || keys.includes('nd');
          const hasId = keys.includes('id') || keys.includes('idapoderado');

          if (hasId || hasNombres || hasNd) {
            // Upsert: preferimos usar 'id' si existe, sino 'ndocumento' como clave
            const current = this.apoderadosSubject.getValue();
            // buscar clave real de id/ndocumento
            const idKey = Object.keys(parsed).find(k => k.toLowerCase() === 'id' || k.toLowerCase() === 'idapoderado');
            const ndKey = Object.keys(parsed).find(k => k.toLowerCase() === 'ndocumento' || k.toLowerCase() === 'nd');
            const idVal = idKey ? (parsed as any)[idKey] : null;
            const ndVal = ndKey ? (parsed as any)[ndKey] : null;

            const idx = current.findIndex(a => (idVal && (a as any).id == idVal) || (ndVal && (a as any).ndocumento == ndVal));
            if (idx >= 0) {
              current[idx] = { ...(current[idx] as any), ...(parsed as any) } as ApoderadoModel;
            } else {
              // intentar normalizar campos mínimos
              const normalized: any = { ...parsed };
              // si el objeto no tiene 'id', no lo usamos para buscar; dejamos como nuevo
              current.unshift(normalized as ApoderadoModel);
            }
            this.apoderadosSubject.next([...current]);
            console.log('WS: apoderado upserted en la lista (por shape)', idVal ?? ndVal);
            if (this.initialLoadDone) this.triggerNewAlert('Nuevo apoderado detectado');
            handled = true;
          } else {
            console.log('WS: payload JSON inesperado, recargando lista por REST');
          }
        }
      } catch (err) {
        // No es JSON: probablemente sea una notificación simple (ej: "nuevo" o "actualiza")
        console.log('WS: payload NO JSON, tratando como notificación simple:', payload);
      }

      // Debounced reload para sincronizar siempre con el servidor.
      if (!handled) {
        if (this.reloadTimer) {
          clearTimeout(this.reloadTimer);
        }
        this.reloadTimer = setTimeout(() => {
          this.listarApoderados();
          this.reloadTimer = null;
          if (this.initialLoadDone) this.triggerNewAlert('Se detectó un cambio en apoderados. Lista actualizada.');
        }, 250);
      }
    });

    // subscribirse también al estado de conexión para mostrar indicador (una sola vez)
    this.wsStatusSub = this.wsService.connectionStatus$.subscribe((s) => {
      this.isWsConnected = s;
    });
  }


  listarApoderados() {
  this.errorMessage = null;
  this.isLoading = true;

    const EstadoFiltro: RequestListaApoderados = { estado: 2 };

    const api$ = this.apoderadoService.listaApoderados(EstadoFiltro).pipe(
      timeout({ each: 7000 }),
      map((response: ResponseListaApoderados) => response.exito ? response.apoderado : []),
      catchError((err) => {
        this.errorMessage = 'No se pudo conectar al servidor. Revisa tu red o inténtalo más tarde.';
        return of([] as ApoderadoModel[]);
      })
    );

    // Consumimos la API y empujamos el resultado al subject para que la plantilla
    // (que está ligada a `apoderadosData$ = this.apoderadosSubject.asObservable()`) reciba actualizaciones
    const sub = api$.subscribe({
      next: (list) => {
        if (Array.isArray(list) && list.length > 0) {
          this.apoderadosSubject.next(list);
        }
        // Marcamos que la carga inicial ya se realizó para no disparar alertas en el primer fetch
        this.initialLoadDone = true;
      },
      error: (err) => {
        // El mensaje de error ya se asignó en catchError, pero aseguramos el flag
        this.errorMessage = this.errorMessage ?? 'No se pudo conectar al servidor.';
      }
    });
    sub.add(() => {
      this.isLoading = false;
    });
  }

  private triggerNewAlert(message: string) {
    // Mostrar alerta temporal en la esquina superior derecha
    this.newAlertMessage = message;
    this.showNewAlert = true;
    if (this.alertTimer) clearTimeout(this.alertTimer);
    this.alertTimer = setTimeout(() => {
      this.showNewAlert = false;
      this.newAlertMessage = null;
      this.alertTimer = null;
    }, 4000);
  }

  // Cierra manualmente la alerta si el usuario pulsa el botón de cierre
  public dismissAlert() {
    if (this.alertTimer) {
      clearTimeout(this.alertTimer);
      this.alertTimer = null;
    }
    this.showNewAlert = false;
    this.newAlertMessage = null;
  }

    onEstadoChange(value: string | number) {
      const n = Number(value);
      if (Number.isNaN(n)) {
        this.filters.estado = 2; // por defecto: Todos
      } else {
        this.filters.estado = n;
      }
    }

  ngOnDestroy(): void {
    if (this.wsSub) {
      this.wsSub.unsubscribe();
      this.wsSub = null;
    }
    if (this.wsStatusSub) {
      this.wsStatusSub.unsubscribe();
      this.wsStatusSub = null;
    }
  }

    /**
     * Decide si un apoderado debe mostrarse según el filtro de estado.
     */
    passesFilter(apoderado: any): boolean {
      // Si el filtro es '2' => Todos
      if (this.filters.estado === 2) return true;
      return apoderado && apoderado.estado === this.filters.estado;
    }



}

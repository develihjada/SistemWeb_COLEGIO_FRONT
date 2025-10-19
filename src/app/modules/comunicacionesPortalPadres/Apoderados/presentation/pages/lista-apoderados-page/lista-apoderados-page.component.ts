import { RequestListaApoderados } from './../../../aplication/dto/request/listaApoderado.request';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApoderadoApiService } from '../../../infraestructure/api/apoderado-api.service';
import { ResponseListaApoderados } from '../../../aplication/dto/response/listaApoderado.response';
import {
  map,
  Observable,
  Subscription,
  of,
  catchError,
  timeout,
  finalize,
  BehaviorSubject,
} from 'rxjs';
import { WebSocketServiceService } from '../../../infraestructure/websocket/web-socket-service.service';
import { ApoderadoModel } from '../../../aplication/dto/apoderado.dto';
import { RequestBuscarApoderado } from '../../../aplication/dto/request/buscarApoderado.request';

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

  private router = inject(Router);
  private apoderadoService = inject(ApoderadoApiService);
  private wsService = inject(WebSocketServiceService);

  // ========================================================================
  // 2. PROPIEDADES DEL COMPONENTE
  // ========================================================================

  estados: number[] = [0, 1, 2];
  grados: string[] = ['1ro', '2do', '3ro', '4to', '5to'];
  secciones: string[] = ['A', 'B', 'C'];
  vinculos: ('Madre' | 'Padre' | 'Tutor')[] = ['Madre', 'Padre', 'Tutor'];
  estadosContacto: ('Verificado' | 'Pendiente')[] = ['Verificado', 'Pendiente'];

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

  errorMessage: string | null = null;
  showNewAlert: boolean = false;
  newAlertMessage: string | null = null;
  private alertTimer: any = null;
  private initialLoadDone: boolean = false;
  // Último término buscado por DNI (si aplica)
  lastSearch: string | null = null;

  ngOnInit(): void {
    this.listarApoderados();
    this.listaApoderados_WebSocket();
  }

  listarApoderados() {
    this.errorMessage = null;
    this.isLoading = true;

    const EstadoFiltro: RequestListaApoderados = { estado: 2 };

    const api$ = this.apoderadoService.listaApoderados(EstadoFiltro).pipe(
      timeout({ each: 7000 }),
      map((response: ResponseListaApoderados) => (response.exito ? response.apoderado : [])),
      catchError((err) => {
        this.errorMessage = 'No se pudo conectar al servidor. Revisa tu red o inténtalo más tarde.';
        return of([] as ApoderadoModel[]);
      })
    );

    const sub = api$.subscribe({
      next: (list) => {
        console.log('buscarApoderado result raw:', list);
        let toPush: ApoderadoModel[] = [];
        if (Array.isArray(list)) {
          toPush = list;
        } else if (list && typeof list === 'object') {
          // en caso el servicio devuelva un objeto único, lo normalizamos a array
          toPush = [list as ApoderadoModel];
        } else {
          toPush = [];
        }

        // Siempre empujamos el resultado (incluso vacío) para que la UI refleje la búsqueda
        this.apoderadosSubject.next(toPush);
        console.log('apoderadosSubject after search:', this.apoderadosSubject.getValue());
        this.initialLoadDone = true;
      },
      error: (err) => {
        this.errorMessage = this.errorMessage ?? 'No se pudo conectar al servidor.';
      },
    });
    sub.add(() => {
      this.isLoading = false;
    });
  }

  listaApoderados_WebSocket() {
    this.wsService.connectOnce();
    this.wsSub = this.wsService.apoderadoChanges$.subscribe((payload) => {
      let handled = false;
      try {
        const parsed = JSON.parse(payload || 'null');

        if (Array.isArray(parsed)) {
          this.apoderadosSubject.next(parsed);
          if (this.initialLoadDone) this.triggerNewAlert('Lista de apoderados actualizada');
          handled = true;
        } else if (parsed && typeof parsed === 'object') {
          const keys = Object.keys(parsed).map((k) => k.toLowerCase());
          const hasNombres = keys.includes('nombres');
          const hasNd = keys.includes('ndocumento') || keys.includes('nd');
          const hasId = keys.includes('id') || keys.includes('idapoderado');

          if (hasId || hasNombres || hasNd) {
            const current = this.apoderadosSubject.getValue();
            const idKey = Object.keys(parsed).find(
              (k) => k.toLowerCase() === 'id' || k.toLowerCase() === 'idapoderado'
            );
            const ndKey = Object.keys(parsed).find(
              (k) => k.toLowerCase() === 'ndocumento' || k.toLowerCase() === 'nd'
            );
            const idVal = idKey ? (parsed as any)[idKey] : null;
            const ndVal = ndKey ? (parsed as any)[ndKey] : null;

            const idx = current.findIndex(
              (a) => (idVal && (a as any).id == idVal) || (ndVal && (a as any).ndocumento == ndVal)
            );
            if (idx >= 0) {
              current[idx] = { ...(current[idx] as any), ...(parsed as any) } as ApoderadoModel;
            } else {
              const normalized: any = { ...parsed };
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
        console.log('WS: payload NO JSON, tratando como notificación simple:', payload);
      }

      if (!handled) {
        if (this.reloadTimer) {
          clearTimeout(this.reloadTimer);
        }
        this.reloadTimer = setTimeout(() => {
          this.listarApoderados();
          this.reloadTimer = null;
          if (this.initialLoadDone)
            this.triggerNewAlert('Se detectó un cambio en apoderados. Lista actualizada.');
        }, 250);
      }
    });

    this.wsStatusSub = this.wsService.connectionStatus$.subscribe((s) => {
      this.isWsConnected = s;
    });
  }

  buscarApoderado(ndocumento?: string) {
    this.errorMessage = null;
    this.isLoading = true;

    const clean = ndocumento ? ndocumento.toString().trim() : '';
    // Si el término de búsqueda está vacío, recargamos la lista completa
    if (!clean) {
      this.lastSearch = null;
      // reset loading state and reload full list
      this.isLoading = true;
      this.listarApoderados();
      return;
    }

    this.lastSearch = clean ? clean : null;
    const EstadoFiltro: RequestBuscarApoderado = { ndocumento: clean };

    const api$ = this.apoderadoService.BuscarApoderados(EstadoFiltro).pipe(
      timeout({ each: 7000 }),
      map((response: ResponseListaApoderados) => (response.exito ? response.apoderado : [])),
      catchError((err) => {
        this.errorMessage = 'No se pudo conectar al servidor. Revisa tu red o inténtalo más tarde.';
        return of([] as ApoderadoModel[]);
      })
    );

    const sub = api$.subscribe({
      next: (list) => {
        if (Array.isArray(list) && list.length > 0) {
          this.apoderadosSubject.next(list);
        }
        this.initialLoadDone = true;
      },
      error: (err) => {
        this.errorMessage = this.errorMessage ?? 'No se pudo conectar al servidor.';
      },
    });
    sub.add(() => {
      this.isLoading = false;
    });
  }

  private triggerNewAlert(message: string) {
    this.newAlertMessage = message;
    this.showNewAlert = true;
    if (this.alertTimer) clearTimeout(this.alertTimer);
    this.alertTimer = setTimeout(() => {
      this.showNewAlert = false;
      this.newAlertMessage = null;
      this.alertTimer = null;
    }, 4000);
  }

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
      this.filters.estado = 2;
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

  passesFilter(apoderado: any): boolean {
    if (this.filters.estado === 2) return true;
    return apoderado && apoderado.estado === this.filters.estado;
  }
}

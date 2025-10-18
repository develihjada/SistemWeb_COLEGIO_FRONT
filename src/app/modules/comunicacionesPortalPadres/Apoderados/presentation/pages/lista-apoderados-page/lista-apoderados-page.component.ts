import { RequestListaApoderados } from './../../../aplication/dto/request/listaApoderado.request';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apoderado as DomainApoderado } from '../../../domain/entities/apoderado.model';
import { ApoderadoApiService } from '../../../infraestructure/api/apoderado-api.service';
import { ResponseListaApoderados } from '../../../aplication/dto/response/listaApoderado.response';
import { map, Observable, Subscription } from 'rxjs';
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
}


@Component({
  selector: 'app-lista-apoderados-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-apoderados-page.component.html',
  styleUrls: ['./lista-apoderados-page.component.css'],
})
export class ListaApoderadosPageComponent {
  private router = inject(Router);
  private apoderadoService = inject(ApoderadoApiService);


  // ========================================================================
  // 2. PROPIEDADES DEL COMPONENTE
  // ========================================================================

  // Opciones de datos maestros (omito la definición por brevedad)
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
  };

  apoderadosData$: Observable<ApoderadoModel[]> | undefined

  ngOnInit(): void {
    this.listarApoderados();
  }


  listarApoderados() {
    const EstadoFiltro: RequestListaApoderados = { estado: 2 };

    this.apoderadosData$ = this.apoderadoService.listaApoderados(EstadoFiltro)
        .pipe(
            map((response: ResponseListaApoderados) => {
                return  response.exito ? response.apoderado : [];
            })
        );
  }


}

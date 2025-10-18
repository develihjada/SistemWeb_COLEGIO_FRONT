import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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

// Define la interfaz para los datos de Apoderados
interface Apoderado {
  nombre: string;
  dni: string;
  estudiante: string;
  grado: string;
  seccion: string;
  vinculo: 'Madre' | 'Padre' | 'Tutor';
  telefono: string;
  email: string;
  estadoContacto: 'Verificado' | 'Pendiente';
}

@Component({
  selector: 'app-lista-apoderados-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-apoderados-page.component.html',
  styleUrl: './lista-apoderados-page.component.css',
})
export class ListaApoderadosPageComponent {

  private router = inject(Router);


  // ========================================================================
  // 2. PROPIEDADES DEL COMPONENTE
  // ========================================================================

  // Opciones de datos maestros (usadas en los selectores y chips del HTML)
  grados: string[] = ['1ro', '2do', '3ro', '4to', '5to'];
  secciones: string[] = ['A', 'B', 'C'];
  vinculos: ('Madre' | 'Padre' | 'Tutor')[] = ['Madre', 'Padre', 'Tutor'];
  estadosContacto: ('Verificado' | 'Pendiente')[] = ['Verificado', 'Pendiente'];

  // Estado actual de los filtros
  filters: ApoderadoFilters = {
    apoderado: null,
    grado: null,
    seccion: null,
    vinculo: null,
    estadoContacto: null,
  };

  // Datos simulados de Apoderados
  apoderadosData: Apoderado[] = [
    {
      nombre: 'Laura Soto',
      dni: '45678901',
      estudiante: 'Ana Díaz',
      grado: '1ro',
      seccion: 'A',
      vinculo: 'Madre',
      telefono: '987654321',
      email: 'laura.soto@email.com',
      estadoContacto: 'Verificado',
    },
    {
      nombre: 'Marco Polo',
      dni: '76543210',
      estudiante: 'Juan Soto',
      grado: '1ro',
      seccion: 'B',
      vinculo: 'Padre',
      telefono: '998877665',
      email: 'marco.polo@email.com',
      estadoContacto: 'Pendiente',
    },
    {
      nombre: 'Elena Gómez',
      dni: '10987654',
      estudiante: 'Pedro Ríos',
      grado: '3ro',
      seccion: 'C',
      vinculo: 'Tutor',
      telefono: '900112233',
      email: 'elena.gomez@email.com',
      estadoContacto: 'Verificado',
    },
    {
      nombre: 'Javier Casas',
      dni: '23456789',
      estudiante: 'Luisa Mena',
      grado: '3ro',
      seccion: 'C',
      vinculo: 'Padre',
      telefono: '933445566',
      email: 'javier.casas@email.com',
      estadoContacto: 'Verificado',
    },
    {
      nombre: 'Sofía Vidal',
      dni: '87654321',
      estudiante: 'Miguel Torres',
      grado: '5to',
      seccion: 'C',
      vinculo: 'Madre',
      telefono: '912345678',
      email: 'sofia.vidal@email.com',
      estadoContacto: 'Pendiente',
    },
  ];

  // ========================================================================
  // 3. MÉTODOS DE FILTRADO Y LÓGICA
  // ========================================================================

  /**
   * Establece el filtro seleccionado, manejando el toggle para los chips.
   * @param type El campo del filtro a modificar.
   * @param value El nuevo valor (o null para deseleccionar).
   */
  setFilter(type: keyof ApoderadoFilters, value: string | null): void {
    // Definimos qué campos son de tipo 'chip' (vinculo, estadoContacto)
    const chipTypes: (keyof ApoderadoFilters)[] = ['vinculo', 'estadoContacto'];

    // Lógica de toggle: si es un chip y el valor ya estaba seleccionado, lo deselecciona (null).
    if (chipTypes.includes(type) && this.filters[type] === value) {
      this.filters[type] = null;
    } else {
      // Para otros campos (selects/input) o un nuevo chip, asigna el valor.
      this.filters[type] = value as any; // Usamos 'as any' para evitar conflictos de tipado estricto con null
    }
  }

  /**
   * Getter que aplica todos los filtros al listado de apoderados.
   */
  get filteredApoderados(): Apoderado[] {
    const term = this.filters.apoderado ? this.filters.apoderado.toLowerCase() : '';

    return this.apoderadosData.filter((apoderado) => {
      // 1. Filtro de Búsqueda Rápida (Nombre/DNI)
      if (
        term &&
        !(apoderado.nombre.toLowerCase().includes(term) || apoderado.dni.includes(term))
      ) {
        return false;
      }

      // 2. Filtro por Grado del Estudiante
      if (this.filters.grado && apoderado.grado !== this.filters.grado) {
        return false;
      }

      // 3. Filtro por Sección del Estudiante
      if (this.filters.seccion && apoderado.seccion !== this.filters.seccion) {
        return false;
      }

      // 4. Filtro por Vínculo
      if (this.filters.vinculo && apoderado.vinculo !== this.filters.vinculo) {
        return false;
      }

      // 5. Filtro por Estado de Contacto
      if (this.filters.estadoContacto && apoderado.estadoContacto !== this.filters.estadoContacto) {
        return false;
      }

      return true;
    });
  }

  RegistroApoderado(): void {
    this.router.navigate(['/registro-apoderados']);
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// ========================================================================
// 1. INTERFACES Y TIPADO
// ========================================================================

interface ApoderadoFilters {
  apoderado: string | null;
  grado: string | null;
  seccion: string | null;
  vinculo: string | null; // Usamos string|null para coincidir con el valor de los selects
  estadoContacto: string | null;
}

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
  selector: 'app-lista-matricula-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-matricula-page.component.html',
  styleUrl: './lista-matricula-page.component.css'
})
export class ListaMatriculaPageComponent {

   private router = inject(Router);

  // --- Propiedades y Datos ---

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
      { nombre: 'Laura Soto', dni: '45678901', estudiante: 'Ana Díaz', grado: '1ro', seccion: 'A', vinculo: 'Madre', telefono: '987654321', email: 'laura.soto@email.com', estadoContacto: 'Verificado' },
      { nombre: 'Marco Polo', dni: '76543210', estudiante: 'Juan Soto', grado: '1ro', seccion: 'B', vinculo: 'Padre', telefono: '998877665', email: 'marco.polo@email.com', estadoContacto: 'Pendiente' },
      { nombre: 'Elena Gómez', dni: '10987654', estudiante: 'Pedro Ríos', grado: '3ro', seccion: 'C', vinculo: 'Tutor', telefono: '900112233', email: 'elena.gomez@email.com', estadoContacto: 'Verificado' },
      { nombre: 'Javier Casas', dni: '23456789', estudiante: 'Luisa Mena', grado: '3ro', seccion: 'C', vinculo: 'Padre', telefono: '933445566', email: 'javier.casas@email.com', estadoContacto: 'Verificado' },
  ];

  // --- Métodos de Acción ---

  /**
   * Navega a la ruta de registro de apoderados.
   */
  registrarApoderado(): void {
    // Usamos la misma convención de ruta que la Matrícula, pero para Apoderados
    this.router.navigate(['/dashboard/registro_apoderado']);
  }

  /**
   * Captura y establece el valor del filtro, manejando la deselección si es un select vacío.
   */
  setFilter(type: keyof ApoderadoFilters, eventValue: string): void {
    // Si el valor es una cadena vacía (select "Todos") o indefinido, lo establecemos a null
    const value = eventValue === '' ? null : eventValue;

    // Para los botones de aplicar (simulamos la asignación temporal, aunque el getter funciona en vivo)
    (this.filters as any)[type] = value;
  }

  /**
   * Aplica los filtros (en Angular reactivo, esto solo refresca la vista).
   */
  applyFilters(): void {
    // En un entorno reactivo como Angular, el getter `filteredApoderados`
    // se re-evalúa automáticamente, por lo que esta función solo sirve de placeholder
    // o para ejecutar una API call en sistemas más complejos.
    console.log('Filtros aplicados:', this.filters);
  }

  /**
   * Resetea todos los filtros a null.
   */
  clearFilters(): void {
    this.filters = {
      apoderado: null,
      grado: null,
      seccion: null,
      vinculo: null,
      estadoContacto: null,
    };
    console.log('Filtros limpiados.');
  }

  // --- Lógica de Filtrado (Getter) ---

  /**
   * Getter que aplica todos los filtros al listado de apoderados en tiempo real.
   */
  get filteredApoderados(): Apoderado[] {
    const term = this.filters.apoderado ? this.filters.apoderado.toLowerCase() : '';

    return this.apoderadosData.filter(apoderado => {
        // 1. Filtro de Búsqueda Rápida (Nombre/DNI)
        if (term && !(apoderado.nombre.toLowerCase().includes(term) || apoderado.dni.includes(term))) {
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

  RegistroApoderado() {
    this.router.navigate(['/registro_matricula']);
  }
}

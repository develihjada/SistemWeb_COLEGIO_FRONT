import { Component } from '@angular/core';

// Define la interfaz de filtros para Asistencia
interface AsistenciaFilters {
  fecha: string; // Formato YYYY-MM-DD
  grado: string | null;
  seccion: string | null;
  curso: string | null;
  docente: string | null;
  estudiante: string | null;
}

// Define la interfaz para los datos de Asistencia
interface Asistencia {
  estudiante: string;
  grado: string;
  seccion: string;
  curso: string;
  docente: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // 08:00
  estado: 'Presente' | 'Ausente' | 'Tardanza';
  observacion: string;
}

@Component({
  selector: 'app-lista-assistencia-alumnos-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-assistencia-alumnos-page.component.html',
  styleUrl: './lista-assistencia-alumnos-page.component.css'
})
export class ListaAssistenciaAlumnosPageComponent {
  // Listas de opciones disponibles (usadas en el listado de Notas, reusadas aquí)
grados: string[] = ['1ro', '2do', '3ro', '4to', '5to'];
secciones: string[] = ['A', 'B', 'C'];
cursos: string[] = ['Matemáticas', 'Comunicación', 'Ciencias Sociales', 'Inglés'];
docentes: string[] = ['Marta Gómez', 'Javier Pérez', 'Alicia Ramos', 'Miguel Torres'];


// Estado actual de los filtros de Asistencia
filters: AsistenciaFilters = {
    fecha: new Date().toISOString().split('T')[0], // Establece la fecha de hoy por defecto
    grado: null,
    seccion: null,
    curso: null,
    docente: null,
    estudiante: null,
};

// Datos simulados de asistencia
asistenciaData: Asistencia[] = [
    { estudiante: 'Ana Díaz', grado: '1ro', seccion: 'A', curso: 'Matemáticas', docente: 'Marta Gómez', fecha: '2025-10-17', hora: '08:00', estado: 'Presente', observacion: '' },
    { estudiante: 'Juan Soto', grado: '1ro', seccion: 'A', curso: 'Comunicación', docente: 'Marta Gómez', fecha: '2025-10-17', hora: '09:00', estado: 'Tardanza', observacion: 'Llegó 15 minutos tarde.' },
    { estudiante: 'Pedro Ríos', grado: '3ro', seccion: 'C', curso: 'Ciencias Sociales', docente: 'Alicia Ramos', fecha: '2025-10-17', hora: '10:00', estado: 'Ausente', observacion: 'Falta justificada (médico).' },
    { estudiante: 'Luisa Mena', grado: '3ro', seccion: 'C', curso: 'Matemáticas', docente: 'Alicia Ramos', fecha: '2025-10-17', hora: '11:00', estado: 'Presente', observacion: '' },
    // Añadir datos de otros días y filtros si es necesario
    { estudiante: 'Daniel Cruz', grado: '5to', seccion: 'B', curso: 'Inglés', docente: 'Miguel Torres', fecha: '2025-10-16', hora: '14:00', estado: 'Presente', observacion: '' },
];


/**
 * Establece el filtro seleccionado, manejando el toggle para los chips.
 */
setFilter(type: keyof AsistenciaFilters, value: string): void {
    // Para Grado/Sección (chips): si el valor ya está seleccionado, lo deselecciona
    if (type === 'grado' || type === 'seccion') {
        if (this.filters[type] === value) {
            this.filters[type] = null;
        } else {
            this.filters[type] = value;
        }
    } else {
        // Para otros campos (selects/input): asignación directa
        this.filters[type] = value;
    }
}

/**
 * Aplica todos los filtros a los datos de asistencia.
 */
get filteredAsistencias(): Asistencia[] {
    const term = this.filters.estudiante ? this.filters.estudiante.toLowerCase() : '';

    return this.asistenciaData.filter(item => {
        // 1. Filtro por Fecha (Obligatorio)
        if (this.filters.fecha && item.fecha !== this.filters.fecha) {
            return false;
        }
        // 2. Filtro por Grado
        if (this.filters.grado && item.grado !== this.filters.grado) {
            return false;
        }
        // 3. Filtro por Sección
        if (this.filters.seccion && item.seccion !== this.filters.seccion) {
            return false;
        }
        // 4. Filtro por Curso
        if (this.filters.curso && item.curso !== this.filters.curso) {
            return false;
        }
        // 5. Filtro por Docente
        if (this.filters.docente && item.docente !== this.filters.docente) {
            return false;
        }
        // 6. Filtro por Estudiante/Búsqueda Rápida (Estudiante/DNI)
        if (term && !item.estudiante.toLowerCase().includes(term)) {
             // Asume que el campo 'estudiante' contiene el nombre completo que se está buscando
            return false;
        }

        return true;
    });
}
}

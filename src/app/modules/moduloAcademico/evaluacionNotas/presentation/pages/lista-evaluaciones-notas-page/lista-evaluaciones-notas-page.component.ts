import { Component } from '@angular/core';

// Define una interfaz para los filtros
interface NotesFilters {
  grado: string | null;
  seccion: string | null;
  curso: string | null;
  docente: string | null;
}

// Define una interfaz para los datos de las notas
interface Nota {
  estudiante: string;
  grado: string;
  seccion: string;
  curso: string;
  docente: string;
  nota: number;
}

@Component({
  selector: 'app-lista-evaluaciones-notas-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-evaluaciones-notas-page.component.html',
  styleUrl: './lista-evaluaciones-notas-page.component.css'
})
export class ListaEvaluacionesNotasPageComponent {
  // Listas de opciones disponibles (simulación de datos maestros)
grados: string[] = ['1ro', '2do', '3ro', '4to', '5to'];
secciones: string[] = ['A', 'B', 'C'];
cursos: string[] = ['Matemáticas', 'Comunicación', 'Ciencias Sociales', 'Inglés'];
docentes: string[] = ['Marta Gómez', 'Javier Pérez', 'Alicia Ramos', 'Miguel Torres'];

// Estado actual de los filtros
filters: NotesFilters = {
    grado: null,
    seccion: null,
    curso: null,
    docente: null,
};

// Datos simulados de notas
notesData: Nota[] = [
    { estudiante: 'Ana Díaz', grado: '1ro', seccion: 'A', curso: 'Matemáticas', docente: 'Marta Gómez', nota: 18 },
    { estudiante: 'Juan Soto', grado: '1ro', seccion: 'B', curso: 'Comunicación', docente: 'Javier Pérez', nota: 10 },
    { estudiante: 'Pedro Ríos', grado: '3ro', seccion: 'C', curso: 'Ciencias Sociales', docente: 'Alicia Ramos', nota: 15 },
    { estudiante: 'Luisa Mena', grado: '3ro', seccion: 'C', curso: 'Matemáticas', docente: 'Marta Gómez', nota: 12 },
    // Agrega más datos para pruebas...
];


/**
 * Establece el filtro seleccionado, manejando el toggle para los botones.
 */
setFilter(type: keyof NotesFilters, value?: string | null): void {
    // Normalizar valor a string | null (valor undefined -> null)
    const v: string | null = value ?? null;

    // Si el valor ya está seleccionado, lo deselecciona (toggle)
    if (this.filters[type] === v) {
        this.filters[type] = null;
    } else {
        this.filters[type] = v;
    }
}

/**
 * Aplica todos los filtros a los datos de notas.
 */
get filteredNotes(): Nota[] {
    return this.notesData.filter(nota => {
        // Filtro por Grado
        if (this.filters.grado && nota.grado !== this.filters.grado) {
            return false;
        }
        // Filtro por Sección
        if (this.filters.seccion && nota.seccion !== this.filters.seccion) {
            return false;
        }
        // Filtro por Curso
        if (this.filters.curso && nota.curso !== this.filters.curso) {
            return false;
        }
        // Filtro por Docente
        if (this.filters.docente && nota.docente !== this.filters.docente) {
            return false;
        }
        return true;
    });
}
}

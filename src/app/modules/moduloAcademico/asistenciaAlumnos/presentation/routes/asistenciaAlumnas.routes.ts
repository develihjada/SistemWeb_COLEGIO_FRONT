import { Routes } from '@angular/router';

export const ASISTENCIAALUMNOS_ROUTES: Routes = [
  {
    path: 'lista-asistencia-alumnos',
    loadComponent: () => import('../pages/lista-assistencia-alumnos-page/lista-assistencia-alumnos-page.component').then(m => m.ListaAssistenciaAlumnosPageComponent)
  },
  {
    path: 'registro-asistencia-alumnos',
    loadComponent: () => import('../pages/registro-assistencia-alumnos-page/registro-assistencia-alumnos-page.component').then(m => m.RegistroAssistenciaAlumnosPageComponent)
  }
];

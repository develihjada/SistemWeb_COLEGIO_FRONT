import { Routes } from '@angular/router';

export const EVALUACIONESNOTAS_ROUTES: Routes = [
  {
    path: 'lista-evaluaciones-notas',
    loadComponent: () => import( '../pages/lista-evaluaciones-notas-page/lista-evaluaciones-notas-page.component').then((m) => m.ListaEvaluacionesNotasPageComponent),
  },
  {
    path: 'registro-evaluaciones-notas',
    loadComponent: () => import( '../pages/registro-evaluaciones-notas-page/registro-evaluaciones-notas-page.component').then((m) => m.RegistroEvaluacionesNotasPageComponent),
  }
];

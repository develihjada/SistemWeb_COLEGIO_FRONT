import { Routes } from '@angular/router';

export const APODERADOS_ROUTES: Routes = [
  {
    path: 'lista-apoderados',
    loadComponent: () => import('../pages/lista-apoderados-page/lista-apoderados-page.component').then(m => m.ListaApoderadosPageComponent)
  },
  {
    path: 'registro-apoderados',
    loadComponent: () => import('../pages/registro-apoderados-page/registro-apoderados-page.component').then(m => m.RegistroApoderadosPageComponent)
  }
];

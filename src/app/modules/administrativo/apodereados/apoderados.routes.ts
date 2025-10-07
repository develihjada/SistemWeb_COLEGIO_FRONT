import { Routes } from '@angular/router';


export const APODERADOS_ROUTES: Routes = [
  {
    path: 'ADMINISTRATIVOS_APODERADOS',
    loadComponent: () => import('./page/lista-apoderados-page/lista-apoderados-page').then(m => m.ListaApoderadosPage)
  }
];

import { Routes } from '@angular/router';

export const TIPODOCUMENTOS_ROUTES: Routes = [
  {
    path: 'tipodocumentos',
    loadComponent: () => import('./page/lista-tipodocumentos-page/lista-tipodocumentos-page').then(m => m.ListaTipodocumentosPage)
  }
];

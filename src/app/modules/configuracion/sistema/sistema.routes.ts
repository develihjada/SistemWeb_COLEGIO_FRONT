import { Routes } from '@angular/router';

export const CONFIGURACIONES_SISTEMA: Routes = [
  {
    path: 'CONFIGURACION_SISTEMA',
    loadComponent: () => import('./pages/lista-configuraciones-page/lista-configuraciones-page').then(m => m.ListaConfiguracionesPage)
  }
];

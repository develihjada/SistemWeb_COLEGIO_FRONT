import { Routes } from '@angular/router';

export const APODERADOS_ROUTES: Routes = [
  {
    path: 'apoderados',
    children: [
      {
        path: 'lista',
        loadComponent: () => import('./lista-apoderados-page/lista-apoderados-page').then(m => m.ListaApoderadosPage)
      },
      {
        path: 'buscar',
        loadComponent: () => import('./buscar-apoderados-page/buscar-apoderados-page').then(m => m.BuscarApoderadosPageComponent)
      },
      {
        path: 'detalle/:id',
        loadComponent: () => import('./detalle-apoderados-page/detalle-apoderados-page').then(m => m.DetalleApoderadosPage)
      },
      {
        path: 'registro',
        loadComponent: () => import('./registro-apoderados-page/registro-apoderados-page').then(m => m.RegistroApoderadosPage)
      },
      {
        path: 'eliminar/:id',
        loadComponent: () => import('./eliminar-apoderados-page/eliminar-apoderados-page').then(m => m.EliminarApoderadosPage)
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
      }
    ]
  }
];

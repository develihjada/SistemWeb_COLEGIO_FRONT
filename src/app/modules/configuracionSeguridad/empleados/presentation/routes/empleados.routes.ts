import { Routes } from '@angular/router';

export const EMPLEADOS_ROUTES: Routes = [
  {
    path: 'lista-empleados',
    loadComponent: () => import('../page/lista-empleados-page/lista-empleados-page.component').then(m => m.ListaEmpleadosPageComponent)
  },
  {
    path: 'registro_empleados',
    loadComponent: () => import('../page/registro-empleados-page/registro-empleados-page.component').then(m => m.RegistroEmpleadosPageComponent)
  }
];

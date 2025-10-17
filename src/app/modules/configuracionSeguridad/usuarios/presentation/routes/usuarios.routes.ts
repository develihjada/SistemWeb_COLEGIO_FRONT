import { Routes } from '@angular/router';

export const USUARIOS_ROUTES: Routes = [
  {
    path: 'lista_usuarios',
    loadComponent: () => import('../pages/lista-usuarios-page/lista-usuarios-page.component').then(m => m.ListaUsuariosPageComponent)
  },
  {
    path: 'registro_usuarios',
    loadComponent: () => import('../pages/registro-usuarios-page/registro-usuarios-page.component').then(m => m.RegistroUsuariosPageComponent)
  }
];

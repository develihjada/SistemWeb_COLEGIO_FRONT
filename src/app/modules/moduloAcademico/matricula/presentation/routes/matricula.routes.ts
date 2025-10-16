import { Routes } from '@angular/router';

export const MATRICULA_ROUTES: Routes = [
  {
    path: 'lista_matricula',
    loadComponent: () => import('../pages/lista-matricula-page/lista-matricula-page.component').then(m => m.ListaMatriculaPageComponent)
  },
  {
    path: 'registro_matricula',
    loadComponent: () => import('../pages/registro-matricula-page/registro-matricula-page.component').then(m => m.RegistroMatriculaPageComponent)
  }
];

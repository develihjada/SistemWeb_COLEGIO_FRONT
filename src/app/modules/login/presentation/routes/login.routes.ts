import { Routes } from '@angular/router';

export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../page/login/login.component').then(m => m.LoginComponent)
  }

];

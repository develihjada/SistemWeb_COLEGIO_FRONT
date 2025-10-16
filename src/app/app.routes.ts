import { Routes } from '@angular/router';
import { INICIO_ROUTES } from './shared/page/inicio/inicio.routes';
import { LOGIN_ROUTES } from './modules/login/presentation/routes/login.routes';


export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...INICIO_ROUTES
];

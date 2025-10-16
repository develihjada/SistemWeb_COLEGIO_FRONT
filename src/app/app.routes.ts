import { Routes } from '@angular/router';
import { INICIO_ROUTES } from './shared/page/inicio/inicio.routes';
import { LOGIN_ROUTES } from './modules/login/presentation/routes/login.routes';
import { APODERADOS_ROUTES } from './modules/administrativo/apodereados/apoderados.routes';
import { CONFIGURACIONES_SISTEMA } from './modules/configuracion/sistema/sistema.routes';
import { TIPODOCUMENTOS_ROUTES } from './modules/configuracion/tipoDocumentos/tipoDocumentos.routes';
import { MATRICULA_ROUTES } from './modules/moduloAcademico/matricula/presentation/routes/matricula.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...INICIO_ROUTES,
  ...APODERADOS_ROUTES,
  ...CONFIGURACIONES_SISTEMA,
  ...TIPODOCUMENTOS_ROUTES,
  ...MATRICULA_ROUTES
];

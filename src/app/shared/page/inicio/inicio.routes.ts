import { Routes } from '@angular/router';
import { APODERADOS_ROUTES } from '../../../modules/administrativo/apodereados/apoderados.routes';
import { CONFIGURACIONES_SISTEMA } from '../../../modules/configuracion/sistema/sistema.routes';
import { TIPODOCUMENTOS_ROUTES } from '../../../modules/configuracion/tipoDocumentos/tipoDocumentos.routes';

export const INICIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./inicio-page/inicio-page').then(m => m.InicioPage),
    children: [
      ...APODERADOS_ROUTES,
      ...CONFIGURACIONES_SISTEMA,
      ...TIPODOCUMENTOS_ROUTES
    ]
  }
];

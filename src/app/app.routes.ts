import { Routes } from '@angular/router';
import { INICIO_ROUTES } from './shared/page/inicio/inicio.routes';
import { LOGIN_ROUTES } from './modules/login/presentation/routes/login.routes';
import { APODERADOS_ROUTES } from './modules/administrativo/apodereados/apoderados.routes';
import { CONFIGURACIONES_SISTEMA } from './modules/configuracion/sistema/sistema.routes';
import { TIPODOCUMENTOS_ROUTES } from './modules/configuracion/tipoDocumentos/tipoDocumentos.routes';
import { MATRICULA_ROUTES } from './modules/moduloAcademico/matricula/presentation/routes/matricula.routes';
import { EMPLEADOS_ROUTES } from './modules/configuracionSeguridad/empleados/presentation/routes/empleados.routes';
import { USUARIOS_ROUTES } from './modules/configuracionSeguridad/usuarios/presentation/routes/usuarios.routes';
import { EVALUACIONESNOTAS_ROUTES } from './modules/moduloAcademico/evaluacionNotas/presentation/routes/evaluacionesNotas.routes';
import { ASISTENCIAALUMNOS_ROUTES } from './modules/moduloAcademico/asistenciaAlumnos/presentation/routes/asistenciaAlumnas.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...INICIO_ROUTES,
  ...APODERADOS_ROUTES,
  ...CONFIGURACIONES_SISTEMA,
  ...TIPODOCUMENTOS_ROUTES,
  ...MATRICULA_ROUTES,
  ...EMPLEADOS_ROUTES,
  ...USUARIOS_ROUTES,
  ...EVALUACIONESNOTAS_ROUTES,
  ...ASISTENCIAALUMNOS_ROUTES
];

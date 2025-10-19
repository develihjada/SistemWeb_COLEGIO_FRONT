// Polyfill mínimo para algunas bibliotecas compatibles con Node que esperan la
// variable global. En entornos de navegador modernos no existe `global`, solo
// `window`. Esta asignación evita el error "global is not defined".
// Comentario: mantenerlo lo más pequeño posible; si prefieres, añade una
// solución más formal en polyfills.ts.
(window as any).global = window;

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';

/**
 * Sin zone.js: toda la página trabaja con signals y OnPush, así que Angular solo revisa la vista
 * cuando cambia un signal o llega un evento de la plantilla. Ahorra el polyfill y trabajo en cada evento.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection()]
};

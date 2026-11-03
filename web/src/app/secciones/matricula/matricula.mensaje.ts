import { normalizarEspacios } from '../../core/texto';
import { fechaPeruana } from './edad';

export interface FichaMatricula {
  readonly nombreNino: string;
  readonly fechaNacimiento: string;
  readonly edad: string;
  readonly programa: string;
  readonly nombreApoderado: string;
  readonly dni: string;
  readonly celular: string;
  readonly distrito: string;
  readonly direccion: string;
}

/** "987654321" → "987 654 321" */
function celularLegible(celular: string): string {
  return celular.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

/** Texto que llega por WhatsApp. Los asteriscos ponen en negrita cada dato. */
export function construirMensajeMatricula(ficha: FichaMatricula): string {
  return [
    'Hola Mi Paraíso, quiero matricular a mi niño/a. Estos son nuestros datos:',
    '',
    `*Niño/a:* ${normalizarEspacios(ficha.nombreNino)}`,
    `*Fecha de nacimiento:* ${fechaPeruana(ficha.fechaNacimiento)} (${ficha.edad})`,
    `*Programa de interés:* ${ficha.programa}`,
    '',
    `*Apoderado/a:* ${normalizarEspacios(ficha.nombreApoderado)}`,
    `*DNI:* ${ficha.dni}`,
    `*Celular:* ${celularLegible(ficha.celular)}`,
    `*Dirección:* ${normalizarEspacios(ficha.direccion)}, ${ficha.distrito} (Cañete)`
  ].join('\n');
}

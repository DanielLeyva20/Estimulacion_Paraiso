import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { normalizarEspacios } from '../../core/texto';
import { calcularEdad, leerFechaIso, hoySinHora } from './edad';

/** El centro atiende a niños de 1 a 2 años: desde su primer cumpleaños hasta antes de cumplir 3. */
export const EDAD_MINIMA_ANIOS = 1;
export const EDAD_MAXIMA_ANIOS = 2;

const LETRAS = 'A-Za-zÁÉÍÓÚÜÑáéíóúüñ';
const SOLO_LETRAS_Y_ESPACIOS = new RegExp(`^[${LETRAS} ]+$`);
const CARACTERES_DE_DIRECCION = new RegExp(`^[${LETRAS}0-9 .,#°º/-]+$`);
const DNI = /^\d{8}$/;
/** Celular peruano: 9 dígitos y empieza con 9. */
const CELULAR_PERU = /^9\d{8}$/;

function texto(control: AbstractControl): string {
  return normalizarEspacios(String(control.value ?? ''));
}

/** Nombre y apellido(s): solo letras (con tildes y ñ) y espacios, al menos dos palabras. */
export const nombreCompletoValidator: ValidatorFn = (control): ValidationErrors | null => {
  const valor = texto(control);
  if (!valor) return null;
  if (!SOLO_LETRAS_Y_ESPACIOS.test(valor)) return { soloLetras: true };
  if (valor.split(' ').length < 2) return { nombreIncompleto: true };
  return null;
};

export const dniValidator: ValidatorFn = (control): ValidationErrors | null => {
  const valor = texto(control);
  return !valor || DNI.test(valor) ? null : { dni: true };
};

export const celularPeruValidator: ValidatorFn = (control): ValidationErrors | null => {
  const valor = texto(control);
  if (!valor) return null;
  if (!valor.startsWith('9')) return { celularInicio: true };
  return CELULAR_PERU.test(valor) ? null : { celularLargo: true };
};

export const direccionValidator: ValidatorFn = (control): ValidationErrors | null => {
  const valor = texto(control);
  return !valor || CARACTERES_DE_DIRECCION.test(valor) ? null : { direccion: true };
};

/** Errores de una fecha de nacimiento "AAAA-MM-DD"; null si es válida y la edad corresponde al centro. */
export function erroresDeFechaNacimiento(valor: string): ValidationErrors | null {
  const nacimiento = leerFechaIso(valor);
  if (!nacimiento) return { fechaInvalida: true };
  if (nacimiento > hoySinHora()) return { fechaFutura: true };
  const { anios } = calcularEdad(nacimiento);
  if (anios < EDAD_MINIMA_ANIOS || anios > EDAD_MAXIMA_ANIOS) return { fueraDeEdad: true };
  return null;
}

export const fechaNacimientoValidator: ValidatorFn = (control): ValidationErrors | null => {
  const valor = String(control.value ?? '');
  return valor ? erroresDeFechaNacimiento(valor) : null;
};

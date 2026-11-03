export interface Edad {
  readonly anios: number;
  readonly meses: number;
}

const FORMATO_FECHA_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const MESES_POR_ANIO = 12;

/** Convierte "AAAA-MM-DD" (valor de un input date) en una fecha local, o null si no es válida. */
export function leerFechaIso(valor: string): Date | null {
  const partes = FORMATO_FECHA_ISO.exec(valor);
  if (!partes) return null;

  const [anio, mes, dia] = partes.slice(1).map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const existe = fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
  return existe ? fecha : null;
}

/** Formatea una fecha local como "AAAA-MM-DD", el formato que usan los atributos min y max del input date. */
export function escribirFechaIso(fecha: Date): string {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

export function hoySinHora(): Date {
  const ahora = new Date();
  return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
}

export function calcularEdad(nacimiento: Date, hoy: Date = hoySinHora()): Edad {
  let meses = (hoy.getFullYear() - nacimiento.getFullYear()) * MESES_POR_ANIO + hoy.getMonth() - nacimiento.getMonth();
  if (hoy.getDate() < nacimiento.getDate()) meses--;
  return { anios: Math.floor(meses / MESES_POR_ANIO), meses: meses % MESES_POR_ANIO };
}

/** "2 años y 3 meses", "1 año", "8 meses" o "menos de 1 mes". */
export function describirEdad({ anios, meses }: Edad): string {
  const textoAnios = anios === 1 ? '1 año' : `${anios} años`;
  const textoMeses = meses === 1 ? '1 mes' : `${meses} meses`;

  if (anios === 0 && meses === 0) return 'menos de 1 mes';
  if (anios === 0) return textoMeses;
  if (meses === 0) return textoAnios;
  return `${textoAnios} y ${textoMeses}`;
}

/** "AAAA-MM-DD" → "DD/MM/AAAA", como se escribe una fecha en Perú. */
export function fechaPeruana(valorIso: string): string {
  const [anio, mes, dia] = valorIso.split('-');
  return `${dia}/${mes}/${anio}`;
}

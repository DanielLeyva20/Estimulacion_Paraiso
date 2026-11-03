import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

/** Los 16 distritos de la provincia de Cañete (Lima, Perú). */
export const DISTRITOS_CANETE: readonly string[] = [
  'San Vicente de Cañete',
  'Asia',
  'Calango',
  'Cerro Azul',
  'Chilca',
  'Coayllo',
  'Imperial',
  'Lunahuaná',
  'Mala',
  'Nuevo Imperial',
  'Pacarán',
  'Quilmaná',
  'San Antonio',
  'San Luis',
  'Santa Cruz de Flores',
  'Zúñiga'
];

export const PROGRAMA_SIN_DEFINIR = 'Aún no lo sé, quiero orientación';

export const PROGRAMAS_DE_INTERES: readonly string[] = [
  PROGRAMA_SIN_DEFINIR,
  'Estimulación temprana',
  'Talleres y nido',
  'Educación y cuidado',
  'Vacaciones útiles (enero y febrero)',
  'Taller personalizado'
];

export const LARGO_MAXIMO_NOMBRE = 80;
export const LARGO_MINIMO_DIRECCION = 6;
export const LARGO_MAXIMO_DIRECCION = 120;
export const DIGITOS_DNI = 8;
export const DIGITOS_CELULAR = 9;

export type CampoMatricula =
  | 'nombreNino'
  | 'fechaNacimiento'
  | 'programa'
  | 'nombreApoderado'
  | 'dni'
  | 'celular'
  | 'distrito'
  | 'direccion'
  | 'autorizacion';

/** Orden en que se revisan los campos al enviar: el primero con error recibe el foco. */
export const ORDEN_DE_CAMPOS: readonly CampoMatricula[] = [
  'nombreNino',
  'fechaNacimiento',
  'programa',
  'nombreApoderado',
  'dni',
  'celular',
  'distrito',
  'direccion',
  'autorizacion'
];

/** Datos que cuentan para el avance de la ficha (todos menos el programa, que es opcional). */
export const CAMPOS_OBLIGATORIOS: readonly CampoMatricula[] = ORDEN_DE_CAMPOS.filter((campo) => campo !== 'programa');

export type IdGrupoMatricula = 'nino' | 'apoderado' | 'direccion';

export interface GrupoMatricula {
  readonly id: IdGrupoMatricula;
  readonly nombre: string;
  readonly campos: readonly CampoMatricula[];
  /** Clase de Tailwind del color del grupo en el indicador de avance. */
  readonly color: string;
}

export const GRUPOS_MATRICULA: readonly GrupoMatricula[] = [
  { id: 'nino', nombre: 'Tu niño', campos: ['nombreNino', 'fechaNacimiento'], color: 'bg-turquesa' },
  { id: 'apoderado', nombre: 'Apoderado', campos: ['nombreApoderado', 'dni', 'celular'], color: 'bg-coral' },
  { id: 'direccion', nombre: 'Dirección', campos: ['distrito', 'direccion'], color: 'bg-mostaza' }
];

const NOMBRE_COMPLETO = {
  soloLetras: 'Usa solo letras y espacios, sin números ni símbolos.',
  nombreIncompleto: 'Escribe nombre y apellido.',
  maxlength: `Máximo ${LARGO_MAXIMO_NOMBRE} caracteres.`
};

/** Mensaje de error por campo y por tipo de error. Cada uno dice qué falta y cómo corregirlo. */
export const MENSAJES_DE_ERROR: Record<CampoMatricula, Record<string, string>> = {
  nombreNino: { required: 'Escribe el nombre completo de tu niño o niña.', ...NOMBRE_COMPLETO },
  fechaNacimiento: {
    required: 'Elige su fecha de nacimiento.',
    fechaInvalida: 'La fecha no es válida. Revísala.',
    fechaFutura: 'La fecha no puede ser posterior a hoy.',
    fueraDeEdad: 'Atendemos a niños de 1 a 2 años. Escríbenos por WhatsApp y te orientamos.'
  },
  programa: {},
  nombreApoderado: { required: 'Escribe tu nombre completo.', ...NOMBRE_COMPLETO },
  dni: {
    required: 'Escribe tu número de DNI.',
    dni: `El DNI tiene ${DIGITOS_DNI} dígitos.`
  },
  celular: {
    required: 'Escribe tu número de celular.',
    celularInicio: 'Los celulares en Perú empiezan con 9.',
    celularLargo: `El celular tiene ${DIGITOS_CELULAR} dígitos.`
  },
  distrito: { required: 'Elige tu distrito.' },
  direccion: {
    required: 'Escribe tu dirección.',
    minlength: 'Escribe la dirección completa (calle, número o referencia).',
    maxlength: `Máximo ${LARGO_MAXIMO_DIRECCION} caracteres.`,
    direccion: 'Usa letras, números y los signos . , # ° / - solamente.'
  },
  autorizacion: { required: 'Necesitamos tu autorización para contactarte.' }
};

export const MENSAJE_DE_ERROR_GENERICO = 'Revisa este dato.';

export const PASOS_DESPUES_DE_ENVIAR: readonly string[] = [
  'Se abre WhatsApp con la ficha ya escrita: solo presiona enviar.',
  'Te confirmamos vacantes, horarios y costos del programa.',
  'Coordinamos una visita y el primer día de tu niño.'
];

/** Siluetas del fondo: útiles de su primer día. */
export const SILUETAS_MATRICULA: readonly SiluetaFondo[] = [
  { forma: 'lapiz', clases: 'top-[4%] right-[3%] w-14 rotate-12 md:w-20' },
  { forma: 'estrella', clases: 'top-[8%] left-[2%] w-10 -rotate-12 md:w-12' },
  { forma: 'bloque', clases: 'top-[48%] left-[2%] w-12 rotate-6 max-md:hidden' },
  { forma: 'nota', clases: 'bottom-[22%] right-[2%] w-12 -rotate-6 max-md:hidden' },
  { forma: 'nube', clases: 'bottom-[4%] left-[3%] w-24 md:w-32' }
];

/** Detalles a mano del fondo; el avioncito de papel acompaña la idea de "enviar" la ficha. */
export const GARABATOS_MATRICULA: readonly GarabatoFondo[] = [
  { forma: 'rayitos', clases: 'top-[6%] left-[40%] w-11 rotate-12 text-mostaza max-lg:hidden' },
  { forma: 'estrella-contorno', clases: 'top-[34%] left-[1%] w-9 -rotate-12 text-mostaza max-md:hidden' },
  { forma: 'corazon-contorno', clases: 'bottom-[10%] left-[2%] w-9 rotate-6 text-coral' },
  { forma: 'estrella-contorno', clases: 'bottom-[4%] right-[4%] w-8 rotate-12 text-white/80' }
];

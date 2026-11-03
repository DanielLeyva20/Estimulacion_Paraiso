import { whatsappUrl } from '../../core/contacto';
import { Tono } from '../../core/tonos';
import { FormaDivisor } from '../../shared/divisor/divisor.component';
import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { Foto } from '../espacios/espacios.data';

/** Clases de Tailwind que visten la franja de cada programa. */
export interface TemaPrograma {
  /** Fondo de la franja y variante de texto (franja-clara o franja-oscura). */
  readonly franja: string;
  /** Mismo color de fondo, aplicado al divisor que "muerde" lo que hay arriba. */
  readonly divisor: string;
  readonly formaDivisor: FormaDivisor;
  /** Color y opacidad de las siluetas del fondo. */
  readonly siluetas: string;
  /** Color del ícono dentro de la insignia blanca de la foto. */
  readonly insignia: string;
  /** Color de la palabra resaltada del título (letra recortada). */
  readonly resalte: string;
  /** Color de los trazos punteados del fondo dibujado. */
  readonly trazos: string;
}

/** Título partido para resaltar su última palabra: "Estimulación" + "temprana". */
export interface TituloPrograma {
  readonly inicio: string;
  readonly resalte: string;
}

/** Fondo dibujado de la franja: detalles a mano y, si corresponde, avioncito o curva punteada. */
export interface FondoPrograma {
  readonly garabatos: readonly GarabatoFondo[];
  readonly vuelo?: boolean;
  readonly curva?: boolean;
}

/** Colores que van rotando en las pastillas de "Lo que desarrolla". */
export const TONOS_AREAS: readonly Tono[] = ['coral', 'turquesa', 'morado', 'mostaza'];

export interface Programa {
  readonly id: string;
  readonly nombre: string;
  readonly titulo: TituloPrograma;
  readonly descripcion: string;
  readonly desarrolla: readonly string[];
  readonly foto: Foto;
  readonly icono: NombreIcono;
  readonly tema: TemaPrograma;
  readonly siluetas: readonly SiluetaFondo[];
  readonly fondo: FondoPrograma;
  readonly whatsapp: string;
}

export const PROGRAMAS: readonly Programa[] = [
  {
    id: 'estimulacion',
    nombre: 'Estimulación temprana',
    titulo: { inicio: 'Estimulación', resalte: 'temprana' },
    descripcion:
      'Sesiones con juegos, música, texturas y movimiento pensados para cada etapa: caminar con seguridad, trepar, ' +
      'explorar con las manos y decir sus primeras palabras. Te contamos cómo acompañar cada logro también en casa.',
    desarrolla: ['Motricidad', 'Lenguaje', 'Sentidos', 'Vínculo afectivo'],
    foto: { src: 'img/bebe-juguetes.webp', alt: 'Bebé sentado rodeado de juguetes y libros', ancho: 1400, alto: 933 },
    icono: 'bebe',
    tema: {
      franja: 'bg-turquesa franja-clara',
      divisor: 'text-turquesa',
      formaDivisor: 'curva',
      siluetas: 'text-white/25',
      insignia: 'text-turquesa-oscuro',
      resalte: 'text-mostaza',
      trazos: 'text-white/80'
    },
    siluetas: [
      { forma: 'sonaja', clases: 'top-[6%] left-[3%] w-16 -rotate-12 md:w-24' },
      { forma: 'estrella', clases: 'top-[10%] right-[8%] w-12 rotate-12 md:w-16' },
      { forma: 'patito', clases: 'bottom-[12%] left-[40%] w-20 md:w-28' },
      { forma: 'nube', clases: 'right-[2%] bottom-[6%] w-24 md:w-36' },
      { forma: 'estrella', clases: 'bottom-[30%] left-[5%] w-8 -rotate-6 max-md:hidden' }
    ],
    fondo: {
      curva: true,
      garabatos: [
        { forma: 'rayitos', clases: 'top-[12%] left-[46%] w-12 rotate-12 text-mostaza max-lg:hidden' },
        { forma: 'estrella-contorno', clases: 'top-[30%] left-[2%] w-9 -rotate-12 text-white max-md:hidden' },
        { forma: 'corazon-contorno', clases: 'top-[18%] right-[14%] w-9 rotate-12 text-white' },
        { forma: 'estrella-contorno', clases: 'bottom-[16%] right-[30%] w-8 rotate-6 text-mostaza' }
      ]
    },
    whatsapp: whatsappUrl('Hola Mi Paraíso, quisiera información sobre estimulación temprana.')
  },
  {
    id: 'talleres',
    nombre: 'Talleres y nido',
    titulo: { inicio: 'Talleres y', resalte: 'nido' },
    descripcion:
      'Arte, música, cuentos y juego en grupo, con una rutina amable que les da seguridad. Es el primer paso para ' +
      'compartir con otros niños y prepararse con alegría para el cole.',
    desarrolla: ['Creatividad', 'Socialización', 'Autonomía', 'Rutinas'],
    foto: { src: 'img/taller-arte.webp', alt: 'Maestra pintando con un grupo de niños', ancho: 1000, alto: 1333 },
    icono: 'grupo',
    tema: {
      franja: 'bg-mostaza franja-clara',
      divisor: 'text-mostaza',
      formaDivisor: 'festones',
      siluetas: 'text-white/35',
      insignia: 'text-mostaza-oscuro',
      resalte: 'text-coral',
      trazos: 'text-white/85'
    },
    siluetas: [
      { forma: 'nota', clases: 'top-[8%] right-[4%] w-14 rotate-12 md:w-20' },
      { forma: 'bloque', clases: 'top-[12%] left-[46%] w-12 -rotate-12 max-md:hidden' },
      { forma: 'nube', clases: 'bottom-[8%] left-[2%] w-24 md:w-36' },
      { forma: 'estrella', clases: 'right-[40%] bottom-[14%] w-10 rotate-6 md:w-14' },
      { forma: 'bloque', clases: 'right-[6%] bottom-[10%] w-16 rotate-6 md:w-20' }
    ],
    fondo: {
      vuelo: true,
      garabatos: [
        { forma: 'rayitos', clases: 'top-[14%] left-[3%] w-12 -rotate-12 text-coral max-md:hidden' },
        { forma: 'estrella-contorno', clases: 'bottom-[20%] left-[44%] w-9 rotate-12 text-white max-lg:hidden' },
        { forma: 'corazon-contorno', clases: 'top-[46%] right-[2%] w-9 -rotate-6 text-coral max-md:hidden' },
        { forma: 'estrella-contorno', clases: 'bottom-[12%] right-[18%] w-8 -rotate-12 text-white' }
      ]
    },
    whatsapp: whatsappUrl('Hola Mi Paraíso, quisiera información sobre los talleres y el nido.')
  },
  {
    id: 'cuidado',
    nombre: 'Educación y cuidado',
    titulo: { inicio: 'Educación y', resalte: 'cuidado' },
    descripcion:
      'Mientras trabajas, tu hijo pasa el día en un lugar seguro y cálido: juega, aprende, descansa y es atendido ' +
      'con paciencia y cariño por personas que conocen su nombre y sus costumbres.',
    desarrolla: ['Cuidado diario', 'Aprendizaje', 'Hábitos', 'Juego libre'],
    foto: {
      src: 'img/bebe-explora.webp',
      alt: 'Niña pequeña explorando un juguete en una sala luminosa',
      ancho: 1000,
      alto: 1500
    },
    icono: 'corazon',
    tema: {
      franja: 'bg-morado franja-oscura',
      divisor: 'text-morado',
      formaDivisor: 'ola',
      siluetas: 'text-white/15',
      insignia: 'text-morado',
      resalte: 'text-mostaza',
      trazos: 'text-white/60'
    },
    siluetas: [
      { forma: 'luna', clases: 'top-[8%] left-[4%] w-16 -rotate-12 md:w-24' },
      { forma: 'estrella', clases: 'top-[14%] left-[42%] w-8 max-md:hidden' },
      { forma: 'osito', clases: 'right-[3%] top-[6%] w-16 rotate-6 md:w-24' },
      { forma: 'corazon', clases: 'bottom-[12%] left-[38%] w-12 -rotate-6 md:w-16' },
      { forma: 'nube', clases: 'right-[4%] bottom-[8%] w-24 md:w-32' }
    ],
    fondo: {
      curva: true,
      garabatos: [
        { forma: 'rayitos', clases: 'top-[10%] left-[44%] w-12 rotate-6 text-mostaza max-lg:hidden' },
        { forma: 'estrella-contorno', clases: 'top-[26%] right-[2%] w-9 rotate-12 text-mostaza max-md:hidden' },
        { forma: 'corazon-contorno', clases: 'bottom-[22%] left-[2%] w-10 -rotate-12 text-coral' },
        { forma: 'estrella-contorno', clases: 'bottom-[10%] right-[34%] w-8 rotate-6 text-white/80' }
      ]
    },
    whatsapp: whatsappUrl('Hola Mi Paraíso, quisiera información sobre el servicio de educación y cuidado.')
  }
];

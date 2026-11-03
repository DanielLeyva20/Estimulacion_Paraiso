import { Tono } from '../../core/tonos';
import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { Foto } from '../espacios/espacios.data';

export interface Mes {
  readonly abreviatura: string;
  readonly nombre: string;
  readonly esVerano: boolean;
}

export interface ActividadVerano {
  readonly nombre: string;
  readonly texto: string;
  readonly icono: NombreIcono;
  /** Clases de Tailwind de la parada en la ruta: fondo y color del ícono. */
  readonly color: string;
}

export interface DatoVacaciones {
  readonly etiqueta: string;
  readonly valor: string;
  readonly icono: NombreIcono;
  readonly tono: Tono;
}

/** Foto del collage. `clases` ubica y gira la lámina dentro del collage (utilidades de Tailwind). */
export interface FotoCollage extends Foto {
  readonly leyenda: string;
  readonly proporcion: string;
  readonly clases: string;
}

export const MESES_DEL_ANIO: readonly Mes[] = [
  { abreviatura: 'Ene', nombre: 'enero', esVerano: true },
  { abreviatura: 'Feb', nombre: 'febrero', esVerano: true },
  { abreviatura: 'Mar', nombre: 'marzo', esVerano: false },
  { abreviatura: 'Abr', nombre: 'abril', esVerano: false },
  { abreviatura: 'May', nombre: 'mayo', esVerano: false },
  { abreviatura: 'Jun', nombre: 'junio', esVerano: false },
  { abreviatura: 'Jul', nombre: 'julio', esVerano: false },
  { abreviatura: 'Ago', nombre: 'agosto', esVerano: false },
  { abreviatura: 'Set', nombre: 'setiembre', esVerano: false },
  { abreviatura: 'Oct', nombre: 'octubre', esVerano: false },
  { abreviatura: 'Nov', nombre: 'noviembre', esVerano: false },
  { abreviatura: 'Dic', nombre: 'diciembre', esVerano: false }
];

export const ACTIVIDADES_VERANO: readonly ActividadVerano[] = [
  {
    nombre: 'Juego y movimiento',
    texto: 'Circuitos, pelotas y túneles para gatear, saltar y moverse con seguridad.',
    icono: 'pelota',
    color: 'bg-turquesa text-tinta'
  },
  {
    nombre: 'Arte y pintura',
    texto: 'Pintura con manos y pinceles, masas y collages llenos de color.',
    icono: 'pincel',
    color: 'bg-coral text-tinta'
  },
  {
    nombre: 'Música y movimiento',
    texto: 'Canciones, instrumentos y baile para moverse con alegría.',
    icono: 'musica',
    color: 'bg-azul text-white'
  },
  {
    nombre: 'Cuentos y títeres',
    texto: 'Historias que despiertan la imaginación y las primeras palabras.',
    icono: 'libro',
    color: 'bg-morado text-white'
  },
  {
    nombre: 'Juego sensorial',
    texto: 'Masas, telas, semillas y texturas para descubrir el mundo con las manos.',
    icono: 'mano',
    color: 'bg-blanco text-tinta'
  }
];

export const DATOS_VACACIONES: readonly DatoVacaciones[] = [
  { etiqueta: 'Cuándo', valor: 'Enero y febrero', icono: 'calendario', tono: 'turquesa' },
  { etiqueta: 'Para quién', valor: 'Niños de 1 a 2 años', icono: 'bebe', tono: 'coral' },
  { etiqueta: 'Cómo', valor: 'En grupos pequeños', icono: 'grupo', tono: 'morado' }
];

export const FOTOS_COLLAGE: readonly FotoCollage[] = [
  {
    src: 'img/vacaciones-dibujo.webp',
    alt: 'Profesora dibujando junto a una niña en un aula colorida',
    ancho: 1400,
    alto: 934,
    leyenda: 'Dibujo con la profe',
    proporcion: 'aspect-4/3',
    clases: 'top-[3%] left-0 z-1 w-[64%] [--lamina-giro:-3deg]'
  },
  {
    src: 'img/vacaciones-burbujas.webp',
    alt: 'Bebé rodeado de burbujas en un patio soleado',
    ancho: 1000,
    alto: 1500,
    leyenda: 'Burbujas en el patio',
    proporcion: 'aspect-3/4',
    clases: 'top-0 right-0 z-2 w-[38%] [--lamina-giro:4deg]'
  },
  {
    src: 'img/vacaciones-manitos.webp',
    alt: 'Dibujos hechos con las manos pintadas, colgados a secar',
    ancho: 1400,
    alto: 1134,
    leyenda: 'Manitos de colores',
    proporcion: 'aspect-4/3',
    clases: 'bottom-0 left-[14%] z-3 w-[50%] [--lamina-giro:2deg]'
  }
];

/** Siluetas del fondo: útiles de arte y juego, sin nada de playa (son las vacaciones útiles de enero y febrero). */
export const SILUETAS_VACACIONES: readonly SiluetaFondo[] = [
  { forma: 'lapiz', clases: 'top-[3%] left-[2%] w-14 -rotate-12 md:w-20' },
  { forma: 'estrella', clases: 'top-[5%] right-[3%] w-10 rotate-12 md:w-14' },
  { forma: 'bloque', clases: 'top-[44%] right-[2%] w-12 -rotate-12 max-md:hidden' },
  { forma: 'nube', clases: 'top-[60%] -left-4 w-20 md:w-24' },
  { forma: 'nota', clases: 'bottom-[5%] left-[46%] w-12 rotate-6 md:w-16' },
  { forma: 'nube', clases: 'right-[3%] bottom-[3%] w-24 md:w-32' }
];

/** Detalles a mano del fondo: estrellas y corazones que titilan, rayitos de sol. */
export const GARABATOS_VACACIONES: readonly GarabatoFondo[] = [
  { forma: 'rayitos', clases: 'top-[5%] left-[46%] w-12 rotate-12 text-coral max-lg:hidden' },
  { forma: 'estrella-contorno', clases: 'top-[12%] right-[3%] w-9 rotate-12 text-white' },
  { forma: 'corazon-contorno', clases: 'top-[46%] left-[1%] w-9 -rotate-12 text-coral max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[7%] right-[6%] w-8 -rotate-6 text-coral' },
  { forma: 'estrella-contorno', clases: 'top-[62%] right-[2%] w-7 rotate-12 text-white max-md:hidden' }
];

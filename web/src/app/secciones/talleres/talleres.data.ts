import { Tono } from '../../core/tonos';
import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { Foto } from '../espacios/espacios.data';

export interface TemaTaller {
  readonly id: string;
  readonly nombre: string;
  readonly icono: NombreIcono;
  readonly tono: Tono;
  /** Foto que aparece en la vista previa cuando este es el último tema elegido. */
  readonly foto: Foto;
}

export type IdModalidad = 'individual' | 'grupo' | 'familia';

export interface ModalidadTaller {
  readonly id: IdModalidad;
  readonly nombre: string;
  readonly detalle: string;
  readonly icono: NombreIcono;
  readonly tono: Tono;
}

export interface PasoCoordinacion {
  readonly titulo: string;
  readonly texto: string;
  /** Foto de referencia que aparece al pasar el mouse sobre el paso. */
  readonly foto: Foto;
}

export const TEMAS_TALLER: readonly TemaTaller[] = [
  {
    id: 'estimulacion',
    tono: 'coral',
    nombre: 'Estimulación',
    icono: 'bebe',
    foto: {
      src: 'img/bebe-juguetes.webp',
      alt: 'Bebé sentado rodeado de juguetes y libros',
      ancho: 1400,
      alto: 929
    }
  },
  {
    id: 'arte',
    tono: 'mostaza',
    nombre: 'Arte y texturas',
    icono: 'pincel',
    foto: {
      src: 'img/manos-pintura.webp',
      alt: 'Niña sonriendo con las manos pintadas',
      ancho: 1200,
      alto: 798
    }
  },
  {
    id: 'musica',
    tono: 'morado',
    nombre: 'Música y movimiento',
    icono: 'musica',
    foto: {
      src: 'img/taller-musica.webp',
      alt: 'Niños pequeños tocando instrumentos',
      ancho: 1400,
      alto: 933
    }
  },
  {
    id: 'cocina',
    tono: 'menta',
    nombre: 'Cocina sensorial',
    icono: 'mano',
    foto: {
      src: 'img/taller-masa.webp',
      alt: 'Bebé con las manos en un bol de harina junto a un rodillo',
      ancho: 1000,
      alto: 1503
    }
  },
  {
    id: 'lenguaje',
    tono: 'agua',
    nombre: 'Lenguaje y cuentos',
    icono: 'libro',
    foto: {
      src: 'img/lectura-familia.webp',
      alt: 'Mamá y niño leyendo un cuento recostados en el piso',
      ancho: 1400,
      alto: 788
    }
  },
  {
    id: 'psicomotricidad',
    tono: 'turquesa',
    nombre: 'Psicomotricidad',
    icono: 'pelota',
    foto: {
      src: 'img/juego-bloques.webp',
      alt: 'Niña construyendo con bloques gigantes de colores',
      ancho: 1000,
      alto: 1500
    }
  }
];

/** Foto de la vista previa mientras aún no se elige ningún tema. */
export const FOTO_TALLER_INICIAL: Foto = {
  src: 'img/taller-pintura.webp',
  alt: 'Niña con mandil pintando un lienzo con pincel y manos',
  ancho: 1000,
  alto: 1499
};

export const MODALIDADES_TALLER: readonly ModalidadTaller[] = [
  { id: 'individual', nombre: 'Individual', detalle: 'Solo tu hijo y su profesora', icono: 'bebe', tono: 'turquesa' },
  { id: 'grupo', nombre: 'Grupo pequeño', detalle: 'Con otros niños de su edad', icono: 'grupo', tono: 'mostaza' },
  { id: 'familia', nombre: 'Con mamá o papá', detalle: 'Aprenden juntos', icono: 'familia', tono: 'coral' }
];

export const MODALIDAD_PREDETERMINADA: IdModalidad = 'individual';

export const PASOS_COORDINACION: readonly PasoCoordinacion[] = [
  {
    titulo: 'Nos cuentas sobre tu hijo',
    texto: 'Su edad, lo que le encanta y lo que te gustaría reforzar.',
    foto: {
      src: 'img/padres-sesion.webp',
      alt: 'Mamá sentada con su hijo conversando en el centro',
      ancho: 1400,
      alto: 934
    }
  },
  {
    titulo: 'Te proponemos un plan',
    texto: 'Temas, número de sesiones, horario y modalidad pensados para él o ella.',
    foto: {
      src: 'img/rincon-circulo.webp',
      alt: 'Rincón con cojines de colores preparado para una actividad',
      ancho: 1600,
      alto: 1067
    }
  },
  {
    titulo: 'Empieza su taller',
    texto: 'Y te contamos cómo avanza para que también lo acompañes en casa.',
    foto: {
      src: 'img/manos-pintura.webp',
      alt: 'Niña sonriendo con las manos pintadas durante su taller',
      ancho: 1200,
      alto: 798
    }
  }
];

/** Siluetas del fondo, en los colores de la página porque esta sección va sobre crema. */
export const SILUETAS_TALLERES: readonly SiluetaFondo[] = [
  { forma: 'lapiz', clases: 'top-[4%] right-[5%] w-12 rotate-12 text-coral/30 md:w-16' },
  { forma: 'nota', clases: 'top-[36%] left-[1%] w-12 -rotate-6 text-morado/20 max-md:hidden' },
  { forma: 'estrella', clases: 'top-[46%] right-[2%] w-10 rotate-12 text-mostaza/45 md:w-12' },
  { forma: 'bloque', clases: 'bottom-[6%] left-[3%] w-12 -rotate-12 text-turquesa/25 md:w-14' },
  { forma: 'nube', clases: 'right-[30%] bottom-[2%] w-24 text-azul/15 max-md:hidden' }
];

/** Detalles a mano del fondo, en coral y mostaza sobre el crema. */
export const GARABATOS_TALLERES: readonly GarabatoFondo[] = [
  { forma: 'rayitos', clases: 'top-[3%] left-[2%] w-11 -rotate-12 text-mostaza max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'top-[30%] right-[2%] w-9 rotate-12 text-coral' },
  { forma: 'corazon-contorno', clases: 'top-[55%] left-[1%] w-9 -rotate-6 text-coral/70 max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[5%] left-[8%] w-8 rotate-6 text-mostaza' },
  { forma: 'estrella-contorno', clases: 'bottom-[30%] right-[1%] w-7 -rotate-12 text-mostaza max-md:hidden' }
];

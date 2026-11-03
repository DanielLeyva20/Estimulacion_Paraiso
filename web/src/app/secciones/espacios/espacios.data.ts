import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

export interface Foto {
  readonly src: string;
  readonly alt: string;
  readonly ancho: number;
  readonly alto: number;
}

export interface DetalleEspacio {
  readonly texto: string;
  readonly icono: NombreIcono;
}

/** Clases de Tailwind con el color propio de cada espacio. */
export interface TemaEspacio {
  /** Fondo de la parcela girada detrás del visor. */
  readonly fondo: string;
  /** Anillo de la miniatura elegida. */
  readonly anillo: string;
  /** Fondo suave y color de los íconos de los detalles. */
  readonly icono: string;
}

export interface Espacio {
  readonly id: string;
  readonly nombre: string;
  readonly resumen: string;
  readonly detalles: readonly DetalleEspacio[];
  readonly tema: TemaEspacio;
  readonly fotos: readonly Foto[];
}

export const ESPACIOS: readonly Espacio[] = [
  {
    id: 'juego',
    nombre: 'Sala de juego y arte',
    resumen:
      'Un espacio luminoso con mesitas y sillas a su altura, rincones de juego simbólico y materiales para pintar, ' +
      'construir y descubrir. Aquí los niños se mueven, crean y aprenden jugando.',
    detalles: [
      { texto: 'Mobiliario a la medida de los más pequeños', icono: 'bebe' },
      { texto: 'Rincón de cocinita y casitas para el juego simbólico', icono: 'casa' },
      { texto: 'Pintura, texturas y materiales sensoriales', icono: 'pincel' },
      { texto: 'Bloques, instrumentos y juguetes para cada etapa', icono: 'pelota' }
    ],
    tema: { fondo: 'bg-coral', anillo: 'ring-coral', icono: 'bg-coral/20 text-coral-oscuro' },
    fotos: [
      {
        src: 'img/sala-juego-mesas.webp',
        alt: 'Sala con mesitas y sillas infantiles, y casitas de juego al fondo',
        ancho: 1400,
        alto: 933
      },
      { src: 'img/manos-pintura.webp', alt: 'Niña sonriendo con las manos pintadas de celeste', ancho: 1200, alto: 800 },
      { src: 'img/bloques.webp', alt: 'Niño apilando cubos de colores', ancho: 1000, alto: 1500 }
    ]
  },
  {
    id: 'padres',
    nombre: 'Área para padres',
    resumen:
      'Un lugar cómodo para esperar, conversar con el equipo sobre los avances de tu hijo o acompañarlo en las ' +
      'actividades. Creemos que el desarrollo de un niño se construye en familia.',
    detalles: [
      { texto: 'Espacio cómodo para esperar con tranquilidad', icono: 'reloj' },
      { texto: 'Conversaciones sobre cómo va tu hijo', icono: 'mensaje' },
      { texto: 'Actividades donde mamá y papá participan', icono: 'familia' },
      { texto: 'Ideas para seguir estimulando en casa', icono: 'casa' }
    ],
    tema: { fondo: 'bg-azul', anillo: 'ring-azul', icono: 'bg-azul/15 text-azul-oscuro' },
    fotos: [
      { src: 'img/padres-sesion.webp', alt: 'Mamá sentada con su hijo en una actividad grupal', ancho: 1400, alto: 933 },
      { src: 'img/mama-bebe.webp', alt: 'Mamá y bebé riendo juntos', ancho: 1000, alto: 1500 },
      { src: 'img/xilofono.webp', alt: 'Bebé jugando con un xilófono de colores', ancho: 1200, alto: 800 }
    ]
  }
];

/** Siluetas del fondo, en los colores de la página porque esta sección va sobre crema. */
export const SILUETAS_ESPACIOS: readonly SiluetaFondo[] = [
  { forma: 'estrella', clases: 'top-[4%] right-[6%] w-12 rotate-12 text-mostaza/40 md:w-16' },
  { forma: 'nube', clases: 'top-[30%] left-[1%] w-20 text-turquesa/20 max-md:hidden' },
  { forma: 'bloque', clases: 'top-[46%] right-[2%] w-12 -rotate-12 text-coral/25 md:w-14' },
  { forma: 'osito', clases: 'bottom-[22%] left-[2%] w-14 rotate-6 text-azul/15 md:w-16' },
  { forma: 'corazon', clases: 'right-[44%] bottom-[4%] w-10 -rotate-6 text-coral/25 max-md:hidden' }
];

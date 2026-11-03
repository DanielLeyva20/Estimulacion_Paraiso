import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

export interface Paso {
  readonly titulo: string;
  readonly texto: string;
  /** Clases de Tailwind del sobre: color de fondo y franja (clara u oscura) que fija el color de su texto. */
  readonly tema: string;
}

export const PASOS: readonly Paso[] = [
  {
    titulo: 'Escríbenos por WhatsApp',
    texto: 'Cuéntanos la edad de tu hijo y qué te interesa. Te enviamos horarios y precios.',
    tema: 'bg-azul franja-oscura'
  },
  {
    titulo: 'Visítanos con tu hijo',
    texto: 'Recorre los espacios, conoce al equipo y mira cómo se siente tu pequeño.',
    tema: 'bg-mostaza franja-clara'
  },
  {
    titulo: 'Elijan juntos y empiecen',
    texto: 'Te ayudamos a escoger el programa ideal y coordinamos el primer día.',
    tema: 'bg-coral franja-clara'
  }
];

/** Siluetas del fondo, en los colores de las cartas porque esta sección va sobre crema. */
export const SILUETAS_PASOS: readonly SiluetaFondo[] = [
  { forma: 'estrella', clases: 'top-[8%] right-[6%] w-12 rotate-12 text-mostaza/40 md:w-16' },
  { forma: 'corazon', clases: 'top-[14%] left-[52%] w-10 -rotate-6 text-coral/30 max-md:hidden' },
  { forma: 'nube', clases: 'right-[3%] bottom-[6%] w-24 text-azul/15 md:w-32' },
  { forma: 'patito', clases: 'bottom-[4%] left-[30%] w-16 text-mostaza/35 md:w-20' }
];

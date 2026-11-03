import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

export interface PreguntaFrecuente {
  readonly pregunta: string;
  readonly respuesta: string;
}

export const PREGUNTAS_FRECUENTES: readonly PreguntaFrecuente[] = [
  {
    pregunta: '¿Desde qué edad pueden asistir?',
    respuesta:
      'Atendemos a niños de 1 a 2 años: desde su primer cumpleaños hasta antes de cumplir 3. Cada actividad se adapta a la etapa de tu hijo.'
  },
  {
    pregunta: '¿Puedo acompañar a mi hijo?',
    respuesta:
      'Sí. Contamos con un área para padres y hay actividades en las que mamá o papá participan. Te contamos cuáles según la edad de tu hijo.'
  },
  {
    pregunta: '¿Cuáles son los horarios y precios?',
    respuesta: 'Escríbenos por WhatsApp y te enviamos los horarios y precios actualizados de cada programa.'
  },
  {
    pregunta: '¿Puedo visitar el local antes de inscribir a mi hijo?',
    respuesta: 'Claro que sí. Coordina tu visita por WhatsApp y ven a conocer los espacios con tu pequeño.'
  },
  {
    pregunta: '¿Dónde están ubicados?',
    respuesta: 'Estamos en Imperial, Cañete. Te enviamos la dirección exacta y la ubicación por WhatsApp.'
  },
  {
    pregunta: '¿Qué necesita llevar mi hijo?',
    respuesta: 'Depende del programa. Al inscribirte te damos una lista sencilla con todo lo necesario.'
  }
];

/** Siluetas del fondo, en los colores de la página porque esta sección va sobre crema. */
export const SILUETAS_PREGUNTAS: readonly SiluetaFondo[] = [
  { forma: 'pregunta', clases: 'top-[6%] right-[4%] w-12 rotate-12 text-coral/30 md:w-16' },
  { forma: 'nube', clases: 'top-[4%] left-[2%] w-20 text-turquesa/20 md:w-28' },
  { forma: 'pregunta', clases: 'top-[48%] left-[44%] w-10 -rotate-12 text-mostaza/40 max-lg:hidden' },
  { forma: 'estrella', clases: 'bottom-[30%] right-[2%] w-10 text-morado/20 md:w-12' },
  { forma: 'corazon', clases: 'bottom-[6%] left-[3%] w-12 -rotate-6 text-coral/25 md:w-14' },
  { forma: 'nube', clases: 'right-[8%] bottom-[3%] w-24 text-azul/15 md:w-28' }
];

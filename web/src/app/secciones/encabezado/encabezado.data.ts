import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

export interface EnlaceNavegacion {
  /** Id de la sección destino (sin #). */
  readonly id: string;
  readonly texto: string;
  readonly icono: NombreIcono;
  /** Clases de Tailwind del cuadro del ícono en el menú: fondo y color del ícono. */
  readonly color: string;
}

/** En el mismo orden en que aparecen las secciones en la página. */
export const ENLACES_NAVEGACION: readonly EnlaceNavegacion[] = [
  { id: 'espacios', texto: 'Espacios', icono: 'casa', color: 'bg-turquesa text-tinta' },
  { id: 'programas', texto: 'Programas', icono: 'bebe', color: 'bg-coral text-tinta' },
  { id: 'vacaciones', texto: 'Vacaciones', icono: 'calendario', color: 'bg-mostaza text-tinta' },
  { id: 'talleres', texto: 'Talleres', icono: 'pincel', color: 'bg-morado text-white' },
  { id: 'galeria', texto: 'Galería', icono: 'ampliar', color: 'bg-azul text-white' },
  { id: 'nosotros', texto: 'Nosotros', icono: 'corazon', color: 'bg-cielo text-azul-oscuro' },
  { id: 'matricula', texto: 'Matrícula', icono: 'mensaje', color: 'bg-turquesa text-tinta' },
  { id: 'ubicacion', texto: 'Ubicación', icono: 'ubicacion', color: 'bg-mostaza text-tinta' }
];

/** Siluetas que flotan en el fondo turquesa del menú. */
export const SILUETAS_MENU: readonly SiluetaFondo[] = [
  { forma: 'estrella', clases: 'top-[12%] right-[10%] w-10 rotate-12 text-mostaza/60' },
  { forma: 'nube', clases: 'top-[34%] -right-6 w-28 text-white/12' },
  { forma: 'luna', clases: 'top-[58%] right-[6%] w-12 -rotate-12 text-white/15' },
  { forma: 'corazon', clases: 'bottom-[30%] right-[22%] w-9 rotate-6 text-white/20' },
  { forma: 'estrella', clases: 'top-[44%] left-[4%] w-7 -rotate-6 text-white/20' }
];

import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { EnlaceNavegacion } from '../encabezado/encabezado.data';

/** El pie solo necesita el destino y el texto de cada enlace. */
export type EnlacePie = Pick<EnlaceNavegacion, 'id' | 'texto'>;

export const ENLACES_PIE: readonly EnlacePie[] = [
  { id: 'espacios', texto: 'Espacios' },
  { id: 'programas', texto: 'Programas' },
  { id: 'vacaciones', texto: 'Vacaciones' },
  { id: 'talleres', texto: 'Talleres' },
  { id: 'galeria', texto: 'Galería' },
  { id: 'nosotros', texto: 'Nosotros' },
  { id: 'preguntas', texto: 'Preguntas' },
  { id: 'matricula', texto: 'Matrícula' },
  { id: 'ubicacion', texto: 'Ubicación' }
];

/** Nubes que deambulan por el cielo del pie. */
export const NUBES_PIE: readonly SiluetaFondo[] = [
  { forma: 'nube', clases: 'top-[8%] left-[38%] w-24 md:w-32' },
  { forma: 'nube', clases: 'top-[20%] right-[3%] w-20 md:w-28 max-md:hidden' },
  { forma: 'nube', clases: 'top-[46%] left-[-2%] w-24 md:w-32 max-md:hidden' }
];

/** Detalles a mano del cielo del pie: estrellas y corazones que titilan. */
export const GARABATOS_PIE: readonly GarabatoFondo[] = [
  { forma: 'estrella-contorno', clases: 'top-[12%] left-[30%] w-8 rotate-12 text-mostaza max-md:hidden' },
  { forma: 'corazon-contorno', clases: 'top-[40%] right-[6%] w-9 -rotate-12 text-coral' },
  { forma: 'estrella-contorno', clases: 'top-[58%] left-[48%] w-7 rotate-6 text-white max-lg:hidden' },
  { forma: 'rayitos', clases: 'top-[6%] left-[2%] w-10 -rotate-12 text-mostaza max-md:hidden' }
];

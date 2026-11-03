import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { Foto } from '../espacios/espacios.data';

export interface DatoTrayectoria {
  readonly valor: string;
  readonly texto: string;
  readonly icono: NombreIcono;
}

export interface RazonConfianza {
  readonly titulo: string;
  readonly texto: string;
  readonly icono: NombreIcono;
}

export const NOMBRE_DIRECTORA = 'Yesenia Matos Sánchez';
export const NOMBRE_COLEGIO = 'Mi Pequeño Paraíso';
export const ANIOS_DEL_COLEGIO = 36;

/** Foto grupal: la directora junto a su equipo. No se señala a nadie en particular. */
export const FOTO_EQUIPO: Foto = {
  src: 'img/directora-equipo.webp',
  alt: `${NOMBRE_DIRECTORA} junto a su equipo de profesoras, con el uniforme del colegio ${NOMBRE_COLEGIO}`,
  ancho: 1080,
  alto: 615
};

export const DATOS_TRAYECTORIA: readonly DatoTrayectoria[] = [
  { valor: 'Profesora', texto: 'y directora de colegio', icono: 'libro' },
  { valor: 'Inicial y primaria', texto: `los niveles de ${NOMBRE_COLEGIO}`, icono: 'grupo' },
  { valor: '1 a 2 años', texto: 'la etapa que acompaña en Mi Paraíso', icono: 'bebe' }
];

export const RAZONES_CONFIANZA: readonly RazonConfianza[] = [
  {
    titulo: 'Experiencia de toda una vida',
    texto:
      `${ANIOS_DEL_COLEGIO} años al frente de un colegio de inicial y primaria respaldan cada decisión ` +
      'que se toma en Mi Paraíso.',
    icono: 'hoja'
  },
  {
    titulo: 'Profesora antes que todo',
    texto: 'Conoce el aula desde adentro: sabe cómo aprende, juega y se siente un niño pequeño.',
    icono: 'corazon'
  },
  {
    titulo: 'Una escuela que sigue creciendo con él',
    texto:
      'La misma dirección y la misma forma de enseñar continúan en el colegio ' +
      `${NOMBRE_COLEGIO}, de inicial y primaria.`,
    icono: 'casa'
  }
];

/** Siluetas sobre el cielo: nubes blancas y figuras en los colores de la página. */
export const SILUETAS_NOSOTROS: readonly SiluetaFondo[] = [
  { forma: 'nube', clases: 'top-[3%] left-[3%] w-24 text-white/80 md:w-36' },
  { forma: 'estrella', clases: 'top-[6%] right-[8%] w-10 rotate-12 text-mostaza/60 md:w-14' },
  { forma: 'nube', clases: 'top-[38%] right-[1%] w-20 text-white/70 max-md:hidden' },
  { forma: 'corazon', clases: 'top-[52%] left-[1%] w-10 -rotate-12 text-coral/40 md:w-12' },
  { forma: 'luna', clases: 'bottom-[18%] right-[4%] w-12 rotate-12 text-azul/20 md:w-16' },
  { forma: 'nube', clases: 'bottom-[4%] left-[30%] w-28 text-white/80 max-md:hidden' },
  { forma: 'estrella', clases: 'bottom-[8%] left-[4%] w-8 -rotate-6 text-morado/30' }
];

/** Detalles a mano del fondo, alrededor de la nube. */
export const GARABATOS_NOSOTROS: readonly GarabatoFondo[] = [
  { forma: 'rayitos', clases: 'top-[4%] right-[30%] w-11 rotate-12 text-mostaza max-lg:hidden' },
  { forma: 'estrella-contorno', clases: 'top-[20%] left-[2%] w-9 -rotate-12 text-mostaza' },
  { forma: 'corazon-contorno', clases: 'top-[60%] right-[2%] w-9 rotate-12 text-coral max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[5%] right-[12%] w-8 rotate-6 text-morado/50' }
];

/** Copo de la nube: por qué borde asoma, a qué altura de ese borde (%) y su tamaño (% del ancho de la nube). */
export interface CopoNube {
  readonly borde: 'arriba' | 'abajo' | 'izquierda' | 'derecha';
  readonly posicion: number;
  readonly tamano: number;
}

/** Copos de distintos tamaños alrededor de la tarjeta: es lo que la convierte en una nube. */
export const COPOS_NUBE: readonly CopoNube[] = [
  { borde: 'arriba', posicion: 10, tamano: 20 },
  { borde: 'arriba', posicion: 28, tamano: 24 },
  { borde: 'arriba', posicion: 48, tamano: 18 },
  { borde: 'arriba', posicion: 66, tamano: 23 },
  { borde: 'arriba', posicion: 86, tamano: 19 },
  { borde: 'abajo', posicion: 16, tamano: 18 },
  { borde: 'abajo', posicion: 38, tamano: 22 },
  { borde: 'abajo', posicion: 60, tamano: 17 },
  { borde: 'abajo', posicion: 82, tamano: 21 },
  { borde: 'izquierda', posicion: 36, tamano: 12 },
  { borde: 'izquierda', posicion: 66, tamano: 10 },
  { borde: 'derecha', posicion: 30, tamano: 11 },
  { borde: 'derecha', posicion: 62, tamano: 13 }
];

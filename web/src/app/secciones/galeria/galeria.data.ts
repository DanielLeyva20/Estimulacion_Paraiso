import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';
import { Foto } from '../espacios/espacios.data';

export type CategoriaGaleria = 'espacios' | 'estimulacion' | 'juegos' | 'talleres' | 'verano' | 'familias';
export type IdFiltro = CategoriaGaleria | 'todas';

/** El color de cada categoría vive en galeria.component.css ([data-categoria]); aquí solo su ícono. */
export interface FiltroGaleria {
  readonly id: IdFiltro;
  readonly nombre: string;
  readonly icono: NombreIcono;
}

export interface FotoGaleria extends Foto {
  readonly id: string;
  readonly titulo: string;
  readonly categoria: CategoriaGaleria;
  /** Ocupa dos columnas y dos filas en pantallas medianas y grandes. */
  readonly destacada?: boolean;
}

export const FILTROS_GALERIA: readonly FiltroGaleria[] = [
  { id: 'todas', nombre: 'Todas', icono: 'corazon' },
  { id: 'espacios', nombre: 'Espacios', icono: 'casa' },
  { id: 'estimulacion', nombre: 'Estimulación', icono: 'bebe' },
  { id: 'juegos', nombre: 'Juegos', icono: 'pelota' },
  { id: 'talleres', nombre: 'Talleres', icono: 'pincel' },
  { id: 'verano', nombre: 'Verano', icono: 'sol' },
  { id: 'familias', nombre: 'Familias', icono: 'familia' }
];

export const FOTOS_GALERIA: readonly FotoGaleria[] = [
  {
    id: 'sala-juego',
    titulo: 'Sala de juego',
    categoria: 'espacios',
    destacada: true,
    src: 'img/sala-juego.webp',
    alt: 'Sala de juego con cocinitas, casitas y mesas infantiles',
    ancho: 1800,
    alto: 1200
  },
  {
    id: 'taller-pintura',
    titulo: 'Taller de pintura',
    categoria: 'talleres',
    src: 'img/taller-pintura.webp',
    alt: 'Niña con mandil pintando un lienzo con pincel y manos',
    ancho: 1000,
    alto: 1499
  },
  {
    id: 'vacaciones-dibujo',
    titulo: 'Dibujo con la profesora',
    categoria: 'verano',
    src: 'img/vacaciones-dibujo.webp',
    alt: 'Profesora dibujando junto a una niña en un aula colorida',
    ancho: 1400,
    alto: 934
  },
  {
    id: 'bebe-juguetes',
    titulo: 'Explorar con juguetes',
    categoria: 'estimulacion',
    src: 'img/bebe-juguetes.webp',
    alt: 'Bebé sentado rodeado de juguetes y libros',
    ancho: 1400,
    alto: 929
  },
  {
    id: 'juego-columpio',
    titulo: 'Columpio',
    categoria: 'juegos',
    src: 'img/juego-columpio.webp',
    alt: 'Bebé riendo en un columpio al aire libre',
    ancho: 1000,
    alto: 1499
  },
  {
    id: 'mama-bebe',
    titulo: 'Mamá y bebé',
    categoria: 'familias',
    src: 'img/mama-bebe.webp',
    alt: 'Mamá y bebé riendo juntos',
    ancho: 1000,
    alto: 1499
  },
  {
    id: 'rincon-circulo',
    titulo: 'Rincón de encuentro',
    categoria: 'espacios',
    src: 'img/rincon-circulo.webp',
    alt: 'Rincón circular con cojines de colores y banderines',
    ancho: 1600,
    alto: 1067
  },
  {
    id: 'taller-masa',
    titulo: 'Cocina sensorial',
    categoria: 'talleres',
    src: 'img/taller-masa.webp',
    alt: 'Bebé con las manos en un bol de harina junto a un rodillo',
    ancho: 1000,
    alto: 1503
  },
  {
    id: 'juego-bloques',
    titulo: 'Bloques gigantes',
    categoria: 'juegos',
    destacada: true,
    src: 'img/juego-bloques.webp',
    alt: 'Niña construyendo con bloques gigantes de colores',
    ancho: 1000,
    alto: 1500
  },
  {
    id: 'vacaciones-burbujas',
    titulo: 'Burbujas en el patio',
    categoria: 'verano',
    src: 'img/vacaciones-burbujas.webp',
    alt: 'Bebé rodeado de burbujas en un patio soleado',
    ancho: 1000,
    alto: 1500
  },
  {
    id: 'xilofono',
    titulo: 'Música para bebés',
    categoria: 'estimulacion',
    src: 'img/xilofono.webp',
    alt: 'Bebé jugando con un xilófono de colores',
    ancho: 1200,
    alto: 800
  },
  {
    id: 'sala-juego-mesas',
    titulo: 'Mesitas a su medida',
    categoria: 'espacios',
    src: 'img/sala-juego-mesas.webp',
    alt: 'Sala con mesitas y sillas infantiles y casitas de juego al fondo',
    ancho: 1400,
    alto: 933
  },
  {
    id: 'manos-pintura',
    titulo: 'Pintura con las manos',
    categoria: 'talleres',
    src: 'img/manos-pintura.webp',
    alt: 'Niña sonriendo con las manos pintadas de celeste',
    ancho: 1200,
    alto: 798
  },
  {
    id: 'lectura-familia',
    titulo: 'Cuentos en familia',
    categoria: 'familias',
    src: 'img/lectura-familia.webp',
    alt: 'Mamá y niño leyendo un cuento recostados en el piso',
    ancho: 1400,
    alto: 788
  },
  {
    id: 'juego-tobogan',
    titulo: 'Tobogán',
    categoria: 'juegos',
    src: 'img/juego-tobogan.webp',
    alt: 'Bebé con overol sentado al pie de un tobogán',
    ancho: 1400,
    alto: 934
  },
  {
    id: 'vacaciones-manitos',
    titulo: 'Manitos de colores',
    categoria: 'verano',
    src: 'img/vacaciones-manitos.webp',
    alt: 'Dibujos hechos con las manos pintadas, colgados a secar',
    ancho: 1400,
    alto: 1134
  },
  {
    id: 'bebe-explora',
    titulo: 'Descubrir a su ritmo',
    categoria: 'estimulacion',
    src: 'img/bebe-explora.webp',
    alt: 'Niña pequeña explorando un juguete en una sala luminosa',
    ancho: 1000,
    alto: 1499
  },
  {
    id: 'taller-arte',
    titulo: 'Arte en grupo',
    categoria: 'talleres',
    src: 'img/taller-arte.webp',
    alt: 'Maestra pintando con un grupo de niños',
    ancho: 1000,
    alto: 1332
  },
  {
    id: 'sala-amplia',
    titulo: 'Sala amplia y luminosa',
    categoria: 'espacios',
    src: 'img/sala-amplia.webp',
    alt: 'Sala amplia con mesitas, cojines y estantes con juguetes',
    ancho: 1400,
    alto: 933
  },
  {
    id: 'bloques',
    titulo: 'Construir y apilar',
    categoria: 'juegos',
    src: 'img/bloques.webp',
    alt: 'Niño apilando cubos de colores',
    ancho: 1000,
    alto: 1500
  },
  {
    id: 'burbujas',
    titulo: 'Tardes al aire libre',
    categoria: 'verano',
    src: 'img/burbujas.webp',
    alt: 'Niña jugando con burbujas al aire libre',
    ancho: 1400,
    alto: 930
  },
  {
    id: 'padres-sesion',
    titulo: 'Con mamá y papá',
    categoria: 'familias',
    src: 'img/padres-sesion.webp',
    alt: 'Mamá sentada con su hijo en una actividad grupal',
    ancho: 1400,
    alto: 934
  }
];

/** Siluetas del fondo morado: estrellas, corazones y nubes, como recuerdos flotando. */
export const SILUETAS_GALERIA: readonly SiluetaFondo[] = [
  { forma: 'estrella', clases: 'top-[4%] left-[2%] w-10 -rotate-12 text-mostaza/50 md:w-14' },
  { forma: 'nube', clases: 'top-[2%] right-[6%] w-24 text-white/15 md:w-36' },
  { forma: 'corazon', clases: 'top-[42%] left-[1%] w-10 rotate-12 text-coral/40 max-md:hidden' },
  { forma: 'osito', clases: 'top-[55%] right-[1%] w-14 -rotate-6 text-white/10 max-md:hidden' },
  { forma: 'estrella', clases: 'bottom-[6%] right-[10%] w-8 rotate-12 text-turquesa/50' },
  { forma: 'nube', clases: 'bottom-[3%] left-[8%] w-28 text-white/10 max-md:hidden' }
];

/** Detalles a mano del fondo: estrellas y corazones sobre el morado. */
export const GARABATOS_GALERIA: readonly GarabatoFondo[] = [
  { forma: 'rayitos', clases: 'top-[4%] left-[44%] w-11 rotate-6 text-mostaza max-lg:hidden' },
  { forma: 'estrella-contorno', clases: 'top-[22%] left-[1%] w-8 -rotate-12 text-mostaza max-md:hidden' },
  { forma: 'corazon-contorno', clases: 'top-[48%] right-[1%] w-9 rotate-12 text-coral max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[4%] right-[8%] w-9 rotate-12 text-white' },
  { forma: 'estrella-contorno', clases: 'bottom-[30%] left-[1%] w-7 rotate-6 text-white/80 max-md:hidden' }
];

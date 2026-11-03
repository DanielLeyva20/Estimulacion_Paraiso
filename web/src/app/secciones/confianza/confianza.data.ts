import { Tono } from '../../core/tonos';
import { GarabatoFondo } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { NombreIcono } from '../../shared/icono/icono.component';
import { SiluetaFondo } from '../../shared/silueta/siluetas-fondo.component';

export interface Compromiso {
  readonly icono: NombreIcono;
  /** Color de la burbuja del ícono. */
  readonly tono: Tono;
  readonly titulo: string;
  readonly texto: string;
}

export const COMPROMISOS: readonly Compromiso[] = [
  {
    icono: 'puerta',
    tono: 'turquesa',
    titulo: 'Puertas abiertas',
    texto: 'Visita el local con tu hijo antes de inscribirlo y pregúntanos todo lo que necesites.'
  },
  {
    icono: 'casa',
    tono: 'mostaza',
    titulo: 'Un espacio a su medida',
    texto: 'Muebles, juguetes y materiales elegidos para niños de 1 a 2 años.'
  },
  {
    icono: 'grupo',
    tono: 'agua',
    titulo: 'Grupos pequeños',
    texto: 'Así cada niño recibe atención y ninguno pasa desapercibido.'
  },
  {
    icono: 'mensaje',
    tono: 'morado',
    titulo: 'Comunicación directa',
    texto: 'Resolvemos tus dudas por WhatsApp, de forma rápida y cercana.'
  },
  {
    icono: 'hoja',
    tono: 'menta',
    titulo: 'Limpio y ordenado',
    texto: 'Cuidamos que cada ambiente esté limpio, ventilado y en orden para ellos.'
  },
  {
    icono: 'corazon',
    tono: 'coral',
    titulo: 'Cariño y paciencia',
    texto: 'Respetamos los tiempos, el carácter y las necesidades de cada niño.'
  }
];

/** Nubes blancas que deambulan por el fondo. */
export const NUBES_CONFIANZA: readonly SiluetaFondo[] = [
  { forma: 'nube', clases: 'top-[2%] left-[52%] w-32 max-md:hidden' },
  { forma: 'nube', clases: 'top-[44%] right-[-2%] w-20 md:w-28 max-md:hidden' },
  { forma: 'nube', clases: 'right-[2%] bottom-[2%] w-28 md:w-40' },
  { forma: 'nube', clases: 'bottom-[1%] left-[-2%] w-28 md:w-36' }
];

/** Detalles dibujados a mano repartidos por el fondo. */
export const GARABATOS_CONFIANZA: readonly GarabatoFondo[] = [
  { forma: 'corazon-contorno', clases: 'top-[26%] left-[2%] w-9 -rotate-12 text-white md:w-11' },
  { forma: 'estrella-contorno', clases: 'top-[9%] right-[3%] w-8 rotate-12 text-mostaza md:w-10' },
  { forma: 'estrella-contorno', clases: 'bottom-[9%] left-[45%] w-9 -rotate-12 text-mostaza max-lg:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[11%] left-[64%] w-8 rotate-6 text-white max-lg:hidden' },
  { forma: 'corazon-contorno', clases: 'top-[58%] right-[2%] w-8 rotate-12 text-white/80 max-md:hidden' },
  { forma: 'estrella-contorno', clases: 'bottom-[4%] left-[6%] w-7 rotate-12 text-white md:hidden' }
];

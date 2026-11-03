import { NombreIcono } from '../shared/icono/icono.component';

export interface RedSocial {
  readonly id: 'youtube' | 'facebook' | 'tiktok';
  readonly nombre: string;
  readonly icono: NombreIcono;
  readonly url: string;
}

/**
 * Redes de Mi Paraíso. PROVISIONAL: las cuentas aún no existen, así que cada enlace lleva a la página
 * principal de la red. Al crearlas, se cambia aquí la `url` por la del perfil (por ejemplo
 * https://www.tiktok.com/@miparaiso) y se agrega también en `negocio.redesSociales` de
 * sitio.config.json, para que Google las asocie al centro.
 */
export const REDES_SOCIALES: readonly RedSocial[] = [
  { id: 'facebook', nombre: 'Facebook', icono: 'facebook', url: 'https://www.facebook.com/' },
  { id: 'tiktok', nombre: 'TikTok', icono: 'tiktok', url: 'https://www.tiktok.com/' },
  { id: 'youtube', nombre: 'YouTube', icono: 'youtube', url: 'https://www.youtube.com/' }
];

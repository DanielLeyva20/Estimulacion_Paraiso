export const WHATSAPP_NUMERO = '51974987291';
export const WHATSAPP_VISIBLE = '974 987 291';
export const UBICACION = 'Imperial, Cañete';

export interface Coordenadas {
  readonly latitud: number;
  readonly longitud: number;
}

/**
 * PROVISIONAL: Plaza de Armas de Imperial (OpenStreetMap), mientras se confirma la dirección exacta del local.
 * Al tenerla, se cambian estas coordenadas y REFERENCIA_UBICACION; el mapa y el botón "Cómo llegar" se actualizan solos.
 */
export const COORDENADAS_DEL_CENTRO: Coordenadas = { latitud: -13.0610454, longitud: -76.352939 };
export const REFERENCIA_UBICACION = 'Plaza de Armas de Imperial (referencial)';

export function comoLlegarUrl({ latitud, longitud }: Coordenadas = COORDENADAS_DEL_CENTRO): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;
}

const MENSAJE_PREDETERMINADO = 'Hola Mi Paraíso, quisiera información para mi hijo/a.';

export function whatsappUrl(mensaje = MENSAJE_PREDETERMINADO): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export function telefonoUrl(): string {
  return `tel:+${WHATSAPP_NUMERO}`;
}

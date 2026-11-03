/**
 * Política de seguridad y caché del sitio, en un solo lugar. La usan `preparar-produccion.mjs`
 * (para escribir `_headers` y `.htaccess`) y `servidor/servidor.mjs` (para responder con ella).
 */

/** Únicos orígenes externos que la página necesita. */
export const ORIGENES = {
  mapa: 'https://tile.openstreetmap.org',
  analiticaEnvio: 'https://cloudflareinsights.com'
};

/**
 * Angular (`security.autoCsp`) calcula los hashes de los scripts en línea de index.html y los deja en
 * una meta CSP. De ahí se toma `script-src` para que la política completa del servidor coincida.
 */
export function extraerScriptSrc(html) {
  const meta = /<meta http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html);
  const directiva = meta?.[1].split(';').find((parte) => parte.trim().startsWith('script-src'));
  if (!directiva) throw new Error('No se encontró la meta CSP de Angular. ¿Está activo "security.autoCsp" en angular.json?');
  return directiva.trim();
}

/**
 * Content-Security-Policy: todo sale del propio sitio salvo los mosaicos del mapa y, si está
 * configurada, la analítica. Bloquea scripts inyectados, que otro sitio meta la página en un iframe
 * (clickjacking) y que un formulario envíe datos a otro dominio.
 */
export function politicaContenido(scriptSrc, { conAnalitica = false, soloHttps = false } = {}) {
  const conexion = ["'self'", conAnalitica && ORIGENES.analiticaEnvio].filter(Boolean).join(' ');
  return [
    "default-src 'self'",
    scriptSrc,
    // Angular y Leaflet aplican estilos en línea (posiciones, animaciones): sin esto la página se rompe.
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: ${ORIGENES.mapa}`,
    "font-src 'self'",
    "media-src 'self'",
    `connect-src ${conexion}`,
    "manifest-src 'self'",
    "frame-src 'none'",
    "worker-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    // Pasa a HTTPS cualquier recurso pedido por HTTP. Solo donde el sitio ya tiene certificado:
    // sobre HTTP puro rompería la carga de la propia página.
    soloHttps && 'upgrade-insecure-requests'
  ]
    .filter(Boolean)
    .join('; ');
}

export function encabezadosSeguridad(csp) {
  return {
    'Content-Security-Policy': csp,
    // Solo tiene efecto cuando el sitio ya va por HTTPS; por HTTP el navegador lo ignora.
    'Strict-Transport-Security': 'max-age=31536000',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  };
}

/** Archivos con hash en el nombre (los genera Angular): nunca cambian, se guardan un año. */
export const CON_HASH = /-[A-Z0-9]{8}\.(js|css|woff2?|png)$/;

export function cacheControl(ruta) {
  if (ruta.endsWith('.html') || ruta === '/') return 'no-cache';
  if (CON_HASH.test(ruta)) return 'public, max-age=31536000, immutable';
  if (/^\/?(img|video)\//.test(ruta)) return 'public, max-age=2592000';
  return 'public, max-age=86400';
}

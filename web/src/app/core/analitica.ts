/** La escribe scripts/preparar-produccion.mjs solo si hay token en sitio.config.json. */
const META_TOKEN = 'mi-paraiso:analitica';
const SCRIPT_CLOUDFLARE = 'https://static.cloudflareinsights.com/beacon.min.js';

/**
 * Cloudflare Web Analytics: visitas, páginas y países sin cookies ni datos personales, así que no
 * hace falta aviso de cookies. Se carga al final, cuando el navegador está libre, para no restarle
 * nada a la carga de la página. Sin token configurado no hace nada.
 */
export function iniciarAnalitica(): void {
  const token = document.querySelector<HTMLMetaElement>(`meta[name="${META_TOKEN}"]`)?.content;
  if (!token) return;

  const cargar = () => {
    const script = document.createElement('script');
    script.defer = true;
    script.src = SCRIPT_CLOUDFLARE;
    script.dataset['cfBeacon'] = JSON.stringify({ token });
    document.head.append(script);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(cargar);
  else setTimeout(cargar, 2000);
}

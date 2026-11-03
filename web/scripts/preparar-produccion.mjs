/**
 * Se ejecuta solo después de `npm run build` (script "postbuild"). Toma `sitio.config.json` y deja
 * la carpeta dist lista para subir a cualquier hosting:
 *   - SEO en index.html: canonical, Open Graph con URL absoluta y datos estructurados (Schema.org).
 *   - robots.txt y sitemap.xml.
 *   - Encabezados de seguridad y caché para Netlify / Cloudflare Pages (_headers) y Apache (.htaccess).
 *   - /.well-known/security.txt.
 *
 * Sin "url" configurada el sitio se publica en modo "no indexar", para que Google no guarde
 * direcciones temporales (ngrok, pruebas). Al tener dominio, basta con poner la url y volver a construir.
 * Cada valor del archivo se puede reemplazar con una variable de entorno: SITIO_URL,
 * VERIFICACION_GOOGLE y TOKEN_CLOUDFLARE_ANALYTICS.
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CON_HASH, cacheControl, encabezadosSeguridad, extraerScriptSrc, politicaContenido } from './politica-seguridad.mjs';

const RAIZ_WEB = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ_WEB, 'dist/mi-paraiso/browser');
const MARCADOR_SEO = '<meta name="seo-generado">';
const IMAGEN_COMPARTIR = '/img/og-imagen.jpg';

const archivoConfig = JSON.parse(readFileSync(join(RAIZ_WEB, 'sitio.config.json'), 'utf8'));
const config = {
  ...archivoConfig,
  url: (process.env.SITIO_URL ?? archivoConfig.url).trim().replace(/\/+$/, ''),
  verificacionGoogle: (process.env.VERIFICACION_GOOGLE ?? archivoConfig.verificacionGoogle).trim(),
  tokenCloudflareAnalytics: (process.env.TOKEN_CLOUDFLARE_ANALYTICS ?? archivoConfig.tokenCloudflareAnalytics).trim()
};

if (config.url && !/^https?:\/\/[^/\s]+$/.test(config.url)) {
  throw new Error(`"url" debe ser solo el dominio con protocolo, por ejemplo https://miparaiso.pe (se recibió "${config.url}").`);
}
const indexable = Boolean(config.url);
const absoluta = (ruta) => `${config.url}${ruta}`;
const escribir = (ruta, contenido) => {
  mkdirSync(dirname(join(DIST, ruta)), { recursive: true });
  writeFileSync(join(DIST, ruta), contenido);
};

/* ---------- index.html ---------- */

const rutaIndex = join(DIST, 'index.html');
const html = readFileSync(rutaIndex, 'utf8');
if (!html.includes(MARCADOR_SEO)) throw new Error(`Falta el marcador ${MARCADOR_SEO} en src/index.html.`);

const etiquetas = [];
if (indexable) {
  etiquetas.push(
    `<link rel="canonical" href="${absoluta('/')}">`,
    `<meta property="og:url" content="${absoluta('/')}">`,
    `<meta property="og:image" content="${absoluta(IMAGEN_COMPARTIR)}">`,
    `<meta name="twitter:image" content="${absoluta(IMAGEN_COMPARTIR)}">`,
    `<script type="application/ld+json">${datosEstructurados()}</script>`
  );
} else {
  etiquetas.push('<meta name="robots" content="noindex, nofollow">', `<meta property="og:image" content="${IMAGEN_COMPARTIR}">`);
}
if (config.verificacionGoogle) {
  etiquetas.push(`<meta name="google-site-verification" content="${escaparAtributo(config.verificacionGoogle)}">`);
}
if (config.tokenCloudflareAnalytics) {
  // La lee src/app/core/analitica.ts para cargar el contador cuando la página ya está lista.
  etiquetas.push(`<meta name="mi-paraiso:analitica" content="${escaparAtributo(config.tokenCloudflareAnalytics)}">`);
}
writeFileSync(rutaIndex, html.replace(MARCADOR_SEO, etiquetas.join('\n  ')));

/* ---------- robots.txt y sitemap.xml ---------- */

escribir(
  'robots.txt',
  indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluta('/sitemap.xml')}\n` : 'User-agent: *\nDisallow: /\n'
);

if (indexable) {
  const imagenes = readdirSync(join(DIST, 'img'))
    .filter((nombre) => /\.(webp|jpg|png)$/.test(nombre))
    .map((nombre) => `    <image:image><image:loc>${absoluta(`/img/${nombre}`)}</image:loc></image:image>`);
  escribir(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${absoluta('/')}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
${imagenes.join('\n')}
  </url>
</urlset>
`
  );
}

/* ---------- Encabezados de seguridad y caché ---------- */

const scriptSrc = extraerScriptSrc(html);
const conAnalitica = Boolean(config.tokenCloudflareAnalytics);

// Netlify y Cloudflare Pages siempre sirven por HTTPS, así que ahí sí se fuerza.
const seguridadHttps = encabezadosSeguridad(politicaContenido(scriptSrc, { conAnalitica, soloHttps: true }));
// Carpetas completas con comodín; en la raíz, cada archivo con hash o .html por su nombre exacto.
const reglasCache = [
  ['/media/*', cacheControl('/media/fuente-ABCDEFGH.woff2')],
  ['/img/*', cacheControl('/img/foto.webp')],
  ['/video/*', cacheControl('/video/portada.mp4')],
  ...archivosPublicados()
    .filter((ruta) => ruta.lastIndexOf('/') === 0 && (ruta.endsWith('.html') || CON_HASH.test(ruta)))
    .map((ruta) => [ruta, cacheControl(ruta)])
].map(([ruta, valor]) => `${ruta}\n  Cache-Control: ${valor}`);
escribir(
  '_headers',
  [
    `/*\n${Object.entries(seguridadHttps).map(([nombre, valor]) => `  ${nombre}: ${valor}`).join('\n')}`,
    '/\n  Cache-Control: no-cache',
    ...reglasCache
  ].join('\n\n') + '\n'
);

// En Apache no se sabe si ya hay certificado: no se fuerza HTTPS (ver la regla comentada).
const seguridadApache = encabezadosSeguridad(politicaContenido(scriptSrc, { conAnalitica }));
escribir(
  '.htaccess',
  `# Generado por scripts/preparar-produccion.mjs. No editar a mano: se reescribe en cada build.
Options -Indexes
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Activar cuando el dominio tenga certificado SSL: manda todo HTTP a HTTPS.
  # RewriteCond %{HTTPS} off
  # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_headers.c>
${Object.entries(seguridadApache).map(([nombre, valor]) => `  Header always set ${nombre} "${valor}"`).join('\n')}
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
  <FilesMatch "-[A-Z0-9]{8}\\.(js|css|woff2?|png)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|jpg|png|mp4|webm)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml application/manifest+json text/plain application/xml
</IfModule>

AddType application/manifest+json .webmanifest
AddType image/webp .webp
AddType video/webm .webm
`
);

/* ---------- security.txt ---------- */

const unAnio = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
escribir(
  '.well-known/security.txt',
  `Contact: https://wa.me/${config.negocio.telefono.replace(/\D/g, '')}\nExpires: ${unAnio.toISOString()}\nPreferred-Languages: es\n${
    indexable ? `Canonical: ${absoluta('/.well-known/security.txt')}\n` : ''
  }`
);

console.log(
  indexable
    ? `✔ Producción lista para ${config.url} (indexable, con sitemap).`
    : '⚠ Sin "url" en sitio.config.json: el sitio se generó en modo NO INDEXAR. Configúrala al tener dominio.'
);

/* ---------- Ayudantes ---------- */

/** Ficha del centro para Google (Schema.org): nombre, ubicación, contacto y directora. */
function datosEstructurados() {
  const { negocio } = config;
  const idCentro = absoluta('/#centro');
  const centro = {
    '@type': 'ChildCare',
    '@id': idCentro,
    name: negocio.nombre,
    description: negocio.descripcion,
    url: absoluta('/'),
    image: [absoluta(IMAGEN_COMPARTIR), absoluta('/img/sala-juego.webp'), absoluta('/img/sala-amplia.webp')],
    logo: absoluta('/icono-512.png'),
    telephone: negocio.telefono,
    address: {
      '@type': 'PostalAddress',
      ...(negocio.direccion && { streetAddress: negocio.direccion }),
      addressLocality: negocio.localidad,
      addressRegion: negocio.region,
      addressCountry: negocio.pais
    },
    geo: { '@type': 'GeoCoordinates', latitude: negocio.latitud, longitude: negocio.longitud },
    areaServed: [
      { '@type': 'City', name: negocio.localidad },
      { '@type': 'AdministrativeArea', name: `Provincia de ${negocio.provincia}` }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: negocio.telefono,
      contactType: 'customer service',
      availableLanguage: 'es'
    },
    employee: { '@type': 'Person', name: negocio.directora, jobTitle: 'Directora' },
    knowsAbout: ['Estimulación temprana', 'Nido', 'Talleres para bebés y niños de 0 a 3 años', 'Vacaciones útiles'],
    ...(negocio.redesSociales.length > 0 && { sameAs: negocio.redesSociales })
  };
  const sitio = {
    '@type': 'WebSite',
    '@id': absoluta('/#sitio'),
    url: absoluta('/'),
    name: negocio.nombre,
    inLanguage: 'es-PE',
    publisher: { '@id': idCentro }
  };
  // "<" escapado: el JSON nunca puede cerrar la etiqueta <script> por accidente.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [centro, sitio] }).replace(/</g, '\\u003c');
}

function escaparAtributo(texto) {
  return texto.replace(/[&"<>]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[c]);
}

/** Rutas públicas ("/main-ABC.js", "/img/x.webp") de todo lo que hay en dist. */
function archivosPublicados(carpeta = DIST) {
  return readdirSync(carpeta).flatMap((nombre) => {
    const ruta = join(carpeta, nombre);
    if (statSync(ruta).isDirectory()) return archivosPublicados(ruta);
    return [`/${relative(DIST, ruta).split(sep).join('/')}`];
  });
}

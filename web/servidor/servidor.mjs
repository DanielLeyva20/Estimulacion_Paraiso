/**
 * Servidor de producción sin dependencias, para alojar el sitio en un VPS propio. (En Netlify o
 * Cloudflare Pages no hace falta: ellos sirven dist con `_headers` y `404.html`).
 *
 *   npm run build && npm run servir          → http://localhost:4400
 *
 * Variables de entorno:
 *   PUERTO=4400         Puerto donde escucha.
 *   HTTPS=1             El sitio ya se sirve con certificado (fuerza HTTPS en la CSP).
 *   DETRAS_DE_PROXY=1   Hay un Nginx / Cloudflare delante: la IP real llega en X-Forwarded-For.
 *
 * Protecciones: límite de peticiones por IP (429), solo GET/HEAD, sin acceso fuera de dist ni a
 * archivos ocultos, tiempos máximos contra conexiones lentas y encabezados de seguridad.
 */
import { createReadStream, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants as zlib, gzipSync } from 'node:zlib';
import { cacheControl, encabezadosSeguridad, extraerScriptSrc, politicaContenido } from '../scripts/politica-seguridad.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '../dist/mi-paraiso/browser');
const PUERTO = Number(process.env.PUERTO ?? 4400);
const DETRAS_DE_PROXY = process.env.DETRAS_DE_PROXY === '1';

/*
 * Límite por IP con "cubeta de fichas": cada IP tiene hasta CAPACIDAD peticiones seguidas y recupera
 * RECARGA_POR_SEGUNDO. Una visita normal pide unos 60 archivos de golpe y luego casi nada, así que
 * nunca lo nota; un script que bombardea el sitio recibe 429 en segundos.
 */
const CAPACIDAD = 300;
const RECARGA_POR_SEGUNDO = 5;
const MAXIMO_IPS_RECORDADAS = 20_000;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};
const COMPRIMIBLES = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.xml', '.txt', '.svg']);
/** Archivos de configuración de otros hostings que no deben descargarse. */
const PRIVADOS = new Set(['/_headers', '/.htaccess']);

/*
 * Los hashes de la CSP salen de index.html y cambian en cada build. Se recalculan cuando el archivo
 * cambia, así un despliegue nuevo no necesita reiniciar el servidor.
 */
const RUTA_INDEX = join(RAIZ, 'index.html');
let seguridadEnCache = { version: -1, encabezados: {} };
function encabezadosActuales() {
  const version = statSync(RUTA_INDEX).mtimeMs;
  if (version !== seguridadEnCache.version) {
    const html = readFileSync(RUTA_INDEX, 'utf8');
    const conAnalitica = html.includes('name="mi-paraiso:analitica"');
    const csp = politicaContenido(extraerScriptSrc(html), { conAnalitica, soloHttps: process.env.HTTPS === '1' });
    seguridadEnCache = { version, encabezados: encabezadosSeguridad(csp) };
  }
  return seguridadEnCache.encabezados;
}
encabezadosActuales();

const cubetas = new Map();
function permitir(ip) {
  const ahora = Date.now();
  const cubeta = cubetas.get(ip) ?? { fichas: CAPACIDAD, ultima: ahora };
  cubeta.fichas = Math.min(CAPACIDAD, cubeta.fichas + ((ahora - cubeta.ultima) / 1000) * RECARGA_POR_SEGUNDO);
  cubeta.ultima = ahora;
  const permitido = cubeta.fichas >= 1;
  if (permitido) cubeta.fichas -= 1;
  // Se reinserta para que el Map quede ordenado por uso y la más antigua salga primero si se llena.
  cubetas.delete(ip);
  cubetas.set(ip, cubeta);
  if (cubetas.size > MAXIMO_IPS_RECORDADAS) cubetas.delete(cubetas.keys().next().value);
  return permitido;
}

const comprimidos = new Map();
function comprimido(archivo, version, codificacion) {
  const clave = `${archivo}|${version}|${codificacion}`;
  if (!comprimidos.has(clave)) {
    const datos = readFileSync(archivo);
    comprimidos.set(
      clave,
      codificacion === 'br' ? brotliCompressSync(datos, { params: { [zlib.BROTLI_PARAM_QUALITY]: 10 } }) : gzipSync(datos, { level: 9 })
    );
  }
  return comprimidos.get(clave);
}

/** Convierte la URL pedida en un archivo dentro de dist, o null si no es válida o sale de ahí. */
function resolverArchivo(url) {
  let ruta;
  try {
    ruta = decodeURIComponent(new URL(url, 'http://x').pathname);
  } catch {
    return null;
  }
  if (ruta.includes('\0') || PRIVADOS.has(ruta)) return null;
  if (/\/\.(?!well-known\/)/.test(ruta)) return null;
  const archivo = normalize(join(RAIZ, ruta === '/' ? 'index.html' : ruta));
  if (archivo !== RAIZ && !archivo.startsWith(RAIZ + sep)) return null;
  try {
    const datos = statSync(archivo);
    return datos.isFile() ? { archivo, datos, ruta } : null;
  } catch {
    return null;
  }
}

function responder(req, res, { archivo, datos, ruta }, estado = 200) {
  const ext = extname(archivo);
  const encabezados = {
    ...encabezadosActuales(),
    'Content-Type': TIPOS[ext] ?? 'application/octet-stream',
    'Cache-Control': estado === 200 ? cacheControl(ruta) : 'no-cache'
  };
  const cuerpoVacio = req.method === 'HEAD';

  const acepta = req.headers['accept-encoding'] ?? '';
  const codificacion = COMPRIMIBLES.has(ext) ? (/\bbr\b/.test(acepta) ? 'br' : /\bgzip\b/.test(acepta) ? 'gzip' : null) : null;
  if (codificacion) {
    const cuerpo = comprimido(archivo, datos.mtimeMs, codificacion);
    res.writeHead(estado, { ...encabezados, 'Content-Encoding': codificacion, 'Content-Length': cuerpo.length, Vary: 'Accept-Encoding' });
    return res.end(cuerpoVacio ? undefined : cuerpo);
  }

  // Rangos: Safari / iOS los exigen para reproducir el video.
  const rango = estado === 200 && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
  if (rango) {
    const inicio = rango[1] ? Number(rango[1]) : 0;
    const fin = rango[2] ? Math.min(Number(rango[2]), datos.size - 1) : datos.size - 1;
    if (inicio > fin || inicio >= datos.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${datos.size}` });
      return res.end();
    }
    res.writeHead(206, { ...encabezados, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${inicio}-${fin}/${datos.size}`, 'Content-Length': fin - inicio + 1 });
    return cuerpoVacio ? res.end() : createReadStream(archivo, { start: inicio, end: fin }).pipe(res);
  }

  res.writeHead(estado, { ...encabezados, 'Accept-Ranges': 'bytes', 'Content-Length': datos.size });
  return cuerpoVacio ? res.end() : createReadStream(archivo).pipe(res);
}

const servidor = createServer((req, res) => {
  const ip = (DETRAS_DE_PROXY && String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()) || req.socket.remoteAddress;
  if (!permitir(ip)) {
    res.writeHead(429, { 'Retry-After': '30', 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Demasiadas solicitudes. Intenta de nuevo en unos segundos.');
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }

  const encontrado = resolverArchivo(req.url ?? '/');
  if (encontrado) return responder(req, res, encontrado);
  const pagina404 = resolverArchivo('/404.html');
  if (pagina404) return responder(req, res, pagina404, 404);
  res.writeHead(404);
  res.end();
});

// Cortan conexiones que envían la petición a cuentagotas para acaparar el servidor (slowloris).
servidor.headersTimeout = 10_000;
servidor.requestTimeout = 20_000;
servidor.keepAliveTimeout = 5_000;

servidor.listen(PUERTO, () => console.log(`Mi Paraíso sirviéndose en http://localhost:${PUERTO}`));

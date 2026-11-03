/**
 * Genera versiones más chicas de cada foto de public/img (480 y 960 px de ancho, en WebP) y escribe el
 * catálogo src/app/core/imagenes-adaptables.ts, que usa la directiva appAdaptable para armar el srcset.
 * Así el navegador baja la foto del tamaño en que realmente se muestra.
 *
 *   node scripts/imagenes-adaptables.mjs
 *
 * Correrlo al agregar o cambiar fotos. Usa el Chrome instalado (variable CHROME para otra ruta).
 * Quedan fuera los logos, la imagen para compartir, el póster del video y las propias versiones generadas.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ_WEB = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARPETA_IMAGENES = join(RAIZ_WEB, 'public/img');
const CATALOGO = join(RAIZ_WEB, 'src/app/core/imagenes-adaptables.ts');
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ANCHOS = [480, 960];
/** Solo se crea una versión si la original es bastante más ancha; si no, no ahorra casi nada. */
const MARGEN_MINIMO = 1.2;
const CALIDAD = 0.8;
const EXCLUIDAS = /^(logo-|og-imagen|portada-video)|-\d+\.webp$/;

const fotos = readdirSync(CARPETA_IMAGENES).filter((nombre) => nombre.endsWith('.webp') && !EXCLUIDAS.test(nombre));

const perfil = mkdtempSync(join(tmpdir(), 'imagenes-adaptables-'));
const puerto = 9300 + Math.floor(Math.random() * 90);
const chrome = spawn(CHROME, [
  '--headless=new',
  '--allow-file-access-from-files',
  `--remote-debugging-port=${puerto}`,
  `--user-data-dir=${perfil}`,
  'about:blank'
]);

try {
  const evaluar = await conectar(puerto);
  const catalogo = {};

  for (const nombre of fotos) {
    const url = pathToFileURL(join(CARPETA_IMAGENES, nombre)).href;
    const { anchoOriginal, versiones } = await evaluar(`new Promise((ok, falla) => {
      const img = new Image();
      img.onerror = () => falla('No se pudo leer ${nombre}');
      img.onload = () => {
        const versiones = ${JSON.stringify(ANCHOS)}
          .filter((ancho) => img.width >= ancho * ${MARGEN_MINIMO})
          .map((ancho) => {
            const lienzo = document.createElement('canvas');
            lienzo.width = ancho;
            lienzo.height = Math.round((img.height / img.width) * ancho);
            const ctx = lienzo.getContext('2d');
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, lienzo.width, lienzo.height);
            return { ancho, datos: lienzo.toDataURL('image/webp', ${CALIDAD}).split(',')[1] };
          });
        ok({ anchoOriginal: img.width, versiones });
      };
      img.src = ${JSON.stringify(url)};
    })`);

    for (const { ancho, datos } of versiones) {
      writeFileSync(join(CARPETA_IMAGENES, nombre.replace(/\.webp$/, `-${ancho}.webp`)), Buffer.from(datos, 'base64'));
    }
    catalogo[`img/${nombre}`] = [...versiones.map((v) => v.ancho), anchoOriginal];
    console.log(`${nombre}: ${catalogo[`img/${nombre}`].join(', ')} px`);
  }

  const filas = Object.entries(catalogo)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([src, anchos]) => `  '${src}': [${anchos.join(', ')}]`);
  writeFileSync(
    CATALOGO,
    `// Generado por scripts/imagenes-adaptables.mjs: no editar a mano, volver a correr el script.

/**
 * Anchos disponibles de cada foto, de menor a mayor. El último es el de la original; los anteriores son
 * versiones reducidas que viven junto a ella como \`nombre-480.webp\`.
 */
export const ANCHOS_DE_FOTOS: Readonly<Record<string, readonly number[]>> = {
${filas.join(',\n')}
};
`
  );
  console.log(`\nCatálogo: ${Object.keys(catalogo).length} fotos.`);
} finally {
  chrome.kill();
  rmSync(perfil, { recursive: true, force: true, maxRetries: 3 });
}

/** Se conecta a Chrome por el protocolo de depuración y devuelve una función para evaluar código. */
async function conectar(puertoDepuracion) {
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  let objetivo;
  for (let intento = 0; intento < 80 && !objetivo; intento++) {
    await esperar(250);
    try {
      const paginas = await (await fetch(`http://127.0.0.1:${puertoDepuracion}/json`)).json();
      objetivo = paginas.find((p) => p.type === 'page');
    } catch {
      // Chrome todavía no abrió el puerto.
    }
  }
  if (!objetivo) throw new Error('No se pudo abrir Chrome.');

  const ws = new WebSocket(objetivo.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0;
  const pendientes = new Map();
  ws.addEventListener('message', (e) => {
    const mensaje = JSON.parse(e.data);
    pendientes.get(mensaje.id)?.(mensaje);
    pendientes.delete(mensaje.id);
  });
  const cdp = (method, params) =>
    new Promise((r) => {
      pendientes.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });

  // Una página vacía de archivo local: puede leer las imágenes de la carpeta.
  const pagina = join(perfil, 'vacia.html');
  writeFileSync(pagina, '<!doctype html>');
  await cdp('Page.navigate', { url: pathToFileURL(pagina).href });
  await esperar(500);

  return async (codigo) => {
    const respuesta = await cdp('Runtime.evaluate', { expression: codigo, awaitPromise: true, returnByValue: true });
    if (respuesta.result?.exceptionDetails) throw new Error(respuesta.result.exceptionDetails.exception?.value);
    return respuesta.result.result.value;
  };
}

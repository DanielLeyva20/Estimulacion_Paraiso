const ID_PANTALLA = 'pantalla-carga';
const SELECTOR_HOJA_PUERTA = '.puerta-hoja';
const CLASE_ABRIENDO = 'abriendo';
const CLASE_ENTRANDO = 'entrando';
const CLASE_DOCUMENTO_CARGANDO = 'cargando';

/** Tiempo mínimo antes de abrir las puertas: lo justo para que el paisaje y el castillo terminen de aparecer. */
const TIEMPO_MINIMO_MS = 1500;
/** Si las fuentes tardan demasiado (red lenta), no se hace esperar al visitante por ellas. */
const ESPERA_MAXIMA_FUENTES_MS = 2500;
/** Margen sobre la duración declarada, por si el navegador no avisa del fin de una transición. */
const MARGEN_RESPALDO_MS = 150;

const esperar = (ms: number) => new Promise<void>((resolver) => setTimeout(resolver, ms));

let avisarFinDeCarga!: () => void;
/**
 * Se cumple cuando la pantalla de carga libera la página. Sirve para dejar lo pesado (como el video
 * de la portada) para después, sin competir con lo esencial por la conexión.
 */
export const cargaTerminada = new Promise<void>((resolver) => (avisarFinDeCarga = resolver));

/**
 * Dirige la salida de la pantalla de carga de index.html, en cada visita y en cada recarga. Cuando la
 * página está pintada y las fuentes listas, las puertas del castillo se abren (`.abriendo`) y luego la
 * vista entra por ellas (`.entrando`) mientras la pantalla se desvanece. Las duraciones viven solo en
 * src/styles/pantalla-carga.css: aquí se espera a que terminen sus transiciones.
 * La promesa se cumple al liberar el scroll de la página (el desvanecido sigue un instante más).
 */
export async function ocultarPantallaDeCarga(): Promise<void> {
  const pantalla = document.getElementById(ID_PANTALLA);
  if (!pantalla) return avisarFinDeCarga();

  await Promise.all([
    esperar(Math.max(0, TIEMPO_MINIMO_MS - performance.now())),
    Promise.race([document.fonts?.ready, esperar(ESPERA_MAXIMA_FUENTES_MS)])
  ]);

  // Acto 2: se abren las puertas.
  pantalla.classList.add(CLASE_ABRIENDO);
  const hoja = pantalla.querySelector(SELECTOR_HOJA_PUERTA);
  if (hoja) await esperarTransicion(hoja, 'transform');

  // Acto 3: se entra por la puerta. La página ya se puede usar mientras la pantalla se desvanece.
  document.documentElement.classList.remove(CLASE_DOCUMENTO_CARGANDO);
  pantalla.classList.add(CLASE_ENTRANDO);
  avisarFinDeCarga();
  esperarTransicion(pantalla, 'opacity').then(() => pantalla.remove());
}

/**
 * Espera el fin de la transición de `propiedad` en el elemento. Si no hay transición (por ejemplo con
 * "reducir movimiento") sigue enseguida, y si el evento no llega, sigue al cumplirse la duración declarada.
 */
function esperarTransicion(elemento: Element, propiedad: string): Promise<void> {
  const estilo = getComputedStyle(elemento);
  const duracionMs = Math.max(...aMilisegundos(estilo.transitionDuration)) + Math.max(...aMilisegundos(estilo.transitionDelay));
  if (duracionMs === 0) return Promise.resolve();

  return new Promise((resolver) => {
    const terminar = () => {
      elemento.removeEventListener('transitionend', alTerminar);
      clearTimeout(respaldo);
      resolver();
    };
    const alTerminar = (evento: Event) => {
      const transicion = evento as TransitionEvent;
      if (transicion.target === elemento && transicion.propertyName === propiedad) terminar();
    };
    elemento.addEventListener('transitionend', alTerminar);
    const respaldo = setTimeout(terminar, duracionMs + MARGEN_RESPALDO_MS);
  });
}

/** "0.85s, 300ms" → [850, 300] */
function aMilisegundos(lista: string): number[] {
  return lista.split(',').map((valor) => parseFloat(valor) * (valor.trim().endsWith('ms') ? 1 : 1000));
}

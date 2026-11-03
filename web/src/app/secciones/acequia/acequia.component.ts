import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild
} from '@angular/core';

interface Punto {
  x: number;
  y: number;
}

interface Rectangulo {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** Punto del trayecto con la distancia recorrida hasta él: sirve para saber cuánto canal llenar de agua. */
interface MuestraTrazo {
  y: number;
  largo: number;
}

interface NodoRiego {
  y: number;
  elemento: SVGCircleElement;
}

const SELECTOR_ANCLAS = '[data-acequia]';
const ANCLA_PORTADA = 'inicio';
const SEPARACION_AL_MARGEN_PX = 26;
const DESFASE_VERTICAL_NODO_PX = 14;
const AMPLITUD_CURVA_PX = 14;
const PASO_MUESTREO_PX = 16;
const RADIO_NODO = 6;
/** El primer punto es el nacimiento del canal (al pie de la portada); los nodos van desde el segundo. */
const INDICE_PRIMER_NODO = 1;
const FRACCION_PANTALLA_DEL_NIVEL_AGUA = 0.62;
const MARGEN_FINAL_DE_PAGINA_PX = 80;
const ESPACIO_SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Canal de riego dibujado sobre el layout real: nace al pie de la portada
 * y baja por el margen izquierdo pasando por el encabezado de cada sección (`data-acequia`).
 * El agua llena el canal a medida que se hace scroll.
 */
@Component({
  selector: 'app-acequia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './acequia.component.html'
})
export class AcequiaComponent {
  private readonly anfitrion = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');
  private readonly cauce = viewChild.required<ElementRef<SVGPathElement>>('cauce');
  private readonly agua = viewChild.required<ElementRef<SVGPathElement>>('agua');
  private readonly brillo = viewChild.required<ElementRef<SVGPathElement>>('brillo');
  private readonly mascara = viewChild.required<ElementRef<SVGPathElement>>('mascara');
  private readonly nodos = viewChild.required<ElementRef<SVGGElement>>('nodos');

  private largoTotal = 0;
  private muestras: MuestraTrazo[] = [];
  private nodosRiego: NodoRiego[] = [];
  private frameId = 0;

  constructor() {
    afterNextRender(() => this.escucharLayoutYScroll());
  }

  private escucharLayoutYScroll(): void {
    const medir = () => {
      this.trazarCanal();
      this.regar();
    };
    const programar = (accion: () => void) => () => {
      cancelAnimationFrame(this.frameId);
      this.frameId = requestAnimationFrame(accion);
    };

    const alCambiarLayout = programar(medir);
    const alDesplazar = programar(() => this.regar());

    const observador = new ResizeObserver(alCambiarLayout);
    observador.observe(document.body);
    window.addEventListener('scroll', alDesplazar, { passive: true });
    document.fonts?.ready.then(medir);
    medir();

    this.destroyRef.onDestroy(() => {
      observador.disconnect();
      window.removeEventListener('scroll', alDesplazar);
      cancelAnimationFrame(this.frameId);
    });
  }

  private trazarCanal(): void {
    const lienzo = this.anfitrion.getBoundingClientRect();
    const enLienzo = (elemento: Element) => this.relativoA(lienzo, elemento.getBoundingClientRect());

    const anclas = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR_ANCLAS));
    const portada = anclas.find((ancla) => ancla.dataset['acequia'] === ANCLA_PORTADA);
    const secciones = anclas.filter((ancla) => ancla !== portada);
    if (!portada || !secciones.length) return;

    const puntos = this.calcularPuntos(portada, secciones, enLienzo);
    this.aplicarTrayecto(this.construirTrayecto(puntos));
    this.muestrearTrayecto(puntos[puntos.length - 1].y);
    this.dibujarNodos(puntos.slice(INDICE_PRIMER_NODO));
    this.svg().nativeElement.setAttribute('viewBox', `0 0 ${lienzo.width} ${lienzo.height}`);
  }

  private calcularPuntos(
    portada: HTMLElement,
    secciones: HTMLElement[],
    enLienzo: (elemento: Element) => Rectangulo
  ): Punto[] {
    const xMargen = enLienzo(secciones[0]).left - SEPARACION_AL_MARGEN_PX;

    return [
      { x: xMargen, y: enLienzo(portada).bottom },
      ...secciones.map((seccion) => ({
        x: xMargen,
        y: enLienzo(seccion).top + DESFASE_VERTICAL_NODO_PX
      }))
    ];
  }

  /** Curvas suaves de un nodo al siguiente, alternando el vaivén a izquierda y derecha. */
  private construirTrayecto(puntos: Punto[]): string {
    let trayecto = `M${puntos[0].x},${puntos[0].y}`;

    for (let i = 1; i < puntos.length; i++) {
      const desde = puntos[i - 1];
      const hasta = puntos[i];
      const yMedio = (desde.y + hasta.y) / 2;
      const vaiven = this.vaivenDeCurva(i);
      trayecto += ` C${desde.x + vaiven},${yMedio} ${hasta.x - vaiven},${yMedio} ${hasta.x},${hasta.y}`;
    }
    return trayecto;
  }

  private vaivenDeCurva(indice: number): number {
    return indice % 2 ? AMPLITUD_CURVA_PX : -AMPLITUD_CURVA_PX;
  }

  private aplicarTrayecto(trayecto: string): void {
    const trazos = [this.cauce(), this.agua(), this.brillo(), this.mascara()];
    trazos.forEach((trazo) => trazo.nativeElement.setAttribute('d', trayecto));

    this.largoTotal = this.agua().nativeElement.getTotalLength();
    this.agua().nativeElement.style.strokeDasharray = `${this.largoTotal}`;
    this.mascara().nativeElement.style.strokeDasharray = `${this.largoTotal}`;
  }

  private muestrearTrayecto(yFinal: number): void {
    const agua = this.agua().nativeElement;
    this.muestras = [];
    for (let largo = 0; largo <= this.largoTotal; largo += PASO_MUESTREO_PX) {
      this.muestras.push({ y: agua.getPointAtLength(largo).y, largo });
    }
    this.muestras.push({ y: yFinal, largo: this.largoTotal });
  }

  private dibujarNodos(puntos: Punto[]): void {
    const contenedor = this.nodos().nativeElement;
    contenedor.replaceChildren();

    this.nodosRiego = puntos.map((punto) => {
      const elemento = document.createElementNS(ESPACIO_SVG_NS, 'circle');
      elemento.setAttribute('class', 'acequia-nodo');
      elemento.setAttribute('cx', `${punto.x}`);
      elemento.setAttribute('cy', `${punto.y}`);
      elemento.setAttribute('r', `${RADIO_NODO}`);
      contenedor.appendChild(elemento);
      return { y: punto.y, elemento };
    });
  }

  private regar(): void {
    if (!this.largoTotal) return;

    const nivel = this.nivelDelAgua();
    const largoRegado = this.largoHastaNivel(nivel);
    const desfase = `${this.largoTotal - largoRegado}`;

    this.agua().nativeElement.style.strokeDashoffset = desfase;
    this.mascara().nativeElement.style.strokeDashoffset = desfase;
    this.nodosRiego.forEach((nodo) => nodo.elemento.classList.toggle('regado', nodo.y <= nivel));
  }

  /** Altura (en coordenadas del lienzo) hasta la que ya llegó el agua; al final de la página llena todo. */
  private nivelDelAgua(): number {
    const llegoAlFinal =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - MARGEN_FINAL_DE_PAGINA_PX;
    if (llegoAlFinal) return Infinity;

    return window.innerHeight * FRACCION_PANTALLA_DEL_NIVEL_AGUA - this.anfitrion.getBoundingClientRect().top;
  }

  private largoHastaNivel(nivel: number): number {
    let alcanzado = 0;
    for (const muestra of this.muestras) {
      if (muestra.y <= nivel) alcanzado = Math.max(alcanzado, muestra.largo);
      else if (muestra.largo > alcanzado) break;
    }
    return alcanzado;
  }

  private relativoA(base: DOMRect, caja: DOMRect): Rectangulo {
    return {
      left: caja.left - base.left,
      top: caja.top - base.top,
      right: caja.right - base.left,
      bottom: caja.bottom - base.top
    };
  }
}

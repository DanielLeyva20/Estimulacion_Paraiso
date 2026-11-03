import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { NombreSilueta, SiluetaComponent } from './silueta.component';

/** Figura del fondo. `clases` son utilidades de Tailwind: posición, tamaño, giro y, si hace falta, color. */
export interface SiluetaFondo {
  readonly forma: NombreSilueta;
  readonly clases: string;
}

/** Silueta con su propio recorrido, para que cada figura deambule a su ritmo y no todas al unísono. */
interface SiluetaConRecorrido extends SiluetaFondo {
  readonly duracionS: number;
  readonly retrasoS: number;
  readonly distanciaX: number;
  readonly distanciaY: number;
}

const DURACION_BASE_S = 14;
const DURACIONES_EXTRA_S = [0, 5, 2.5, 7];
const DESFASE_ENTRE_SILUETAS_S = 2.3;
const DISTANCIAS_X_PX = [26, -34, 20, -22, 38];
const DISTANCIAS_Y_PX = [30, 22, 40, 26, 18];

/**
 * Capa de siluetas para el fondo de una franja de color. Va dentro de un contenedor con `position: relative`
 * y ocupa todo su espacio. El color lo pone quien la usa (`class="text-white/25"`).
 * Las figuras solo se animan mientras la capa está en pantalla.
 */
@Component({
  selector: 'app-siluetas-fondo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, SiluetaComponent],
  host: {
    class: 'pointer-events-none absolute inset-0 overflow-hidden max-md:opacity-60',
    'aria-hidden': 'true',
    '[class.en-pausa]': '!enPantalla()'
  },
  templateUrl: './siluetas-fondo.component.html',
  styleUrl: './siluetas-fondo.component.css'
})
export class SiluetasFondoComponent {
  readonly siluetas = input.required<readonly SiluetaFondo[]>();

  protected readonly enPantalla = signal(false);
  protected readonly recorridos = computed<SiluetaConRecorrido[]>(() =>
    this.siluetas().map((silueta, i) => ({
      ...silueta,
      duracionS: DURACION_BASE_S + DURACIONES_EXTRA_S[i % DURACIONES_EXTRA_S.length],
      retrasoS: -i * DESFASE_ENTRE_SILUETAS_S,
      distanciaX: DISTANCIAS_X_PX[i % DISTANCIAS_X_PX.length],
      distanciaY: DISTANCIAS_Y_PX[i % DISTANCIAS_Y_PX.length]
    }))
  );

  constructor() {
    const elemento = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.enPantalla.set(true);
        return;
      }
      const observador = new IntersectionObserver(([entrada]) => this.enPantalla.set(entrada.isIntersecting));
      observador.observe(elemento);
      destroyRef.onDestroy(() => observador.disconnect());
    });
  }
}

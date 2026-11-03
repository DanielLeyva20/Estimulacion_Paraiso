import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Grados máximos de giro en cada eje cuando el puntero está en un borde. */
const GIRO_MAXIMO_GRADOS = 6;

/**
 * Inclina el elemento en 3D siguiendo el mouse y deja en CSS dónde está el puntero, para dibujar
 * un brillo encima. Solo escribe variables CSS (`--giro-x`, `--giro-y`, `--puntero-x`, `--puntero-y`)
 * una vez por cuadro, sin pasar por Angular: el estilo que las usa vive en el CSS de cada componente.
 * No hace nada en pantallas táctiles ni si el visitante pidió menos movimiento.
 */
@Directive({ selector: '[appInclinar]' })
export class InclinarDirective {
  constructor() {
    const elemento: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const conMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
      const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!conMouse || menosMovimiento) return;

      let cuadro = 0;
      const alMover = (evento: PointerEvent) => {
        cancelAnimationFrame(cuadro);
        cuadro = requestAnimationFrame(() => {
          const caja = elemento.getBoundingClientRect();
          const x = (evento.clientX - caja.left) / caja.width;
          const y = (evento.clientY - caja.top) / caja.height;
          elemento.style.setProperty('--giro-x', `${(0.5 - y) * GIRO_MAXIMO_GRADOS * 2}deg`);
          elemento.style.setProperty('--giro-y', `${(x - 0.5) * GIRO_MAXIMO_GRADOS * 2}deg`);
          elemento.style.setProperty('--puntero-x', `${x * 100}%`);
          elemento.style.setProperty('--puntero-y', `${y * 100}%`);
        });
      };
      const alSalir = () => {
        cancelAnimationFrame(cuadro);
        elemento.style.removeProperty('--giro-x');
        elemento.style.removeProperty('--giro-y');
      };

      elemento.addEventListener('pointermove', alMover, { passive: true });
      elemento.addEventListener('pointerleave', alSalir);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(cuadro);
        elemento.removeEventListener('pointermove', alMover);
        elemento.removeEventListener('pointerleave', alSalir);
      });
    });
  }
}

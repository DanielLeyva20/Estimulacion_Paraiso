import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

const MARGEN_INFERIOR_VISIBLE = '0px 0px -12% 0px';
const PORCENTAJE_VISIBLE = 0.12;
const CLASE_VISIBLE = 'visible';

/**
 * Un único IntersectionObserver para todos los elementos con `appRevelar`, en lugar de uno por elemento.
 * Cada elemento deja de observarse apenas se muestra: el revelado ocurre una sola vez.
 */
let observadorCompartido: IntersectionObserver | undefined;

function observador(): IntersectionObserver {
  observadorCompartido ??= new IntersectionObserver(
    (entradas, propio) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add(CLASE_VISIBLE);
        propio.unobserve(entrada.target);
      }
    },
    { rootMargin: MARGEN_INFERIOR_VISIBLE, threshold: PORCENTAJE_VISIBLE }
  );
  return observadorCompartido;
}

/**
 * Agrega la clase `visible` cuando el elemento entra en pantalla.
 * El valor opcional (`appRevelar="120"`) es el retraso de la animación en milisegundos.
 * Sin JavaScript el contenido ya es visible: la animación solo existe bajo la clase `.js` (ver components.css).
 */
@Directive({
  selector: '[appRevelar]',
  host: { class: 'revelar' }
})
export class RevelarDirective implements AfterViewInit, OnDestroy {
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly retraso = input(0, {
    alias: 'appRevelar',
    transform: (valor: unknown) => Number(valor) || 0
  });

  ngAfterViewInit(): void {
    this.elemento.style.setProperty('--retraso', `${this.retraso()}ms`);

    if (typeof IntersectionObserver === 'undefined') {
      this.elemento.classList.add(CLASE_VISIBLE);
      return;
    }
    observador().observe(this.elemento);
  }

  ngOnDestroy(): void {
    observadorCompartido?.unobserve(this.elemento);
  }
}

import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RedesSocialesComponent } from '../../shared/redes-sociales/redes-sociales.component';

/** El pie se carga diferido: se lo busca por su etiqueta cuando aparece en la página. */
const SELECTOR_PIE = 'app-pie';

/**
 * Barra de redes sociales pegada al borde izquierdo, a media pantalla. Solo en pantallas anchas
 * (desde 1440px), donde hay margen libre entre el borde y la acequia y no tapa contenido; en
 * pantallas menores las redes están en el pie y en el menú móvil. Mientras el pie está a la vista
 * (que ya muestra las redes) la barra se esconde hacia la izquierda.
 */
@Component({
  selector: 'app-redes-laterales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RedesSocialesComponent],
  templateUrl: './redes-laterales.component.html',
  styleUrl: './redes-laterales.component.css',
  host: { '[class.escondida]': 'pieVisible()', '[attr.inert]': 'pieVisible() ? "" : null' }
})
export class RedesLateralesComponent {
  readonly pieVisible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observadorPie = new IntersectionObserver(([entrada]) => this.pieVisible.set(entrada.isIntersecting));
      const observar = (pie: Element) => observadorPie.observe(pie);

      const pie = document.querySelector(SELECTOR_PIE);
      const esperaPie = new MutationObserver(() => {
        const encontrado = document.querySelector(SELECTOR_PIE);
        if (!encontrado) return;
        esperaPie.disconnect();
        observar(encontrado);
      });
      if (pie) observar(pie);
      else esperaPie.observe(document.body, { childList: true, subtree: true });

      destroyRef.onDestroy(() => {
        esperaPie.disconnect();
        observadorPie.disconnect();
      });
    });
  }
}

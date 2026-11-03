import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FormaDivisor = 'ola' | 'olas' | 'curva' | 'festones' | 'colinas';

/**
 * Borde decorativo entre secciones. Va como primer hijo de una sección con `position: relative`
 * y se dibuja justo encima de ella, "mordiendo" la sección anterior.
 * El color de relleno es `currentColor`: se le pasa el mismo color de fondo de la sección (`class="text-mostaza"`).
 */
@Component({
  selector: 'app-divisor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'divisor',
    'aria-hidden': 'true',
    '[class.divisor-invertido]': 'invertido()'
  },
  templateUrl: './divisor.component.html',
  styleUrl: './divisor.component.css'
})
export class DivisorComponent {
  readonly forma = input.required<FormaDivisor>();
  /** Refleja la forma de izquierda a derecha para que dos divisores seguidos no se vean iguales. */
  readonly invertido = input(false);
}

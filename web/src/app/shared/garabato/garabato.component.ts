import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NombreGarabato =
  | 'rayitos'
  | 'estrella-contorno'
  | 'corazon-contorno'
  | 'estrella-sonriente'
  | 'subrayado';

/**
 * Detalles dibujados a mano (rayitos, estrellas y corazones de contorno, una estrella sonriente y un
 * subrayado) que dan vida a una sección. Son decorativos: el color sale de `currentColor` (lo pone
 * quien lo usa con `text-*`) y cada forma trae su propia animación suave, que se apaga con
 * "reducir movimiento". El tamaño y la posición también los decide quien lo usa.
 */
@Component({
  selector: 'app-garabato',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './garabato.component.html',
  styleUrl: './garabato.component.css',
  host: { 'aria-hidden': 'true', '[attr.data-forma]': 'forma()' }
})
export class GarabatoComponent {
  readonly forma = input.required<NombreGarabato>();
}

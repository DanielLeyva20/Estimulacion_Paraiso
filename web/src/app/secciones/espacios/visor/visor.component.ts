import { NgClass } from '@angular/common';
import { ImagenAdaptableDirective } from '../../../shared/imagen-adaptable/imagen-adaptable.directive';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Espacio } from '../espacios.data';

/**
 * Visor de un espacio: foto grande con una parcela de color girada detrás y miniaturas para cambiarla.
 * Las fotos van apiladas y se funden entre sí, así el cambio no hace saltar el layout.
 */
@Component({
  selector: 'app-visor-espacio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImagenAdaptableDirective, NgClass],
  host: { class: 'block' },
  templateUrl: './visor.component.html'
})
export class VisorEspacioComponent {
  readonly espacio = input.required<Espacio>();
  /** Gira la parcela de fondo hacia el otro lado, para alternar entre un espacio y el siguiente. */
  readonly invertido = input(false);

  protected readonly activa = signal(0);

  protected elegir(indice: number): void {
    this.activa.set(indice);
  }
}

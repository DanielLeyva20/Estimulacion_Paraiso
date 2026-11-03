import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { REDES_SOCIALES } from '../../core/redes-sociales';
import { IconoComponent } from '../icono/icono.component';

/** Sobre qué fondo van los botones: `oscuro` (pie de página) o `claro` (menú móvil). */
export type FondoRedes = 'oscuro' | 'claro';

/** En fila (pie, menú) o en columna (barra lateral); en columna el nombre aparece a la derecha. */
export type OrientacionRedes = 'horizontal' | 'vertical';

/**
 * Botones redondos de las redes sociales. Al pasar el mouse (o enfocar con teclado) se llenan con
 * el color de cada marca desde abajo, el ícono saluda y aparece el nombre de la red encima.
 */
@Component({
  selector: 'app-redes-sociales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconoComponent],
  templateUrl: './redes-sociales.component.html',
  styleUrl: './redes-sociales.component.css',
  host: { '[attr.data-fondo]': 'fondo()', '[attr.data-orientacion]': 'orientacion()' }
})
export class RedesSocialesComponent {
  readonly fondo = input<FondoRedes>('oscuro');
  readonly orientacion = input<OrientacionRedes>('horizontal');
  readonly redes = REDES_SOCIALES;
}

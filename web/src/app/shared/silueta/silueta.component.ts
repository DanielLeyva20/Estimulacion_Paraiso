import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NombreSilueta =
  | 'estrella'
  | 'nube'
  | 'corazon'
  | 'luna'
  | 'sonaja'
  | 'patito'
  | 'nota'
  | 'bloque'
  | 'osito'
  | 'lapiz'
  | 'pregunta';

/**
 * Figura infantil decorativa para el fondo de una franja de color.
 * Se rellena con `currentColor`; el tamaño y la posición los da quien la usa.
 * Flota suavemente salvo que el usuario prefiera menos movimiento.
 */
@Component({
  selector: 'app-silueta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './silueta.component.html',
  styleUrl: './silueta.component.css'
})
export class SiluetaComponent {
  readonly forma = input.required<NombreSilueta>();
}

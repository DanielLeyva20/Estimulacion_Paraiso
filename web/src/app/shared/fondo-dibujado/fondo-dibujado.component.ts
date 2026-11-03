import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GarabatoComponent, NombreGarabato } from '../garabato/garabato.component';

/** Detalle dibujado a mano en el fondo de una sección. */
export interface GarabatoFondo {
  readonly forma: NombreGarabato;
  /** Utilidades de Tailwind: posición, tamaño, giro y color. */
  readonly clases: string;
}

/**
 * Fondo "dibujado" para una sección: ondas suaves en las esquinas como tela superpuesta, detalles a
 * mano (estrellas, corazones, rayitos) y, si se pide, un avioncito de papel con su rastro punteado,
 * una curva punteada abajo y un halo claro detrás del título. Va dentro de una sección con
 * `position: relative`, detrás del contenido. El color de los trazos punteados es `currentColor`:
 * lo pone quien lo usa (`class="text-white/85"`).
 */
@Component({
  selector: 'app-fondo-dibujado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, GarabatoComponent],
  templateUrl: './fondo-dibujado.component.html',
  styleUrl: './fondo-dibujado.component.css',
  host: { 'aria-hidden': 'true' }
})
export class FondoDibujadoComponent {
  readonly garabatos = input<readonly GarabatoFondo[]>([]);
  /** Ondas suaves en las esquinas; se apagan donde el fondo ya tiene su propio paisaje. */
  readonly ondas = input(true);
  /** Avioncito de papel con su rastro, arriba a la derecha. */
  readonly vuelo = input(false);
  /** Curva punteada en la parte baja. */
  readonly curva = input(false);
  /** Brillo claro detrás del título (arriba a la izquierda). */
  readonly halo = input(false);
}

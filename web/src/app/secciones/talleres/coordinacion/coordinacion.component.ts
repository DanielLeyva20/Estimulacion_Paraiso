import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { ImagenAdaptableDirective } from '../../../shared/imagen-adaptable/imagen-adaptable.directive';
import { RevelarDirective } from '../../../shared/revelar/revelar.directive';
import { PasoCoordinacion } from '../talleres.data';

const RETRASO_POR_PASO_MS = 80;

/**
 * Pasos para coordinar un taller. El texto siempre está a la vista; con mouse, al pasar sobre un paso
 * aparece su foto de referencia flotando junto al puntero. En pantallas táctiles cada paso muestra
 * una miniatura fija en su lugar.
 */
@Component({
  selector: 'app-coordinacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImagenAdaptableDirective, RevelarDirective],
  templateUrl: './coordinacion.component.html',
  styleUrl: './coordinacion.component.css'
})
export class CoordinacionComponent {
  readonly pasos = input.required<readonly PasoCoordinacion[]>();

  protected readonly retrasoPorPasoMs = RETRASO_POR_PASO_MS;
  protected readonly activo = signal<number | null>(null);

  private readonly zona = viewChild.required<ElementRef<HTMLElement>>('zona');
  private readonly vista = viewChild.required<ElementRef<HTMLElement>>('vista');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // El seguimiento del puntero se escucha a mano (no desde la plantilla): solo mueve un estilo,
    // así cada movimiento del mouse no le pide a Angular revisar la vista.
    afterNextRender(() => {
      const zona = this.zona().nativeElement;
      const seguir = (evento: PointerEvent) => evento.pointerType === 'mouse' && this.colocar(evento);
      zona.addEventListener('pointermove', seguir, { passive: true });
      destroyRef.onDestroy(() => zona.removeEventListener('pointermove', seguir));
    });
  }

  protected mostrar(indice: number, evento: PointerEvent): void {
    if (evento.pointerType !== 'mouse') return;
    // Al aparecer por primera vez, la foto nace bajo el puntero en lugar de viajar desde su última posición.
    if (this.activo() === null) this.colocar(evento, true);
    this.activo.set(indice);
  }

  protected ocultar(): void {
    this.activo.set(null);
  }

  private colocar(evento: PointerEvent, inmediato = false): void {
    const vista = this.vista().nativeElement;
    const caja = this.zona().nativeElement.getBoundingClientRect();

    if (inmediato) vista.style.transition = 'none';
    vista.style.translate = `${evento.clientX - caja.left}px ${evento.clientY - caja.top}px`;
    if (inmediato) {
      vista.getBoundingClientRect(); // Aplica la posición antes de devolverle la transición.
      vista.style.removeProperty('transition');
    }
  }
}

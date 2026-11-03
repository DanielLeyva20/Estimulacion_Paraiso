import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, signal, viewChild } from '@angular/core';
import { IconoComponent } from '../../../shared/icono/icono.component';
import { CLAVE_ALMACEN_MOCHILA, OBJETOS_MOCHILA } from './mochila.data';

/** "Apachurrón" de la mochila cada vez que recibe algo. */
const ANIMACION_RECIBIR: Keyframe[] = [
  { scale: '1 1' },
  { scale: '1.04 0.94', offset: 0.35 },
  { scale: '0.98 1.03', offset: 0.7 },
  { scale: '1 1' }
];
const DURACION_RECIBIR_MS = 420;

/**
 * Mochila de verano interactiva: cada cosa que mamá o papá marcan cae dentro del dibujo y asoma
 * por arriba; con todo listo, la mochila salta y brilla. Lo marcado se recuerda en este navegador.
 */
@Component({
  selector: 'app-mochila',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconoComponent],
  templateUrl: './mochila.component.html',
  styleUrl: './mochila.component.css'
})
export class MochilaComponent {
  readonly objetos = OBJETOS_MOCHILA;
  readonly alistados = signal<ReadonlySet<string>>(leerGuardados());
  readonly cantidad = computed(() => this.alistados().size);
  readonly estaLista = computed(() => this.cantidad() === this.objetos.length);
  readonly estado = computed(() =>
    this.estaLista()
      ? '¡Mochila lista! Nos vemos en el verano.'
      : `${this.cantidad()} de ${this.objetos.length} cosas en la mochila`
  );

  private readonly cuerpo = viewChild.required<ElementRef<SVGGElement>>('cuerpo');

  constructor() {
    effect(() => guardar(this.alistados()));
  }

  estaAlistado(id: string): boolean {
    return this.alistados().has(id);
  }

  alternar(id: string): void {
    const entra = !this.alistados().has(id);
    this.alistados.update((actuales) => {
      const siguientes = new Set(actuales);
      if (entra) siguientes.add(id);
      else siguientes.delete(id);
      return siguientes;
    });
    if (entra) this.recibir();
  }

  vaciar(): void {
    this.alistados.set(new Set());
  }

  private recibir(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.cuerpo().nativeElement.animate(ANIMACION_RECIBIR, {
      duration: DURACION_RECIBIR_MS,
      delay: 120,
      easing: 'ease-out'
    });
  }
}

// El almacenamiento puede no existir o fallar (modo privado, sitio bloqueado): entonces no se recuerda y listo.
function leerGuardados(): ReadonlySet<string> {
  try {
    const ids: unknown = JSON.parse(localStorage.getItem(CLAVE_ALMACEN_MOCHILA) ?? '[]');
    const validos = new Set(OBJETOS_MOCHILA.map((objeto) => objeto.id));
    return new Set(Array.isArray(ids) ? ids.filter((id) => validos.has(id)) : []);
  } catch {
    return new Set();
  }
}

function guardar(alistados: ReadonlySet<string>): void {
  try {
    localStorage.setItem(CLAVE_ALMACEN_MOCHILA, JSON.stringify([...alistados]));
  } catch {
    // Sin almacenamiento: la mochila funciona igual, solo no se recuerda.
  }
}

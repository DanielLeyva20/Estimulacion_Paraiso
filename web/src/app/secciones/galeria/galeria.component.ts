import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { InclinarDirective } from '../../shared/inclinar/inclinar.directive';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import {
  CategoriaGaleria,
  FILTROS_GALERIA,
  FiltroGaleria,
  FOTOS_GALERIA,
  FotoGaleria,
  IdFiltro,
  SILUETAS_GALERIA,
  GARABATOS_GALERIA
} from './galeria.data';

const COLUMNAS_PARA_ESCALONAR = 4;
const RETRASO_POR_FOTO_MS = 70;
/** Ancho de cada foto en la grilla (2, 3 o 4 columnas según la pantalla); las destacadas ocupan dos. */
const ANCHO_FOTO = '(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw';
const ANCHO_FOTO_DESTACADA = '(min-width: 48rem) 50vw, 100vw';
/** Recorrido horizontal mínimo (px) para que un deslizamiento en el visor cambie de foto. */
const DESLIZAMIENTO_MINIMO_PX = 50;

/**
 * Galería filtrable por categoría. Al cambiar de filtro, las fotos se reacomodan con la
 * API View Transitions (si el navegador la soporta). Con mouse, cada foto se inclina hacia el
 * puntero. Al tocarla se abre el visor: flechas, teclado, miniaturas o deslizar con el dedo.
 */
@Component({
  selector: 'app-galeria',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    FondoDibujadoComponent,
    DivisorComponent,
    IconoComponent,
    InclinarDirective,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  readonly garabatos = GARABATOS_GALERIA;
  private readonly detectorDeCambios = inject(ChangeDetectorRef);
  private readonly visor = viewChild.required<ElementRef<HTMLDialogElement>>('visor');

  readonly siluetas = SILUETAS_GALERIA;
  readonly filtros = FILTROS_GALERIA;
  readonly anchoFoto = ANCHO_FOTO;
  readonly anchoFotoDestacada = ANCHO_FOTO_DESTACADA;
  readonly fotos = FOTOS_GALERIA;
  readonly filtroActivo = signal<IdFiltro>('todas');
  readonly fotosVisibles = computed(() => this.fotos.filter((foto) => this.coincideConFiltro(foto)));

  private readonly indiceEnVisor = signal(0);
  readonly fotoEnVisor = computed(() => this.fotosVisibles()[this.indiceEnVisor()] ?? null);
  readonly posicionEnVisor = computed(() => this.indiceEnVisor() + 1);
  /** Lista de un solo elemento: al cambiar de foto se crea uno nuevo y su animación de entrada corre otra vez. */
  readonly fotoEnVisorComoLista = computed(() => {
    const foto = this.fotoEnVisor();
    return foto ? [foto] : [];
  });
  /** Hacia dónde entra la foto nueva: 1 desde la derecha, -1 desde la izquierda. */
  readonly direccionEnVisor = signal<1 | -1>(1);
  private inicioDeslizamiento: number | null = null;

  readonly anuncioDeFiltro = computed(() => {
    const filtro = this.filtros.find((f) => f.id === this.filtroActivo());
    const cantidad = this.fotosVisibles().length;
    return filtro?.id === 'todas'
      ? `Mostrando las ${cantidad} fotos`
      : `Mostrando ${cantidad} fotos de ${filtro?.nombre}`;
  });

  coincideConFiltro(foto: FotoGaleria): boolean {
    return this.filtroActivo() === 'todas' || foto.categoria === this.filtroActivo();
  }

  cantidadEn(filtro: IdFiltro): number {
    return filtro === 'todas' ? this.fotos.length : this.fotos.filter((foto) => foto.categoria === filtro).length;
  }

  /** Filtro de una categoría: de ahí salen el nombre y el ícono de la etiqueta de cada foto. */
  filtroDe(categoria: CategoriaGaleria): FiltroGaleria {
    return this.filtros.find((filtro) => filtro.id === categoria) ?? this.filtros[0];
  }

  nombreDeCategoria(categoria: CategoriaGaleria): string {
    return this.filtroDe(categoria).nombre;
  }

  /** Escalona la aparición por columna: las fotos de una misma fila entran una tras otra. */
  retrasoDeAparicion(indice: number): number {
    return (indice % COLUMNAS_PARA_ESCALONAR) * RETRASO_POR_FOTO_MS;
  }

  elegirFiltro(filtro: IdFiltro): void {
    if (filtro === this.filtroActivo()) return;

    const aplicar = () => {
      this.filtroActivo.set(filtro);
      // La transición fotografía el DOM al terminar esta función: hay que pintarlo ya.
      this.detectorDeCambios.detectChanges();
    };

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || sinMovimiento) {
      aplicar();
      return;
    }
    document.startViewTransition(aplicar);
  }

  esFotoEnVisor(foto: FotoGaleria): boolean {
    return foto === this.fotoEnVisor();
  }

  abrirVisor(foto: FotoGaleria): void {
    this.indiceEnVisor.set(this.fotosVisibles().indexOf(foto));
    this.visor().nativeElement.showModal();
    this.centrarMiniaturaActual('instant');
  }

  verFoto(foto: FotoGaleria): void {
    const indice = this.fotosVisibles().indexOf(foto);
    if (indice === this.indiceEnVisor()) return;
    this.direccionEnVisor.set(indice > this.indiceEnVisor() ? 1 : -1);
    this.indiceEnVisor.set(indice);
    this.centrarMiniaturaActual();
  }

  cerrarVisor(): void {
    this.visor().nativeElement.close();
  }

  verAnterior(): void {
    this.moverEnVisor(-1);
  }

  verSiguiente(): void {
    this.moverEnVisor(1);
  }

  alPresionarTeclaEnVisor(evento: KeyboardEvent): void {
    if (evento.key === 'ArrowLeft') this.verAnterior();
    if (evento.key === 'ArrowRight') this.verSiguiente();
  }

  alEmpezarDeslizamiento(evento: PointerEvent): void {
    this.inicioDeslizamiento = evento.clientX;
  }

  /** Deslizar con el dedo hacia la izquierda muestra la siguiente; hacia la derecha, la anterior. */
  alTerminarDeslizamiento(evento: PointerEvent): void {
    if (this.inicioDeslizamiento === null) return;
    const recorrido = evento.clientX - this.inicioDeslizamiento;
    this.inicioDeslizamiento = null;
    if (Math.abs(recorrido) < DESLIZAMIENTO_MINIMO_PX) return;
    if (recorrido < 0) this.verSiguiente();
    else this.verAnterior();
  }

  /** Un clic en el fondo oscuro (fuera de la foto y las miniaturas) cierra el visor. */
  alHacerClicEnVisor(evento: MouseEvent): void {
    const objetivo = evento.target as HTMLElement;
    if (objetivo === this.visor().nativeElement || objetivo.classList.contains('visor-contenido')) this.cerrarVisor();
  }

  private moverEnVisor(paso: number): void {
    const total = this.fotosVisibles().length;
    this.direccionEnVisor.set(paso > 0 ? 1 : -1);
    this.indiceEnVisor.update((indice) => (indice + paso + total) % total);
    this.centrarMiniaturaActual();
  }

  /** Lleva a la vista la miniatura de la foto actual, después de que Angular la marque. */
  private centrarMiniaturaActual(comportamiento: ScrollBehavior = 'smooth'): void {
    requestAnimationFrame(() =>
      this.visor().nativeElement.querySelector('[aria-current="true"]')?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: comportamiento
      })
    );
  }
}

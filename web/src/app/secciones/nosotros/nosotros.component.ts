import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { whatsappUrl } from '../../core/contacto';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import {
  ANIOS_DEL_COLEGIO,
  DATOS_TRAYECTORIA,
  FOTO_EQUIPO,
  NOMBRE_COLEGIO,
  NOMBRE_DIRECTORA,
  RAZONES_CONFIANZA,
  SILUETAS_NOSOTROS,
  GARABATOS_NOSOTROS,
  COPOS_NUBE
} from './nosotros.data';

const DURACION_CONTEO_MS = 1400;
const RETRASO_POR_RAZON_MS = 90;

/** Curva de salida suave: el conteo arranca rápido y se frena al llegar a la cifra. */
const salidaCubica = (t: number) => 1 - (1 - t) ** 3;

/**
 * Quién está a cargo de Mi Paraíso: la directora y su trayectoria, dentro de una gran nube.
 * La cifra de años del colegio cuenta desde cero la primera vez que aparece en pantalla.
 */
@Component({
  selector: 'app-nosotros',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    FondoDibujadoComponent,
    GarabatoComponent,
    DivisorComponent,
    IconoComponent,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
  readonly garabatos = GARABATOS_NOSOTROS;
  readonly copos = COPOS_NUBE;
  readonly directora = NOMBRE_DIRECTORA;
  readonly colegio = NOMBRE_COLEGIO;
  readonly aniosDelColegio = ANIOS_DEL_COLEGIO;
  readonly foto = FOTO_EQUIPO;
  readonly datos = DATOS_TRAYECTORIA;
  readonly razones = RAZONES_CONFIANZA;
  readonly siluetas = SILUETAS_NOSOTROS;
  readonly retrasoPorRazonMs = RETRASO_POR_RAZON_MS;
  readonly whatsapp = whatsappUrl(
    `Hola Mi Paraíso, quisiera agendar una visita y conocer a la directora ${NOMBRE_DIRECTORA}.`
  );

  readonly aniosMostrados = signal(0);
  private readonly sello = viewChild.required<ElementRef<HTMLElement>>('sello');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (sinAnimacion || typeof IntersectionObserver === 'undefined') {
        this.aniosMostrados.set(this.aniosDelColegio);
        return;
      }

      const observador = new IntersectionObserver(([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        this.contarAnios();
      });
      observador.observe(this.sello().nativeElement);
      destroyRef.onDestroy(() => observador.disconnect());
    });
  }

  private contarAnios(): void {
    const inicio = performance.now();
    const avanzar = (ahora: number) => {
      const progreso = Math.min(1, (ahora - inicio) / DURACION_CONTEO_MS);
      this.aniosMostrados.set(Math.round(salidaCubica(progreso) * this.aniosDelColegio));
      if (progreso < 1) requestAnimationFrame(avanzar);
    };
    requestAnimationFrame(avanzar);
  }
}

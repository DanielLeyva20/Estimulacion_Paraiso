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
import { WHATSAPP_VISIBLE, whatsappUrl } from '../../core/contacto';
import { cargaTerminada } from '../../core/pantalla-carga';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';

interface NavegadorConConexion extends Navigator {
  readonly connection?: { readonly saveData?: boolean; readonly effectiveType?: string };
}

/** Conexiones donde el video gastaría los datos del visitante y tardaría en verse. */
const CONEXIONES_LENTAS = new Set(['slow-2g', '2g', '3g']);

/**
 * Sin reproducción automática si el visitante pidió menos movimiento, activó el ahorro de datos o
 * navega con conexión lenta. Se queda el póster y el botón para reproducirlo si quiere.
 */
function debeEmpezarEnPausa(): boolean {
  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conexion = (navigator as NavegadorConConexion).connection;
  const ahorroDeDatos = conexion?.saveData === true || CONEXIONES_LENTAS.has(conexion?.effectiveType ?? '');
  return menosMovimiento || ahorroDeDatos;
}

/**
 * Portada con video de fondo en bucle. El video no se descarga hasta que se reproduce
 * (preload="none"); mientras tanto se ve su póster. Siempre hay un botón para pausarlo, y se detiene
 * solo mientras la portada está fuera de pantalla para no gastar batería decodificándolo.
 */
@Component({
  selector: 'app-portada',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconoComponent, RevelarDirective],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  readonly whatsappVisita = whatsappUrl('Hola Mi Paraíso, quisiera agendar una visita para conocer el local.');
  readonly telefono = WHATSAPP_VISIBLE;
  readonly reproduciendo = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const video = this.video().nativeElement;
      // El autoplay solo se permite con el video silenciado; se fija la propiedad, no solo el atributo.
      video.muted = true;
      // Arranca al retirarse la pantalla de carga: antes no se ve y solo le quitaría conexión a lo esencial.
      if (!debeEmpezarEnPausa()) cargaTerminada.then(() => this.reproducir());

      // `reproduciendo` refleja la intención del visitante: si lo pausó él, al volver sigue en pausa.
      const observador = new IntersectionObserver(([entrada]) => {
        if (!this.reproduciendo()) return;
        if (entrada.isIntersecting) video.play().catch(() => this.reproduciendo.set(false));
        else video.pause();
      });
      observador.observe(video);
      destroyRef.onDestroy(() => observador.disconnect());
    });
  }

  alternarVideo(): void {
    const video = this.video().nativeElement;
    if (video.paused) {
      this.reproducir();
    } else {
      video.pause();
      this.reproduciendo.set(false);
    }
  }

  private reproducir(): void {
    this.video()
      .nativeElement.play()
      .then(() => this.reproduciendo.set(true))
      .catch(() => this.reproduciendo.set(false));
  }
}

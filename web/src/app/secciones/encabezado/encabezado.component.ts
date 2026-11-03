import { NgClass } from '@angular/common';
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
import { UBICACION, whatsappUrl } from '../../core/contacto';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { LogoComponent } from '../../shared/logo/logo.component';
import { RedesSocialesComponent } from '../../shared/redes-sociales/redes-sociales.component';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { ENLACES_NAVEGACION, SILUETAS_MENU } from './encabezado.data';

const DESPLAZAMIENTO_PARA_FONDO_PX = 24;
/** Una sección cuenta como "actual" cuando su borde superior pasa este punto de la pantalla. */
const FRACCION_PANTALLA_SECCION_ACTUAL = 0.35;

/**
 * Encabezado fijo con la navegación en línea (escritorio ancho) y el botón del menú. El menú es un
 * <dialog> modal: en escritorio aparece como panel lateral y en el celular ocupa la pantalla. El
 * navegador se encarga del foco, de cerrarlo con Escape y de devolver el foco al botón.
 */
@Component({
  selector: 'app-encabezado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, GarabatoComponent, IconoComponent, LogoComponent, RedesSocialesComponent, SiluetasFondoComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  readonly whatsapp = whatsappUrl();
  readonly ubicacion = UBICACION;
  readonly enlaces = ENLACES_NAVEGACION;
  readonly siluetasMenu = SILUETAS_MENU;
  readonly desplazado = signal(false);
  readonly menuAbierto = signal(false);
  readonly seccionActual = signal<string | null>(null);

  private readonly menu = viewChild.required<ElementRef<HTMLDialogElement>>('menu');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Scroll escuchado a mano y agrupado por cuadro: solo cambia signals, que avisan a la vista si hace falta.
      let cuadro = 0;
      const alDesplazar = () => {
        cancelAnimationFrame(cuadro);
        cuadro = requestAnimationFrame(() => this.actualizarPorScroll());
      };
      window.addEventListener('scroll', alDesplazar, { passive: true });
      this.actualizarPorScroll();
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', alDesplazar);
        cancelAnimationFrame(cuadro);
      });
    });
  }

  alternarMenu(): void {
    if (this.menuAbierto()) this.cerrarMenu();
    else this.abrirMenu();
  }

  abrirMenu(): void {
    this.menu().nativeElement.showModal();
    this.menuAbierto.set(true);
  }

  /** Se cierra al momento (no al siguiente render) para que el salto a la sección no quede bloqueado. */
  cerrarMenu(): void {
    this.menu().nativeElement.close();
  }

  /** El diálogo avisa cuando se cerró, sea por un enlace, el botón, Escape o un clic fuera del panel. */
  alCerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  /** El diálogo ocupa toda la pantalla: un clic que cae en él (y no en el panel) es un clic en el fondo. */
  alHacerClicEnMenu(evento: MouseEvent): void {
    if (evento.target === this.menu().nativeElement) this.cerrarMenu();
  }

  private actualizarPorScroll(): void {
    this.desplazado.set(window.scrollY > DESPLAZAMIENTO_PARA_FONDO_PX);

    const limite = window.innerHeight * FRACCION_PANTALLA_SECCION_ACTUAL;
    let actual: string | null = null;
    for (const enlace of this.enlaces) {
      const seccion = document.getElementById(enlace.id);
      if (seccion && seccion.getBoundingClientRect().top <= limite) actual = enlace.id;
    }
    this.seccionActual.set(actual);
  }
}

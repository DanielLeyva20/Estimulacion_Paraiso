import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { whatsappUrl } from '../../core/contacto';
import { IconoComponent } from '../../shared/icono/icono.component';

/** El botón aparece cuando el visitante ya pasó el 70 % de la primera pantalla. */
const FRACCION_PANTALLA_PARA_MOSTRAR = 0.7;

@Component({
  selector: 'app-whatsapp-flotante',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconoComponent],
  templateUrl: './whatsapp-flotante.component.html'
})
export class WhatsappFlotanteComponent {
  readonly whatsapp = whatsappUrl();
  readonly visible = signal(false);

  @HostListener('window:scroll')
  alDesplazar(): void {
    this.visible.set(window.scrollY > window.innerHeight * FRACCION_PANTALLA_PARA_MOSTRAR);
  }
}

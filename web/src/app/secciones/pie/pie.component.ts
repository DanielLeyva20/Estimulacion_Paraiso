import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UBICACION, WHATSAPP_VISIBLE, comoLlegarUrl, whatsappUrl } from '../../core/contacto';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { LogoComponent } from '../../shared/logo/logo.component';
import { RedesSocialesComponent } from '../../shared/redes-sociales/redes-sociales.component';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { ENLACES_PIE, GARABATOS_PIE, NUBES_PIE } from './pie.data';

/**
 * Pie de página como el final de un cuento: un cielo claro con nubes y avioncito que baja hasta las
 * colinas de pasto. Logo y redes, las secciones de la página y cómo visitarnos; abajo, el bosque
 * con los créditos.
 */
@Component({
  selector: 'app-pie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DivisorComponent,
    FondoDibujadoComponent,
    IconoComponent,
    LogoComponent,
    RedesSocialesComponent,
    SiluetasFondoComponent
  ],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {
  readonly enlaces = ENLACES_PIE;
  readonly garabatos = GARABATOS_PIE;
  readonly nubes = NUBES_PIE;
  readonly telefono = WHATSAPP_VISIBLE;
  readonly ubicacion = UBICACION;
  readonly whatsapp = whatsappUrl();
  readonly whatsappVisita = whatsappUrl('Hola Mi Paraíso, quisiera agendar una visita para conocer el local.');
  readonly comoLlegar = comoLlegarUrl();
  readonly anio = new Date().getFullYear();
}

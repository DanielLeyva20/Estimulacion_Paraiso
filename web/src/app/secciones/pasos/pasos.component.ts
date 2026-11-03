import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { whatsappUrl } from '../../core/contacto';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { PASOS, SILUETAS_PASOS } from './pasos.data';

const RETRASO_POR_PASO_MS = 160;

@Component({
  selector: 'app-pasos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, DivisorComponent, IconoComponent, RevelarDirective, SiluetasFondoComponent],
  templateUrl: './pasos.component.html',
  styleUrl: './pasos.component.css'
})
export class PasosComponent {
  /** El texto va partido en palabras para que aparezcan una tras otra al abrir la carta. */
  readonly pasos = PASOS.map((paso) => ({
    ...paso,
    palabras: paso.texto.split(' ')
  }));
  readonly siluetas = SILUETAS_PASOS;
  readonly retrasoPorPasoMs = RETRASO_POR_PASO_MS;
  readonly whatsapp = whatsappUrl('Hola Mi Paraíso, quisiera dar el primer paso y conocer el local con mi hijo/a.');
}

import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { InclinarDirective } from '../../shared/inclinar/inclinar.directive';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { COMPROMISOS, GARABATOS_CONFIANZA, NUBES_CONFIANZA } from './confianza.data';

const RETRASO_POR_COMPROMISO_MS = 70;

/**
 * "Tu tranquilidad también importa": título con resalte y subrayado dibujado, la foto del local con
 * su estrella sonriente y seis compromisos en tarjetas interactivas, sobre un fondo con detalles a mano.
 */
@Component({
  selector: 'app-confianza',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    DivisorComponent,
    FondoDibujadoComponent,
    GarabatoComponent,
    IconoComponent,
    InclinarDirective,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './confianza.component.html',
  styleUrl: './confianza.component.css'
})
export class ConfianzaComponent {
  readonly compromisos = COMPROMISOS;
  readonly garabatos = GARABATOS_CONFIANZA;
  readonly nubes = NUBES_CONFIANZA;
  readonly retrasoPorCompromisoMs = RETRASO_POR_COMPROMISO_MS;
}

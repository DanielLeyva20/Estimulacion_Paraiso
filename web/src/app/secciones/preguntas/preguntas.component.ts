import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { whatsappUrl } from '../../core/contacto';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { PREGUNTAS_FRECUENTES, SILUETAS_PREGUNTAS } from './preguntas.data';

@Component({
  selector: 'app-preguntas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    GarabatoComponent,
    DivisorComponent,
    IconoComponent,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './preguntas.component.html'
})
export class PreguntasComponent {
  readonly siluetas = SILUETAS_PREGUNTAS;
  readonly preguntas = PREGUNTAS_FRECUENTES;
  readonly whatsapp = whatsappUrl('Hola Mi Paraíso, tengo una consulta.');
}

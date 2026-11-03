import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { ESPACIOS, SILUETAS_ESPACIOS } from './espacios.data';
import { VisorEspacioComponent } from './visor/visor.component';

const RETRASO_POR_DETALLE_MS = 60;

@Component({
  selector: 'app-espacios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GarabatoComponent,
    NgClass,
    DivisorComponent,
    IconoComponent,
    RevelarDirective,
    SiluetasFondoComponent,
    VisorEspacioComponent
  ],
  templateUrl: './espacios.component.html'
})
export class EspaciosComponent {
  readonly espacios = ESPACIOS;
  readonly siluetas = SILUETAS_ESPACIOS;
  readonly retrasoPorDetalleMs = RETRASO_POR_DETALLE_MS;
}

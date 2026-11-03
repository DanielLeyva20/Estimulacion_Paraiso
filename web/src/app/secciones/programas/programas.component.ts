import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { PROGRAMAS, TONOS_AREAS } from './programas.data';

@Component({
  selector: 'app-programas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    DivisorComponent,
    FondoDibujadoComponent,
    GarabatoComponent,
    IconoComponent,
    NgClass,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.css'
})
export class ProgramasComponent {
  readonly programas = PROGRAMAS;
  readonly tonosAreas = TONOS_AREAS;
}

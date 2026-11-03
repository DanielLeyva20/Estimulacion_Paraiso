import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { whatsappUrl } from '../../core/contacto';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { MochilaComponent } from './mochila/mochila.component';
import {
  ACTIVIDADES_VERANO,
  DATOS_VACACIONES,
  FOTOS_COLLAGE,
  MESES_DEL_ANIO,
  SILUETAS_VACACIONES,
  GARABATOS_VACACIONES
} from './vacaciones.data';

/** Retraso entre el relleno de un mes de verano y el siguiente en la tira de meses. */
const RETRASO_ENTRE_MESES_MS = 140;
const RETRASO_POR_ACTIVIDAD_MS = 90;
const RETRASO_POR_FOTO_MS = 140;

/**
 * Vacaciones útiles de enero y febrero: collage de fotos, ruta de actividades y la mochila
 * interactiva para alistar sus cosas.
 */
@Component({
  selector: 'app-vacaciones',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    FondoDibujadoComponent,
    NgClass,
    DivisorComponent,
    IconoComponent,
    MochilaComponent,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent {
  readonly garabatos = GARABATOS_VACACIONES;
  readonly siluetas = SILUETAS_VACACIONES;
  readonly meses = MESES_DEL_ANIO;
  readonly datos = DATOS_VACACIONES;
  readonly fotos = FOTOS_COLLAGE;
  readonly actividades = ACTIVIDADES_VERANO;
  readonly retrasoEntreMesesMs = RETRASO_ENTRE_MESES_MS;
  readonly retrasoPorActividadMs = RETRASO_POR_ACTIVIDAD_MS;
  readonly retrasoPorFotoMs = RETRASO_POR_FOTO_MS;
  readonly whatsapp = whatsappUrl('Hola Mi Paraíso, quisiera información sobre las vacaciones útiles de verano.');
}

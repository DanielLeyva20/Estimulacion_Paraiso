import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { whatsappUrl } from '../../core/contacto';
import { unirConY } from '../../core/texto';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { CoordinacionComponent } from './coordinacion/coordinacion.component';
import {
  FOTO_TALLER_INICIAL,
  IdModalidad,
  MODALIDADES_TALLER,
  MODALIDAD_PREDETERMINADA,
  PASOS_COORDINACION,
  SILUETAS_TALLERES,
  TEMAS_TALLER,
  GARABATOS_TALLERES
} from './talleres.data';

/**
 * Talleres personalizados. El visitante "arma" su taller eligiendo temas y modalidad; a su lado,
 * una vista previa muestra la foto del último tema elegido, el resumen y el botón que abre WhatsApp
 * con esa elección ya escrita.
 */
@Component({
  selector: 'app-talleres',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    CoordinacionComponent,
    DivisorComponent,
    FondoDibujadoComponent,
    GarabatoComponent,
    IconoComponent,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  styleUrl: './talleres.component.css',
  templateUrl: './talleres.component.html'
})
export class TalleresComponent {
  readonly garabatos = GARABATOS_TALLERES;
  readonly temas = TEMAS_TALLER;
  readonly modalidades = MODALIDADES_TALLER;
  readonly pasos = PASOS_COORDINACION;
  readonly siluetas = SILUETAS_TALLERES;

  readonly temasElegidos = signal<ReadonlySet<string>>(new Set());
  readonly modalidad = signal<IdModalidad>(MODALIDAD_PREDETERMINADA);

  /** Temas en el orden en que se eligieron (un Set conserva el orden de inserción). */
  readonly temasEnOrden = computed(() =>
    [...this.temasElegidos()].flatMap((id) => this.temas.filter((tema) => tema.id === id))
  );

  private readonly nombresElegidos = computed(() =>
    this.temas.filter((tema) => this.temasElegidos().has(tema.id)).map((tema) => tema.nombre)
  );

  /** La vista previa muestra el último tema elegido; sin elección, una foto general de talleres. */
  readonly fotoVista = computed(() => this.temasEnOrden().at(-1)?.foto ?? FOTO_TALLER_INICIAL);

  readonly detalleModalidad = computed(
    () => this.modalidades.find((modalidad) => modalidad.id === this.modalidad())?.detalle ?? ''
  );

  readonly nombreModalidad = computed(
    () => this.modalidades.find((modalidad) => modalidad.id === this.modalidad())?.nombre ?? ''
  );

  /** Temas elegidos en una frase; la modalidad ya se muestra aparte en la vista previa. */
  readonly resumen = computed(() => unirConY(this.nombresElegidos()));

  readonly enlaceWhatsapp = computed(() => {
    const temas = this.nombresElegidos();
    const queLeInteresa = temas.length ? `de ${unirConY(temas).toLowerCase()}` : 'para mi hijo/a';
    return whatsappUrl(
      `Hola Mi Paraíso, me interesa un taller personalizado ${queLeInteresa}, ` +
        `modalidad: ${this.nombreModalidad().toLowerCase()}. ¿Me pueden dar más información?`
    );
  });

  estaElegido(idTema: string): boolean {
    return this.temasElegidos().has(idTema);
  }

  alternarTema(idTema: string): void {
    this.temasElegidos.update((actuales) => {
      const siguientes = new Set(actuales);
      if (siguientes.has(idTema)) siguientes.delete(idTema);
      else siguientes.add(idTema);
      return siguientes;
    });
  }

  elegirModalidad(id: IdModalidad): void {
    this.modalidad.set(id);
  }
}

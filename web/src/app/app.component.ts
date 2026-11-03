import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { iniciarAnalitica } from './core/analitica';
import { ocultarPantallaDeCarga } from './core/pantalla-carga';
import { AcequiaComponent } from './secciones/acequia/acequia.component';
import { ConfianzaComponent } from './secciones/confianza/confianza.component';
import { EncabezadoComponent } from './secciones/encabezado/encabezado.component';
import { EspaciosComponent } from './secciones/espacios/espacios.component';
import { GaleriaComponent } from './secciones/galeria/galeria.component';
import { MatriculaComponent } from './secciones/matricula/matricula.component';
import { NosotrosComponent } from './secciones/nosotros/nosotros.component';
import { PasosComponent } from './secciones/pasos/pasos.component';
import { PieComponent } from './secciones/pie/pie.component';
import { PortadaComponent } from './secciones/portada/portada.component';
import { PreguntasComponent } from './secciones/preguntas/preguntas.component';
import { ProgramasComponent } from './secciones/programas/programas.component';
import { RedesLateralesComponent } from './secciones/redes-laterales/redes-laterales.component';
import { TalleresComponent } from './secciones/talleres/talleres.component';
import { UbicacionComponent } from './secciones/ubicacion/ubicacion.component';
import { VacacionesComponent } from './secciones/vacaciones/vacaciones.component';
import { WhatsappFlotanteComponent } from './secciones/whatsapp-flotante/whatsapp-flotante.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AcequiaComponent,
    ConfianzaComponent,
    EncabezadoComponent,
    EspaciosComponent,
    GaleriaComponent,
    MatriculaComponent,
    NosotrosComponent,
    PasosComponent,
    PieComponent,
    PortadaComponent,
    PreguntasComponent,
    ProgramasComponent,
    RedesLateralesComponent,
    TalleresComponent,
    UbicacionComponent,
    VacacionesComponent,
    WhatsappFlotanteComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    const destroyRef = inject(DestroyRef);
    // El salto al ancla espera a que se retire la pantalla de carga: mientras está, el scroll va bloqueado.
    afterNextRender(() =>
      ocultarPantallaDeCarga().then(() => {
        irAlAncla(destroyRef);
        iniciarAnalitica();
      })
    );
  }
}

/**
 * Lleva la vista a la sección del enlace (por ejemplo `#matricula`). Si es una sección diferida que aún
 * no existe, espera a que aparezca. El salto es inmediato: es la llegada a la página, no una navegación.
 */
function irAlAncla(destroyRef: DestroyRef): void {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;

  const saltar = (destino: HTMLElement) => destino.scrollIntoView({ behavior: 'instant' });
  const destino = document.getElementById(id);
  if (destino) return saltar(destino);

  const observador = new MutationObserver(() => {
    const encontrado = document.getElementById(id);
    if (!encontrado) return;
    observador.disconnect();
    saltar(encontrado);
  });
  observador.observe(document.body, { childList: true, subtree: true });
  destroyRef.onDestroy(() => observador.disconnect());
}

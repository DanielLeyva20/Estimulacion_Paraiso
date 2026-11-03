import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild
} from '@angular/core';
import {
  COORDENADAS_DEL_CENTRO,
  REFERENCIA_UBICACION,
  UBICACION,
  comoLlegarUrl,
  whatsappUrl
} from '../../core/contacto';
import { GarabatoComponent } from '../../shared/garabato/garabato.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';

const ZOOM_INICIAL = 16;
const ZOOM_MAXIMO = 19;
/** Teselas estándar de OpenStreetMap: gratuitas, sin clave, con la atribución obligatoria. */
const CAPA_DE_MAPA = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATRIBUCION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
/** Empieza a descargar Leaflet un poco antes de que el mapa entre en pantalla. */
const MARGEN_DE_PRECARGA = '400px';
const MARCADOR_HTML = '<span class="marcador-mapa-pin"><span class="marcador-mapa-punto"></span></span>';

/**
 * Ubicación con mapa interactivo (Leaflet). La librería se importa de forma diferida
 * cuando la sección se acerca a la pantalla, así no pesa en la carga inicial.
 */
@Component({
  selector: 'app-ubicacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GarabatoComponent, DivisorComponent, IconoComponent, RevelarDirective],
  templateUrl: './ubicacion.component.html'
})
export class UbicacionComponent {
  private readonly contenedorMapa = viewChild.required<ElementRef<HTMLElement>>('mapa');
  private readonly destroyRef = inject(DestroyRef);

  readonly ubicacion = UBICACION;
  readonly referencia = REFERENCIA_UBICACION;
  readonly comoLlegar = comoLlegarUrl();
  readonly whatsapp = whatsappUrl('Hola Mi Paraíso, ¿me pueden enviar la ubicación exacta del local?');
  readonly mapaListo = signal(false);

  constructor() {
    afterNextRender(() => this.cargarMapaAlAcercarse());
  }

  private cargarMapaAlAcercarse(): void {
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((entrada) => entrada.isIntersecting)) return;
        observador.disconnect();
        this.crearMapa();
      },
      { rootMargin: MARGEN_DE_PRECARGA }
    );
    observador.observe(this.contenedorMapa().nativeElement);
    this.destroyRef.onDestroy(() => observador.disconnect());
  }

  private async crearMapa(): Promise<void> {
    // Leaflet 1.9 se publica como CommonJS: al empaquetarlo, su API completa llega en `default`.
    const { default: L } = await import('leaflet');
    const { latitud, longitud } = COORDENADAS_DEL_CENTRO;

    const mapa = L.map(this.contenedorMapa().nativeElement, {
      center: [latitud, longitud],
      zoom: ZOOM_INICIAL,
      // Que la rueda y el dedo sigan desplazando la página; el mapa se mueve con los controles o con dos dedos.
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile
    });
    mapa.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

    L.tileLayer(CAPA_DE_MAPA, {
      attribution: ATRIBUCION,
      maxZoom: ZOOM_MAXIMO
    }).addTo(mapa);

    L.marker([latitud, longitud], {
      title: 'Mi Paraíso',
      alt: 'Ubicación de Mi Paraíso',
      icon: L.divIcon({
        className: 'marcador-mapa',
        html: MARCADOR_HTML,
        iconSize: [44, 54],
        iconAnchor: [22, 52]
      })
    })
      .addTo(mapa)
      .bindPopup(`<strong>Mi Paraíso</strong><br>${this.ubicacion}`, {
        offset: [0, -44]
      });

    this.destroyRef.onDestroy(() => mapa.remove());

    this.mapaListo.set(true);
  }
}

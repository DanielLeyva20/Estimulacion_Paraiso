import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * `encabezado`: castillo y nombre en línea, compacto para la barra superior.
 * `pie`: castillo grande con el nombre debajo.
 */
export type VarianteLogo = 'encabezado' | 'pie';

/** Ancho con que se muestra el castillo en cada variante: el navegador elige la imagen justa. */
const ANCHO_CASTILLO: Record<VarianteLogo, string> = { encabezado: '70px', pie: '190px' };

/**
 * Logo de Mi Paraíso: el castillo del logo (sin fondo) y el nombre escrito con la tipografía de la marca.
 * Imágenes en public/img, generadas desde logo_MiParaiso.png.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
  host: { '[attr.data-variante]': 'variante()' }
})
export class LogoComponent {
  readonly variante = input<VarianteLogo>('encabezado');
  readonly anchoCastillo = computed(() => ANCHO_CASTILLO[this.variante()]);
}

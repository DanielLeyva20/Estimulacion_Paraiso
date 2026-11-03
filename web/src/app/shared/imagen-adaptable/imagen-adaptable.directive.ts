import { Directive, computed, input } from '@angular/core';
import { ANCHOS_DE_FOTOS } from '../../core/imagenes-adaptables';

/**
 * Foto que se descarga del tamaño en que se muestra. Recibe la ruta de la original y arma el `srcset`
 * con sus versiones reducidas (catálogo generado por scripts/imagenes-adaptables.mjs); quien la usa
 * indica con `sizes` cuánto ancho ocupa en pantalla. Una foto sin versiones queda con su `src` tal cual.
 *
 *   <img [appAdaptable]="foto.src" sizes="(min-width: 64rem) 480px, 92vw" ... />
 */
@Directive({
  selector: 'img[appAdaptable]',
  host: { '[attr.src]': 'src()', '[attr.srcset]': 'srcset()' }
})
export class ImagenAdaptableDirective {
  readonly src = input.required<string>({ alias: 'appAdaptable' });

  readonly srcset = computed(() => {
    const anchos = ANCHOS_DE_FOTOS[this.src()];
    if (!anchos) return null;
    const original = anchos.length - 1;
    return anchos
      .map((ancho, i) => `${i === original ? this.src() : this.src().replace(/\.webp$/, `-${ancho}.webp`)} ${ancho}w`)
      .join(', ');
  });
}

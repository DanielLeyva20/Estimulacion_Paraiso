import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NombreIcono =
  | 'whatsapp'
  | 'flecha'
  | 'menu'
  | 'cerrar'
  | 'ubicacion'
  | 'telefono'
  | 'bebe'
  | 'grupo'
  | 'familia'
  | 'puerta'
  | 'hoja'
  | 'mensaje'
  | 'mas'
  | 'mano'
  | 'pincel'
  | 'reloj'
  | 'casa'
  | 'corazon'
  | 'musica'
  | 'libro'
  | 'pelota'
  | 'calendario'
  | 'check'
  | 'alerta'
  | 'pausa'
  | 'reproducir'
  | 'anterior'
  | 'siguiente'
  | 'ruta'
  | 'ampliar'
  | 'youtube'
  | 'facebook'
  | 'tiktok'
  | 'sol';

/** Ícono decorativo. Su tamaño se controla con la variable `--icono-tamano` y su color con `currentColor`. */
@Component({
  selector: 'app-icono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icono.component.html',
  styleUrl: './icono.component.css'
})
export class IconoComponent {
  readonly nombre = input.required<NombreIcono>();
}

/** Cosa que se alista para las vacaciones útiles; su dibujo es el `<symbol>` con id `objeto-{id}`. */
export interface ObjetoMochila {
  readonly id: string;
  readonly texto: string;
  /** Dónde asoma el dibujo cuando está dentro de la mochila (unidades del viewBox 320×340). */
  readonly x: number;
  readonly y: number;
  readonly tamano: number;
  readonly giro: number;
}

export const OBJETOS_MOCHILA: readonly ObjetoMochila[] = [
  { id: 'ropa', texto: 'Ropa cómoda para jugar', x: 52, y: 52, tamano: 80, giro: -14 },
  { id: 'muda', texto: 'Una muda de cambio', x: 104, y: 66, tamano: 66, giro: 8 },
  { id: 'lonchera', texto: 'Lonchera saludable', x: 150, y: 58, tamano: 74, giro: -4 },
  { id: 'mandil', texto: 'Mandil o polo para pintar', x: 196, y: 52, tamano: 76, giro: 12 },
  { id: 'botella', texto: 'Botella de agua con su nombre', x: 222, y: 26, tamano: 86, giro: 16 }
];

/** Clave para recordar, solo en este navegador, lo que ya se marcó. */
export const CLAVE_ALMACEN_MOCHILA = 'mi-paraiso:mochila';

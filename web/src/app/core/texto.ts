/** Une una lista en español: ["a"] → "a", ["a", "b", "c"] → "a, b y c". */
export function unirConY(elementos: readonly string[]): string {
  if (elementos.length <= 1) return elementos.join('');
  return `${elementos.slice(0, -1).join(', ')} y ${elementos[elementos.length - 1]}`;
}

/** Recorta los extremos y deja un solo espacio entre palabras. */
export function normalizarEspacios(texto: string): string {
  return texto.trim().replace(/\s+/g, ' ');
}

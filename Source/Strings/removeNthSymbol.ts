export default function removeNthSymbol(
  targetString: string, options: { targetSymbolNumber: number; numerationFrom: 0 | 1; }
): string {

  /* 〔 Theory 〕　'split', 'slice', 'substr', 'substring' methods (of String.prototype) are not support
   *   the UTF16 surrogate pairs. */
  const charactersSequence: Array<string> = Array.from(targetString);

  if (options.numerationFrom === 0) {
    charactersSequence.splice(options.targetSymbolNumber, 1);
  } else {
    charactersSequence.splice(options.targetSymbolNumber - 1, 1);
  }

  return charactersSequence.join("");
}

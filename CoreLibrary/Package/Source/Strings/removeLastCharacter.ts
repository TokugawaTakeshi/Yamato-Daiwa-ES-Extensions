export default function removeLastCharacter(targetString: string): string {

  /* 〔 Theory 〕　'split', 'slice', 'substr', 'substring' methods (of String.prototype) are not support
   *   the UTF16 surrogate pairs. */
  const charactersSequence: Array<string> = Array.from(targetString);

  charactersSequence.pop();

  return charactersSequence.join("");
}

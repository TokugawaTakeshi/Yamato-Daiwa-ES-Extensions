/* Planning to move it to main package at 1.7 */
export default function appendCharacterIfItDoesNotPresentInLastPosition(
  compoundParameter: Readonly<{ targetString: string; trailingCharacter: string; }>
): string {
  const { targetString, trailingCharacter }: Readonly<{ targetString: string; trailingCharacter: string; }> = compoundParameter;
  return targetString.endsWith(trailingCharacter) ? targetString : `${ targetString }${ trailingCharacter }`;
}

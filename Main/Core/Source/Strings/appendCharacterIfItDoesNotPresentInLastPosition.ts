export default function appendCharacterIfItDoesNotPresentInLastPosition(
  compoundParameter: Readonly<{ targetString: string; trailingCharacter: string; }>
): string {
  const { targetString, trailingCharacter }: Readonly<{ targetString: string; trailingCharacter: string; }> = compoundParameter;
  return targetString.endsWith(trailingCharacter) ? targetString : `${ targetString }${ trailingCharacter }`;
}

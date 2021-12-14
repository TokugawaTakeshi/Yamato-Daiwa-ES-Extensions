export default function removeSpecificCharacterInLastPosition(targetString: string, targetCharacter: string): string {
  return targetString.endsWith(targetCharacter) ? targetString.slice(0, -1) : targetString;
}

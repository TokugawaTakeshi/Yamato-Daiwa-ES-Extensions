export default function removeNonDigitsCharacters(targetString: string): string {
  return targetString.
      split("").
      filter((character: string): boolean => /[0-9]/u.test(character)).
      join("");
}

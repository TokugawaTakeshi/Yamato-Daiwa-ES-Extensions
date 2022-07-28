export default function removeNonDigitsCharacters(targetString: string): string {

  /* [ Theory ] In the surrogate pair(s) case although split() will brake the characters, these broken characters
      will be removed. */
  return targetString.
      split("").
      filter((character: string): boolean => /\d/u.test(character)).
      join("");
}

export default function isStringifiedNonNegativeIntegerOfRegularNotation(value: string): boolean {

  /* [ Fiddle ] https://regex101.com/r/vCilug/1 */
  return (/^(?:0|^[1-9]\d*)$/u).test(value);

}

export default function isStringifiedNonNegativeIntegerOfRegularNotation(value: string): boolean {
  return /^[1-9][0-9]*$/u.test(value);
}

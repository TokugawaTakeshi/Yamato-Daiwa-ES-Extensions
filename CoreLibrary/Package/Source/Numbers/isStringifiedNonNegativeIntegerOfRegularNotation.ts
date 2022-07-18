export default function isStringifiedNonNegativeIntegerOfRegularNotation(value: string): boolean {
  return /^[1-9]\d*$/u.test(value);
}

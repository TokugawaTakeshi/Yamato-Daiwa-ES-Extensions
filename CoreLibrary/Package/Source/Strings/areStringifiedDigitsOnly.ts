export default function areStringifiedDigitsOnly(potentialStringifiedDigits: string): boolean {
  return /^[0-9]+$/u.test(potentialStringifiedDigits);
}

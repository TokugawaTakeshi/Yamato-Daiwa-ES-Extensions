export default function areStringifiedDigitsOnly(targetString: string): boolean {
  return /^\d+$/u.test(targetString);
}

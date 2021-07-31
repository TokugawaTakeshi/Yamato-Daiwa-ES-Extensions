export default function nullToEmptyString(targetValue: string | null): string {
  return targetValue === null ? "" : targetValue;
}

export default function emptyStringToNull(targetValue: string): string | null {
  return targetValue.length > 0 ? targetValue : null;
}

export default function nullToZero(targetValue: number | null): number {
  return targetValue === null ? 0 : targetValue;
}

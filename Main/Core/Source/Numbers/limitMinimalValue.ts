export default function limitMinimalValue(
  { targetNumber, minimalValue }: Readonly<{ targetNumber: number; minimalValue: number; }>
): number {
  return targetNumber < minimalValue ? minimalValue : targetNumber;
}

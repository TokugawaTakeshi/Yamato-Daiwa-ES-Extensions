export default function limitMaximalValue(
  { targetNumber, maximalValue }: Readonly<{ targetNumber: number; maximalValue: number; }>
): number {
  return targetNumber > maximalValue ? maximalValue : targetNumber;
}

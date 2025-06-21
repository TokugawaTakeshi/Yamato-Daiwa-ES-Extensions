export default function limitMinimalAndMaximalValues(
  {
    targetNumber,
    minimalValue,
    maximalValue
  }: Readonly<{
    targetNumber: number;
    minimalValue: number;
    maximalValue: number;
  }>
): number {

  if (targetNumber < minimalValue) {
    return minimalValue;
  }


  return targetNumber > maximalValue ? maximalValue : targetNumber;

}

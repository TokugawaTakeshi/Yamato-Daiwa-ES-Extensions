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
): number;

export default function limitMinimalAndMaximalValues(
  {
    targetNumber,
    minimalValue,
    maximalValue
  }: Readonly<{
    targetNumber: number | bigint;
    minimalValue: number | bigint;
    maximalValue: bigint;
  }>
): bigint;


export default function limitMinimalAndMaximalValues(
  {
    targetNumber,
    minimalValue,
    maximalValue
  }: Readonly<{
    targetNumber: number | bigint;
    minimalValue: number | bigint;
    maximalValue: number | bigint;
  }>
): number | bigint {

  if (targetNumber < minimalValue) {
    return minimalValue;
  }


  return targetNumber > maximalValue ? maximalValue : targetNumber;

}

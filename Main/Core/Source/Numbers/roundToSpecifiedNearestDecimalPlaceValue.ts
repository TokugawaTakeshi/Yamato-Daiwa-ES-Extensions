export default function roundToSpecifiedNearestDecimalPlaceValue(
  { digitsCountAfterDecimalPoint, targetNumber }: Readonly<{ targetNumber: number; digitsCountAfterDecimalPoint: number; }>
): number {
  const coefficient: number = Math.pow(10, digitsCountAfterDecimalPoint);
  return Math.round(coefficient * targetNumber) / coefficient;
}

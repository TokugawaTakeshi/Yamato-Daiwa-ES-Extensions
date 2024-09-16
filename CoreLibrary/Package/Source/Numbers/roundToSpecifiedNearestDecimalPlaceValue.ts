export default function roundToSpecifiedNearestDecimalPlaceValue(
  sourceData: Readonly<{ targetNumber: number; digitsCountAfterDecimalPoint: number; }>
): number {
  const coefficient: number = Math.pow(10, sourceData.digitsCountAfterDecimalPoint);
  return Math.round(coefficient * sourceData.targetNumber) / coefficient;
}

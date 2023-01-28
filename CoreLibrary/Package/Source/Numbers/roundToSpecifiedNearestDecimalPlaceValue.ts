export default function roundToSpecifiedNearestDecimalPlaceValue(
  sourceData: Readonly<{ targetNumber: number; digitsAfterDecimalPoint: number; }>
): number {
  const coefficient: number = Math.pow(10, sourceData.digitsAfterDecimalPoint);
  return Math.round(coefficient * sourceData.targetNumber) / coefficient;
}

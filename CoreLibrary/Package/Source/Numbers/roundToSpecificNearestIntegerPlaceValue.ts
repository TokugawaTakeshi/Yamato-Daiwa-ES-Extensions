export default function roundToSpecificNearestIntegerPlaceValue(
  sourceData: Readonly<{
    targetNumber: number;
    trailingZerosCount: number;
  }>
): number {
  const coefficient: number = 10 * sourceData.trailingZerosCount;
  return Math.round(sourceData.targetNumber / coefficient) * coefficient;
}

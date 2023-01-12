export default function roundDownToSpecificIntegerPlaceValue(
  sourceData: Readonly<{
    targetNumber: number;
    trailingZerosCount: number;
  }>
): number {
  const coefficient: number = 10 * sourceData.trailingZerosCount;
  return Math.floor(sourceData.targetNumber / coefficient) * coefficient;
}

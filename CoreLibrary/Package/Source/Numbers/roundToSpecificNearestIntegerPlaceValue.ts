export default function roundToSpecificNearestIntegerPlaceValue(
    namedParameters: Readonly<{
      targetNumber: number;
      trailingZerosCount: number;
    }>
): number {
  const coefficient: number = 10 * namedParameters.trailingZerosCount;
  return Math.round(namedParameters.targetNumber / coefficient) * coefficient;
}

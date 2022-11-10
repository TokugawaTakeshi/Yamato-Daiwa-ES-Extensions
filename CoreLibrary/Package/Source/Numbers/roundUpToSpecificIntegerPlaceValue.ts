export default function roundUpToSpecificIntegerPlaceValue(
    namedParameters: Readonly<{
      targetNumber: number;
      trailingZerosCount: number;
    }>
): number {
  const coefficient: number = 10 * namedParameters.trailingZerosCount;
  return Math.ceil(namedParameters.targetNumber / coefficient) * coefficient;
}

export default function roundDownToSpecificIntegerPlaceValue(
    namedParameters: Readonly<{
      targetNumber: number;
      trailingZerosCount: number;
    }>
): number {
  const coefficient: number = 10 * namedParameters.trailingZerosCount;
  return Math.floor(namedParameters.targetNumber / coefficient) * coefficient;
}

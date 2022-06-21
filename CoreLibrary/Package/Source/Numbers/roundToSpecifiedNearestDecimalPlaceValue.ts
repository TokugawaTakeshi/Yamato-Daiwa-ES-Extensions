export default function roundToSpecifiedNearestDecimalPlaceValue(
  namedParameters: { targetNumber: number; digitsAfterDecimalPoint: number; }
): number {

  /* eslint-disable-next-line @typescript-eslint/no-magic-numbers --
  * In this case, it is hard to give some exact name to this multiplier. */
  const powerOfTen: number = Math.pow(10, namedParameters.digitsAfterDecimalPoint);

  return Math.round(powerOfTen * namedParameters.targetNumber) / powerOfTen;
}

export default function roundToSpecifiedNearestDecimalPlaceValue(
  sourceData: Readonly<{ targetNumber: number; digitsAfterDecimalPoint: number; }>
): number {

  /* eslint-disable-next-line @typescript-eslint/no-magic-numbers --
  * In this case it is hard to give some exact name to this multiplier. */
  const powerOfTen: number = Math.pow(10, sourceData.digitsAfterDecimalPoint);

  return Math.round(powerOfTen * sourceData.targetNumber) / powerOfTen;

}

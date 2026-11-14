export default function roundToSpecificNearestIntegerPlaceValue(
  sourceDataAndOptions:
      Readonly<{
        targetNumber: number;
        trailingZerosCount: number;
      }>
): number {

  const digitsCountInTargetNumber: number = sourceDataAndOptions.targetNumber.toString().length;

  const trailingZerosCount: number = sourceDataAndOptions.trailingZerosCount < digitsCountInTargetNumber ?
      sourceDataAndOptions.trailingZerosCount : digitsCountInTargetNumber - 1;

  const coefficient: number = Math.pow(10, trailingZerosCount);

  return Math.round(sourceDataAndOptions.targetNumber / coefficient) * coefficient;

}

export default function roundDownToSpecificIntegerPlaceValue(
  sourceData: Readonly<{
    targetNumber: number;
    trailingZerosCount: number;
  }>
): number {

  const digitsCountInTargetNumber: number = sourceData.targetNumber.toString().length;

  const trailingZerosCount: number = sourceData.trailingZerosCount < digitsCountInTargetNumber ?
      sourceData.trailingZerosCount : digitsCountInTargetNumber - 1;

  const coefficient: number = Math.pow(10, trailingZerosCount);

  return Math.floor(sourceData.targetNumber / coefficient) * coefficient;

}

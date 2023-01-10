export default function getYearOfPreviousMonth(
  sourceData:
      Readonly<
        { referenceYear: number; } &
        (
          { referenceMonthNumber__numerationFrom0: number; } |
          { referenceMonthNumber__numerationFrom1: number; }
        )
      >
): number {

  const referenceMonthNumber__numerationFrom1: number = "referenceMonthNumber__numerationFrom1" in sourceData ?
      sourceData.referenceMonthNumber__numerationFrom1 : sourceData.referenceMonthNumber__numerationFrom0 + 1;

  return referenceMonthNumber__numerationFrom1 === 1 ? sourceData.referenceYear - 1 : sourceData.referenceYear;

}

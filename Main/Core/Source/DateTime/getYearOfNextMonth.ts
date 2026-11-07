import { MONTHS_COUNT_IN_YEAR } from "fundamental-constants";


export default function getYearOfNextMonth(
  sourceDataAndOptions:
      Readonly<
        { referenceYear: number; } &
        (
          { referenceMonthNumber__numerationFrom0: number; } |
          { referenceMonthNumber__numerationFrom1: number; }
        )
      >
): number {

  const referenceMonthNumber__numerationFrom1: number = "referenceMonthNumber__numerationFrom1" in sourceDataAndOptions ?
      sourceDataAndOptions.referenceMonthNumber__numerationFrom1 : sourceDataAndOptions.referenceMonthNumber__numerationFrom0 + 1;

  return referenceMonthNumber__numerationFrom1 === MONTHS_COUNT_IN_YEAR ?
      sourceDataAndOptions.referenceYear + 1 : sourceDataAndOptions.referenceYear;

}

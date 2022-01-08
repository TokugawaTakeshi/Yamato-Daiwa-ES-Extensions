import { MONTHS_PER_YEAR } from "../ConstantsAndEnumerations/DateTimeConstants";


export default function getYearOfNextMonth(
  parametersObject: {
    referenceYear: number;
  } & (
    { referenceMonthNumber__numerationFrom0: number; } |
    { referenceMonthNumber__numerationFrom1: number; }
  )
): number {

  const referenceMonthNumber__numerationFrom1: number = "referenceMonthNumber__numerationFrom1" in parametersObject ?
      parametersObject.referenceMonthNumber__numerationFrom1 : parametersObject.referenceMonthNumber__numerationFrom0 + 1;

  return referenceMonthNumber__numerationFrom1 === MONTHS_PER_YEAR ?
      parametersObject.referenceYear + 1 : parametersObject.referenceYear;
}

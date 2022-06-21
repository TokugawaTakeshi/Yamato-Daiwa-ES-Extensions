import MONTHS_PER_YEAR from "../ConstantsAndEnumerations/DateTime/MONTHS_PER_YEAR";


export default function getYearOfNextMonth(
  namedParameters:
      Readonly<
        { referenceYear: number; } &
        (
          { referenceMonthNumber__numerationFrom0: number; } |
          { referenceMonthNumber__numerationFrom1: number; }
        )
      >
): number {

  const referenceMonthNumber__numerationFrom1: number = "referenceMonthNumber__numerationFrom1" in namedParameters ?
      namedParameters.referenceMonthNumber__numerationFrom1 : namedParameters.referenceMonthNumber__numerationFrom0 + 1;

  return referenceMonthNumber__numerationFrom1 === MONTHS_PER_YEAR ?
      namedParameters.referenceYear + 1 : namedParameters.referenceYear;
}

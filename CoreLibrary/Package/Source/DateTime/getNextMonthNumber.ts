import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";
import MONTHS_PER_YEAR from "../ConstantsAndEnumerations/DateTime/MONTHS_PER_YEAR";

import getMonthNumberByName from "./getMonthNumberByName";


export default function getNextMonthNumber(
  namedParameters:
      Readonly<
        (
          (
            { referenceMonthNumber__numerationFrom0: number; } |
            { referenceMonthNumber__numerationFrom1: number; }
          ) |
          { referenceMonthName: MonthsNames; }
        ) &
        { firstMonthNumberInRelationToReturnableValue: 0 | 1; }
      >
): number {

  let referenceMonthNumber__numerationFrom1: number;

  if ("referenceMonthNumber__numerationFrom1" in namedParameters) {
    referenceMonthNumber__numerationFrom1 = namedParameters.referenceMonthNumber__numerationFrom1;
  } else if ("referenceMonthNumber__numerationFrom0" in namedParameters) {
    referenceMonthNumber__numerationFrom1 = namedParameters.referenceMonthNumber__numerationFrom0 + 1;
  } else {
    referenceMonthNumber__numerationFrom1 = getMonthNumberByName({
      targetMonthName: namedParameters.referenceMonthName, numerationFrom: 1
    });
  }

  const nextMonthNumber__numerationFrom1: number = referenceMonthNumber__numerationFrom1 === MONTHS_PER_YEAR ?
      1 : referenceMonthNumber__numerationFrom1 + 1;

  return namedParameters.firstMonthNumberInRelationToReturnableValue === 1 ?
      nextMonthNumber__numerationFrom1 : nextMonthNumber__numerationFrom1 - 1;
}

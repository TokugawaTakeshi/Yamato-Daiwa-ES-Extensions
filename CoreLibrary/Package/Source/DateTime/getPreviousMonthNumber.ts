import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";
import { MONTHS_PER_YEAR } from "../ConstantsAndEnumerations/DateTimeConstants";

import getMonthNumberByName from "./getMonthNumberByName";


export default function getPreviousMonthNumber(
  parametersObject: {
    referenceYear: number;
  } & (
    (
      { referenceMonthNumber__numerationFrom0: number; } |
      { referenceMonthNumber__numerationFrom1: number; }
    ) |
    { referenceMonthName: MonthsNames; }
  ) & {
    firstMonthNumberInRelationToReturnableValue: 0 | 1;
  }
): number {

  let referenceMonthNumber__numerationFrom1: number;

  if ("referenceMonthNumber__numerationFrom1" in parametersObject) {
    referenceMonthNumber__numerationFrom1 = parametersObject.referenceMonthNumber__numerationFrom1;
  } else if ("referenceMonthNumber__numerationFrom0" in parametersObject) {
    referenceMonthNumber__numerationFrom1 = parametersObject.referenceMonthNumber__numerationFrom0 + 1;
  } else {
    referenceMonthNumber__numerationFrom1 = getMonthNumberByName({
      targetMonthName: parametersObject.referenceMonthName, numerationFrom: 1
    });
  }

  const previousMonthNumber__numerationFrom1: number = referenceMonthNumber__numerationFrom1 === 1 ?
      MONTHS_PER_YEAR : referenceMonthNumber__numerationFrom1 - 1;

  return parametersObject.firstMonthNumberInRelationToReturnableValue === 1 ?
      previousMonthNumber__numerationFrom1 : previousMonthNumber__numerationFrom1 - 1;
}

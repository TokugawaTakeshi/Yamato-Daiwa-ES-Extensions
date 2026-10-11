import { MONTHS_COUNT_IN_YEAR, type MonthsNames } from "fundamental-constants";


import getMonthNumberByName from "./getMonthNumberByName";


export default function getNextMonthNumber(
  sourceData:
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

  if ("referenceMonthNumber__numerationFrom1" in sourceData) {
    referenceMonthNumber__numerationFrom1 = sourceData.referenceMonthNumber__numerationFrom1;
  } else if ("referenceMonthNumber__numerationFrom0" in sourceData) {
    referenceMonthNumber__numerationFrom1 = sourceData.referenceMonthNumber__numerationFrom0 + 1;
  } else {
    referenceMonthNumber__numerationFrom1 = getMonthNumberByName({
      targetMonthName: sourceData.referenceMonthName, numerationFrom: 1
    });
  }

  const nextMonthNumber__numerationFrom1: number = referenceMonthNumber__numerationFrom1 === MONTHS_COUNT_IN_YEAR ?
      1 : referenceMonthNumber__numerationFrom1 + 1;

  return sourceData.firstMonthNumberInRelationToReturnableValue === 1 ?
      nextMonthNumber__numerationFrom1 : nextMonthNumber__numerationFrom1 - 1;

}

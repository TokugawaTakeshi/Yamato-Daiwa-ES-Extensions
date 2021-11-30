/* [ ESLint muting rationale ] Here is all numbers are refers to months. */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";


export default function getMonthNumberByName(
  parametersObject: { targetMonthName: MonthsNames; numerationFrom: number; }
): number {

  const isNumerationFrom0: boolean = parametersObject.numerationFrom === 0;

  switch (parametersObject.targetMonthName) {
    case MonthsNames.january: return isNumerationFrom0 ? 0 : 1;
    case MonthsNames.february: return isNumerationFrom0 ? 1 : 2;
    case MonthsNames.march: return isNumerationFrom0 ? 2 : 3;
    case MonthsNames.april: return isNumerationFrom0 ? 3 : 4;
    case MonthsNames.may: return isNumerationFrom0 ? 4 : 5;
    case MonthsNames.june: return isNumerationFrom0 ? 5 : 6;
    case MonthsNames.july: return isNumerationFrom0 ? 6 : 7;
    case MonthsNames.august: return isNumerationFrom0 ? 7 : 8;
    case MonthsNames.september: return isNumerationFrom0 ? 8 : 9;
    case MonthsNames.october: return isNumerationFrom0 ? 9 : 10;
    case MonthsNames.november: return isNumerationFrom0 ? 10 : 11;
    case MonthsNames.december: return isNumerationFrom0 ? 11 : 12;
  }
}

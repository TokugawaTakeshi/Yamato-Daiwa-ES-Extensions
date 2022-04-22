/* [ ESLint muting rationale ] Here are all numbers refers to months. */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";


export default function getMonthNumberByName(
  parametersObject: { targetMonthName: MonthsNames; numerationFrom: number; }
): number {

  const numerationFrom: number = parametersObject.numerationFrom;

  if (numerationFrom !== 0 && numerationFrom !== 1) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "parametersObject.numerationFrom",
        messageSpecificPart: `Supported month numerations are from 0 or 1 while actual value is ${numerationFrom}.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getMonthNumberByName(parametersObject)"
    });
  }


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

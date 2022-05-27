/* [ ESLint muting rationale ] Here are all numbers refers to months. */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";


export default function getMonthNameByNumber(
  namedParameters: { targetMonthNumber: number; numerationFrom: number; }
): MonthsNames {

  const {
    targetMonthNumber,
    numerationFrom
  }: { targetMonthNumber: number; numerationFrom: number; } = namedParameters;


  if (numerationFrom !== 0 && numerationFrom !== 1) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "namedParameters.numerationFrom",
        messageSpecificPart: `Supported month numerations are from 0 or 1 while actual value is ${numerationFrom}.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getMonthNameByNumber(namedParameters)"
    });
  }


  switch (targetMonthNumber) {

    case 0: {

      if (numerationFrom === 0) {
        return MonthsNames.january;
      }


      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "namedParameters",
          messageSpecificPart: "The month number 0 is invalid the numeration is from 1."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(namedParameters)"
      });
    }


    /* [ ESLint muting rationale ] The @typescript-eslint does not see "never" return type (checked for v.5.3.0) */
    /* eslint-disable-next-line no-fallthrough */
    case 1: return numerationFrom === 1 ? MonthsNames.january : MonthsNames.february;

    case 2: return numerationFrom === 1 ? MonthsNames.february : MonthsNames.march;
    case 3: return numerationFrom === 1 ? MonthsNames.march : MonthsNames.april;
    case 4: return numerationFrom === 1 ? MonthsNames.april : MonthsNames.may;
    case 5: return numerationFrom === 1 ? MonthsNames.may : MonthsNames.june;
    case 6: return numerationFrom === 1 ? MonthsNames.june : MonthsNames.july;
    case 7: return numerationFrom === 1 ? MonthsNames.july : MonthsNames.august;
    case 8: return numerationFrom === 1 ? MonthsNames.august : MonthsNames.september;
    case 9: return numerationFrom === 1 ? MonthsNames.september : MonthsNames.october;
    case 10: return numerationFrom === 1 ? MonthsNames.october : MonthsNames.november;
    case 11: return numerationFrom === 1 ? MonthsNames.november : MonthsNames.december;

    case 12: {

      if (numerationFrom === 1) {
        return MonthsNames.december;
      }


      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "namedParameters",
          messageSpecificPart: "The month number 12 is invalid the numeration is from 0."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(namedParameters)"
      });
    }


    /* [ ESLint muting rationale ] The @typescript-eslint does not see "never" return type (checked for v.5.3.0) */
    /* eslint-disable-next-line no-fallthrough */
    default: {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "namedParameters.targetMonthNumber",
          messageSpecificPart: "The valid month number is the non-negative integer from 0 o 12 while actual value is " +
              `${targetMonthNumber}`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(namedParameters)"
      });
    }
  }
}

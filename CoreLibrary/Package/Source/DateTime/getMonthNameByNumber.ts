/* [ ESLint muting rationale ] Here are all numbers refers to months. */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";


export default function getMonthNameByNumber(
  parametersObject: { targetMonthNumber: number; numerationForm: number; }
): MonthsNames {

  const {
    targetMonthNumber,
    numerationForm
  }: { targetMonthNumber: number; numerationForm: number; } = parametersObject;


  if (numerationForm !== 0 && numerationForm !== 1) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "parametersObject.numerationForm",
        messageSpecificPart: `Supported month numerations are from 0 or 1 while actual value is ${numerationForm}.`
      }),
      title: InvalidParameterValueError.DEFAULT_TITLE,
      occurrenceLocation: "getMonthNameByNumber(parametersObject)"
    });
  }


  switch (targetMonthNumber) {

    case 0: {

      if (numerationForm === 0) {
        return MonthsNames.january;
      }


      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject",
          messageSpecificPart: "The month number 0 is invalid the numeration is from 1."
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "getMonthNameByNumber(parametersObject)"
      });
    }


    /* [ ESLint muting rationale ] The @typescript-eslint does not see "never" return type (checked for v.5.3.0) */
    /* eslint-disable-next-line no-fallthrough */
    case 1: return numerationForm === 1 ? MonthsNames.january : MonthsNames.february;

    case 2: return numerationForm === 1 ? MonthsNames.february : MonthsNames.march;
    case 3: return numerationForm === 1 ? MonthsNames.march : MonthsNames.april;
    case 4: return numerationForm === 1 ? MonthsNames.april : MonthsNames.may;
    case 5: return numerationForm === 1 ? MonthsNames.may : MonthsNames.june;
    case 6: return numerationForm === 1 ? MonthsNames.june : MonthsNames.july;
    case 7: return numerationForm === 1 ? MonthsNames.july : MonthsNames.august;
    case 8: return numerationForm === 1 ? MonthsNames.august : MonthsNames.september;
    case 9: return numerationForm === 1 ? MonthsNames.september : MonthsNames.october;
    case 10: return numerationForm === 1 ? MonthsNames.october : MonthsNames.november;
    case 11: return numerationForm === 1 ? MonthsNames.november : MonthsNames.december;

    case 12: {

      if (numerationForm === 1) {
        return MonthsNames.december;
      }


      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject",
          messageSpecificPart: "The month number 12 is invalid the numeration is from 0."
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "getMonthNameByNumber(parametersObject)"
      });
    }


    /* [ ESLint muting rationale ] The @typescript-eslint does not see "never" return type (checked for v.5.3.0) */
    /* eslint-disable-next-line no-fallthrough */
    default: {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.targetMonthNumber",
          messageSpecificPart: "The valid month number is the non-negative integer from 0 o 12 while actual value is " +
              `${targetMonthNumber}`
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "getMonthNameByNumber(parametersObject)"
      });
    }
  }
}

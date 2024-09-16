import { MonthsNames } from "fundamental-constants";

import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";


export default function getMonthNameByNumber(
  sourceData: Readonly<{ targetMonthNumber: number; numerationFrom: number; }>
): MonthsNames {

  const {
    targetMonthNumber,
    numerationFrom
  }: Readonly<{ targetMonthNumber: number; numerationFrom: number; }> = sourceData;

  if (numerationFrom !== 0 && numerationFrom !== 1) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceData.numerationFrom",
        messageSpecificPart: `Supported month numerations are from 0 or 1 while actual value is ${ numerationFrom }.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getMonthNameByNumber(sourceData)"
    });
  }


  switch (targetMonthNumber) {

    case 0: {

      if (numerationFrom === 0) {
        return MonthsNames.january;
      }


      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "sourceData",
          messageSpecificPart: "The month number 0 is invalid if the numeration is from 1."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(sourceData)"
      });

    }

    /* eslint-disable-next-line no-fallthrough --
     * The @typescript-eslint does not see the "never" type from previous case (checked for v 5.46.0) */
    case 1: return numerationFrom === 1 ? MonthsNames.january : MonthsNames.february;

    /* eslint-disable @typescript-eslint/no-magic-numbers --
     * Here are all numbers refers to months what it obvious from the switch/case declaration. */
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
          parameterNumber: 1,
          parameterName: "sourceData",
          messageSpecificPart: "The month number 12 is invalid if the numeration is from 0."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(sourceData)"
      });

    }
    /* eslint-enable @typescript-eslint/no-magic-numbers */

    /* eslint-disable-next-line no-fallthrough --
     * The @typescript-eslint does not see the "never" type from previous case (checked for v 5.46.0) */
    default: {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "sourceData.targetMonthNumber",
          messageSpecificPart: "The valid month number must be the non-negative integer from 0 to 11 or from 1 to 12 " +
              `(depending on "numerationFrom" option) while actual value is ${ targetMonthNumber }.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getMonthNameByNumber(sourceData)"
      });
    }

  }

}

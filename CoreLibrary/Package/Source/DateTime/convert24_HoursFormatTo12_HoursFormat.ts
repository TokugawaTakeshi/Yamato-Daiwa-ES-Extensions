/* eslint @typescript-eslint/no-magic-numbers: [ "error", { "ignore": [ 0, 12, 13, 23 ] } ] --
 * There is the `HOURS_COUNT_IN_STELLAR_DAY` constant but what required for this function is:
 *   + its closest smaller integer (23)
 *   + its half (12)
 *   + closest greater integer of this half (13)
 * There is no the specific name for these numbers, and they are meaningful only inside context of this function.
 * Although the computing like `HOURS_COUNT_IN_STELLAR_DAY - 1` or `HOURS_COUNT_IN_STELLAR_DAY / 2` will
 *   not cause a significant performance impact; for the common function like this one, the executing of such
 *   operations with same numbers each time is unsolicited. */
import isNaturalNumberOrZero from "../TypeGuards/Numbers/isNaturalNumberOrZero";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace ConvertingOf24_HoursFormatTo12_HoursFormat {

  export type Result = Readonly<{
    hoursAmount__12HoursFormat: number;
    isBeforeNoon: boolean;
    isAfterNoon: boolean;
  }>;

}

export default function convert24_HoursFormatTo12_HoursFormat(
  hoursAmount__24Format: number
): ConvertingOf24_HoursFormatTo12_HoursFormat.Result {

  if (!isNaturalNumberOrZero(hoursAmount__24Format) || hoursAmount__24Format > 23) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "hoursAmount__24Format",
        messageSpecificPart:
            "The hours amount must be specified with the positive integer from 0 to 23 while " +
            `${ hoursAmount__24Format } has been specified.`

      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "convert24_HoursFormatTo12_HoursFormat(hoursAmount__24Format)"
    });
  }


  if (hoursAmount__24Format === 0) {
    return {
      hoursAmount__12HoursFormat: 12,
      isBeforeNoon: true,
      isAfterNoon: false
    };
  }


  if (hoursAmount__24Format < 13) {
    return {
      hoursAmount__12HoursFormat: hoursAmount__24Format,
      isBeforeNoon: true,
      isAfterNoon: false
    };
  }


  return {
    hoursAmount__12HoursFormat: hoursAmount__24Format - 12,
    isBeforeNoon: false,
    isAfterNoon: true
  };

}

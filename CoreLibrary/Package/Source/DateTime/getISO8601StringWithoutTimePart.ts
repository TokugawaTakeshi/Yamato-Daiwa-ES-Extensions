import isValidNativeDate from "./isValidNativeDate";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING from
    "../ConstantsAndEnumerations/DateTime/CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING";
import isString from "../TypeGuards/Strings/isString";


export default function getISO8601StringWithoutTimePart(targetDate: Date | string): string {

  const normalizedDate: Date = new Date(targetDate);

  if (!isValidNativeDate(normalizedDate)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "targetDate",
        parameterNumber: 1
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getISO8601StringWithoutTimePart(targetDate)"
    });
  }


  if (
    isString(targetDate) &&
    targetDate.length < CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING
  ) {
    return targetDate;
  }


  return normalizedDate.toISOString().substring(0, CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING);

}

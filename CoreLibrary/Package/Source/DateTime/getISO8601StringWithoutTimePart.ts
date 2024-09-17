import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import type { MonthsNames } from "fundamental-constants";
import { CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING } from "fundamental-constants";
import getMonthNumberByName from "./getMonthNumberByName";
import isValidISO8601DateAndPossiblyTimeDefinition from "./isValidISO8601DateAndPossiblyTimeDefinition";
import isValidNativeDate from "./isValidNativeDate";


export default function getISO8601StringWithoutTimePart(
  sourceDataAndOptions: Readonly<
    (
      {
        ISO8601Definition: string;
        mustConsiderAsLocalIfTimeNotSpecified: boolean;
      } |
      (
        { year__UTC: number; } &
        (
          { monthName__UTC: MonthsNames; } |
          { monthNumber__UTC__numerationFrom0: number; } |
          { monthNumber__UTC__numerationFrom1: number; }
        ) &
        { dayOfMonth__UTC: number; }
      ) |
      { nativeDateInstance: Date; }
    ) &
    { mustAssociateOutputWithLocalDate: boolean; }
  >
): string {

  if ("ISO8601Definition" in sourceDataAndOptions) {

    if (!isValidISO8601DateAndPossiblyTimeDefinition(sourceDataAndOptions.ISO8601Definition)) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceDataAndOptions",
          parameterNumber: 1,
          messageSpecificPart: "The value of \"ISO8601Definition\" property does not obey to ISO8601 standard."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getISO8601StringWithoutTimePart(sourceDataAndOptions)"
      });

    }

    let nativeDateInstance: Date;

    if (
      sourceDataAndOptions.ISO8601Definition.length <= CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING &&
      sourceDataAndOptions.mustConsiderAsLocalIfTimeNotSpecified
    ) {

      /* [ Theory ] ※
       * Date-only strings (e.g. "1970-01-01") are treated as UTC, while date-time strings (e.g. "1970-01-01T12:00")
       * are treated as local. See
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#date_string
       * for details. */
      nativeDateInstance = new Date(
        `${ sourceDataAndOptions.ISO8601Definition.substring(0, CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING) }T00:00`
      );

    } else {

      nativeDateInstance = new Date(sourceDataAndOptions.ISO8601Definition);

    }

    if (sourceDataAndOptions.mustAssociateOutputWithLocalDate) {
      return `${ nativeDateInstance.getFullYear() }-` +
          `${ String(nativeDateInstance.getMonth() + 1).padStart(2, "0") }-` +
          `${ String(nativeDateInstance.getDate()).padStart(2, "0") }`;
    }


    return nativeDateInstance.toISOString().substring(0, CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING);

  }


  if ("year__UTC" in sourceDataAndOptions) {

    let monthNumber__UTC__numerationFrom0: number;

    if ("monthNumber__UTC__numerationFrom0" in sourceDataAndOptions) {
      monthNumber__UTC__numerationFrom0 = sourceDataAndOptions.monthNumber__UTC__numerationFrom0;
    } else if ("monthNumber__UTC__numerationFrom1" in sourceDataAndOptions) {
      monthNumber__UTC__numerationFrom0 = sourceDataAndOptions.monthNumber__UTC__numerationFrom1 - 1;
    } else {
      monthNumber__UTC__numerationFrom0 = getMonthNumberByName({
        targetMonthName: sourceDataAndOptions.monthName__UTC,
        numerationFrom: 0
      });
    }

    const nativeDateInstance: Date = new Date(
      Date.UTC(
        sourceDataAndOptions.year__UTC,
        monthNumber__UTC__numerationFrom0,
        sourceDataAndOptions.dayOfMonth__UTC
      )
    );

    if (!isValidNativeDate(nativeDateInstance)) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceDataAndOptions",
          parameterNumber: 1,
          messageSpecificPart: "The specified UTC date is invalid."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getISO8601StringWithoutTimePart(sourceDataAndOptions)"
      });

    }


    if (sourceDataAndOptions.mustAssociateOutputWithLocalDate) {

      return `${ nativeDateInstance.getFullYear() }-` +
          `${ String(nativeDateInstance.getMonth() + 1).padStart(2, "0") }-` +
          `${ String(nativeDateInstance.getDate()).padStart(2, "0") }`;

    }


    return nativeDateInstance.toISOString().substring(0, CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING);

  }


  if (sourceDataAndOptions.mustAssociateOutputWithLocalDate) {

    return `${ sourceDataAndOptions.nativeDateInstance.getFullYear() }-` +
        `${ String(sourceDataAndOptions.nativeDateInstance.getMonth() + 1).padStart(2, "0") }-` +
        `${ String(sourceDataAndOptions.nativeDateInstance.getDate()).padStart(2, "0") }`;

  }


  return sourceDataAndOptions.nativeDateInstance.
    toISOString().
    substring(0, CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING);

}

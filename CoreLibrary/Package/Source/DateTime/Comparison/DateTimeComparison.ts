import isValidNativeDate from "../isValidNativeDate";
import isValidISO8601DateAndPossiblyTimeDefinition from "../isValidISO8601DateAndPossiblyTimeDefinition";
import CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING from
    "../../ConstantsAndEnumerations/DateTime/CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


abstract class DateTimeComparison {

  public static normalizeTargetAndReferenceDateTime(
    sourceData: Readonly<{
      targetDateTime: DateTimeComparison.DateTimeDefinition;
      referenceDateTime: DateTimeComparison.DateTimeDefinition;
    }>
  ): Readonly<{
    targetDateTime: Date;
    referenceDateTime: Date;
  }> {

    let targetDateTime: Date;
    let referenceDateTime: Date;

    if (sourceData.targetDateTime instanceof Date) {

      if (!isValidNativeDate(sourceData.targetDateTime)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceData",
            parameterNumber: 1,
            messageSpecificPart: "The \"targetDateTime\" property includes the invalid instance of \"Date\"."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateTimeComparison.normalizeTargetAndReferenceDateTime(sourceData)"
        });
      }

      targetDateTime = new Date(sourceData.targetDateTime);

    } else {

      if (!isValidISO8601DateAndPossiblyTimeDefinition(sourceData.targetDateTime.ISO8601Definition)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceData",
            parameterNumber: 1,
            messageSpecificPart: "The \"targetDateTime.ISO8601Definition\" does not obey to ISO8601 standard."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateTimeComparison.normalizeTargetAndReferenceDateTime(sourceData)"
        });
      }

      if (
        sourceData.targetDateTime.ISO8601Definition.length <= CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING &&
        sourceData.targetDateTime.mustConsiderAsLocalIfTimeNotSpecified
      ) {

        /* [ Theory ] ※
         * Date-only strings (e.g. "1970-01-01") are treated as UTC, while date-time strings (e.g. "1970-01-01T12:00")
         * are treated as local. See
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#date_string
         * for details. */
        targetDateTime = new Date(
          `${ sourceData.targetDateTime.ISO8601Definition.substring(0, CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING) }T00:00`
        );

      } else {

        targetDateTime = new Date(sourceData.targetDateTime.ISO8601Definition);

      }

    }

    if (sourceData.referenceDateTime instanceof Date) {

      if (!isValidNativeDate(sourceData.referenceDateTime)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceData",
            parameterNumber: 1,
            messageSpecificPart: "The \"referenceDateTime\" property includes the invalid instance of \"Date\"."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateTimeComparison.normalizeTargetAndReferenceDateTime(sourceData)"
        });
      }

      referenceDateTime = new Date(sourceData.referenceDateTime);

    } else {

      if (!isValidISO8601DateAndPossiblyTimeDefinition(sourceData.referenceDateTime.ISO8601Definition)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceData",
            parameterNumber: 1,
            messageSpecificPart: "The \"referenceDateTime.ISO8601Definition\" does not obey to ISO8601 standard."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateTimeComparison.normalizeTargetAndReferenceDateTime(sourceData)"
        });
      }

      if (sourceData.referenceDateTime.mustConsiderAsLocalIfTimeNotSpecified) {

        /* [ Theory ] See ※ */
        referenceDateTime = new Date(
          `${ sourceData.referenceDateTime.ISO8601Definition.substring(0, CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING) }` +
          "T00:00"
        );

      } else {
        referenceDateTime = new Date(sourceData.referenceDateTime.ISO8601Definition);
      }

    }

    return {
      targetDateTime,
      referenceDateTime
    };

  }

}

namespace DateTimeComparison {

  export type DateTimeDefinition = Date | ISO8601BasedDefinition;

  export type ISO8601BasedDefinition = {
    ISO8601Definition: string;
    mustConsiderAsLocalIfTimeNotSpecified: boolean;
  };

}


export default DateTimeComparison;

import getISO8601StringWithoutTimePart from "./getISO8601StringWithoutTimePart";
import isValidNativeDate from "./isValidNativeDate";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function isEarlierThan(
  sourceData: Readonly<{
    targetDateTime: Date | string;
    referenceDateTime: Date | string;
    mustIgnoreTime: boolean;
  }>
): boolean {

  let targetDateTime: Date;
  let referenceDateTime: Date;

  if (sourceData.mustIgnoreTime) {

    targetDateTime = new Date(getISO8601StringWithoutTimePart(sourceData.targetDateTime));
    referenceDateTime = new Date(getISO8601StringWithoutTimePart(sourceData.referenceDateTime));

  } else {

    targetDateTime = new Date(sourceData.targetDateTime);
    referenceDateTime = new Date(sourceData.referenceDateTime);

    if (!isValidNativeDate(targetDateTime)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceData",
          parameterNumber: 1,
          messageSpecificPart: "The 'targetDateTime' is the invalid date."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "isEarlierThan(sourceData)"
      });
    }


    if (!isValidNativeDate(referenceDateTime)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceData",
          parameterNumber: 1,
          messageSpecificPart: "The 'referenceDateTime' is the invalid date."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "isEarlierThan(sourceData)"
      });
    }

  }


  return targetDateTime.getTime() < referenceDateTime.getTime();

}

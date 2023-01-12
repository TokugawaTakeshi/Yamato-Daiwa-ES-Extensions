import DateTimeComparison from "./DateTimeComparison";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function isEarlierThan(
  sourceData: Readonly<{
    targetDateTime: DateTimeComparison.DateTimeDefinition;
    referenceDateTime: DateTimeComparison.DateTimeDefinition;
    mustIgnoreTime: boolean;
  }>
): boolean {

  let targetDateTime: Date;
  let referenceDateTime: Date;

  try {

    /* eslint-disable-next-line @typescript-eslint/typedef --
     * The bug of "@typescript-eslint": here the type definition syntactically could not be. */
    ({ targetDateTime, referenceDateTime } = DateTimeComparison.normalizeTargetAndReferenceDateTime(sourceData));

  } catch (error: unknown) {

    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "sourceData",
        parameterNumber: 1,
        messageSpecificPart: "One or both specified dates are invalid."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isEarlierThan(sourceData)"
    });

  }

  if (sourceData.mustIgnoreTime) {
    targetDateTime.setHours(0, 0, 0, 0);
    referenceDateTime.setHours(0, 0, 0, 0);
  }

  return targetDateTime.getTime() < referenceDateTime.getTime();

}

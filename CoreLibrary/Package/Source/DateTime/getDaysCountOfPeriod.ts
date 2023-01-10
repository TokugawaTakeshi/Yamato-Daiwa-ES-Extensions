import HOURS_PER_STELLAR_DAY from "../ConstantsAndEnumerations/DateTime/HOURS_PER_STELLAR_DAY";
import MINUTES_PER_HOUR from "../ConstantsAndEnumerations/DateTime/MINUTES_PER_HOUR";
import SECONDS_PER_MINUTE from "../ConstantsAndEnumerations/DateTime/SECONDS_PER_MINUTE";
import secondsToMilliseconds from "./secondsToMilliseconds";
import isValidNativeDate from "./isValidNativeDate";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function getDaysCountOfPeriod(
  sourceData: Readonly<{
    datesOrTimeMoments: [ Date | string, Date | string ];
    mustCountIncompleteDay: boolean;
  }>
): number {

  const normalizedFirstDate: Date = new Date(sourceData.datesOrTimeMoments[0]);
  const normalizedSecondDate: Date = new Date(sourceData.datesOrTimeMoments[1]);

  for (const [ index, dateOrTimeMoment ] of [ normalizedFirstDate, normalizedSecondDate ].entries()) {

    if (!isValidNativeDate(dateOrTimeMoment)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "sourceData",
          messageSpecificPart: `The ${ index === 0 ? "first" : "second" } date / time point is not valid native Date ` +
              "or ISO8601 definition."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getDaysCountOfPeriod(sourceData)"
      });
    }

  }


  const millisecondsPerDay: number = secondsToMilliseconds(HOURS_PER_STELLAR_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE);

  const daysCount__couldBeFractional: number =
      Math.abs(normalizedFirstDate.getTime() - normalizedSecondDate.getTime()) /
      millisecondsPerDay;

  if (Number.isInteger(daysCount__couldBeFractional)) {
    return daysCount__couldBeFractional;
  }


  return sourceData.mustCountIncompleteDay ?
      Math.ceil(daysCount__couldBeFractional) :
      Math.floor(daysCount__couldBeFractional);

}

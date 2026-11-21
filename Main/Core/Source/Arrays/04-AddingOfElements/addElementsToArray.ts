import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function addElementsToArray<ArrayElement>(
  sourceDataAndOptions:
      Readonly<
        { newElements: ReadonlyArray<ArrayElement>; } &
        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        ) &
        (
          {
            toStart: true;
            toEnd?: undefined;
            toPosition__numerationFrom0?: undefined;
            toPosition__numerationFrom1?: undefined;
          } |
          {
            toEnd: true;
            toStart?: undefined;
            toPosition__numerationFrom0?: undefined;
            toPosition__numerationFrom1?: undefined;
          } |
          {
            toPosition__numerationFrom0: number;
            toStart?: undefined;
            toEnd?: undefined;
            toPosition__numerationFrom1?: undefined;
          } |
          {
            toPosition__numerationFrom1: number;
            toStart?: undefined;
            toEnd?: undefined;
            toPosition__numerationFrom0?: undefined;
          }
        )
      >
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = sourceDataAndOptions.mutably ?
      sourceDataAndOptions.targetArray : [ ...sourceDataAndOptions.targetArray ];

  if (sourceDataAndOptions.toStart === true) {
    workpiece.unshift(...sourceDataAndOptions.newElements);
    return workpiece;
  }


  if (sourceDataAndOptions.toEnd === true) {
    workpiece.push(...sourceDataAndOptions.newElements);
    return workpiece;
  }


  let positionOfFirstNewElement__numerationFrom0: number;

  if (isNaturalNumberOrZero(sourceDataAndOptions.toPosition__numerationFrom0)) {
    positionOfFirstNewElement__numerationFrom0 = sourceDataAndOptions.toPosition__numerationFrom0;
  } else if (isNaturalNumber(sourceDataAndOptions.toPosition__numerationFrom1)) {
    positionOfFirstNewElement__numerationFrom0 = sourceDataAndOptions.toPosition__numerationFrom1 - 1;
  } else {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceDataAndOptions",
        messageSpecificPart:
            "The target position has been incorrectly specified. " +
            "The valid alternatives are:\n" +
            "● \"toStart\": must be the boolean herewith \"true\" only\n" +
            "● \"toEnd\": must be the boolean herewith \"true\" only\n" +
            "● \"toPosition__numerationFrom0\": must be the natural number or zero\n" +
            "● \"toPosition__numerationFrom1\": must be the natural number"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "addElementsToArray(sourceDataAndOptions)"
    });
  }

  workpiece.splice(positionOfFirstNewElement__numerationFrom0, 0, ...sourceDataAndOptions.newElements);

  return workpiece;

}

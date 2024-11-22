import isNaturalNumberOrZero from "../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";


export default function cropArray<ArrayElement>(
  compoundParameter: Readonly<
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
        startingElementNumber__numerationFrom0: number;
        startingElementNumber__numerationFrom1?: undefined;
        fromStart?: undefined;
      } |
      {
        startingElementNumber__numerationFrom1: number;
        startingElementNumber__numerationFrom0?: undefined;
        fromStart?: undefined;
      } |
      {
        fromStart: true;
        startingElementNumber__numerationFrom1?: undefined;
        startingElementNumber__numerationFrom0?: undefined;
      }
    ) &
    (
      {
        endingElementNumber__numerationFrom0: number;
        endingElementNumber__numerationFrom1?: undefined;
        elementsCount?: undefined;
        untilEnd?: undefined;
      } |
      {
        endingElementNumber__numerationFrom1: number;
        endingElementNumber__numerationFrom0?: undefined;
        elementsCount?: undefined;
        untilEnd?: undefined;
      } |
      {
        elementsCount: number;
        endingElementNumber__numerationFrom0?: undefined;
        endingElementNumber__numerationFrom1?: undefined;
        untilEnd?: undefined;
      } |
      {
        untilEnd: true;
        endingElementNumber__numerationFrom0?: undefined;
        endingElementNumber__numerationFrom1?: undefined;
        elementsCount?: undefined;
      }
    ) &
    { mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: boolean; }
  >
): Array<ArrayElement> {

  const targetArray: ReadonlyArray<ArrayElement> = compoundParameter.targetArray;

  let startingElementNumber__numerationFrom0: number;

  if (isNaturalNumberOrZero(compoundParameter.startingElementNumber__numerationFrom0)) {
    startingElementNumber__numerationFrom0 = compoundParameter.startingElementNumber__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.startingElementNumber__numerationFrom1)) {
    startingElementNumber__numerationFrom0 = compoundParameter.startingElementNumber__numerationFrom1 - 1;
  } else if (compoundParameter.fromStart === true) {
    startingElementNumber__numerationFrom0 = 0;
  } else {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "It has been incorrectly specified from which element target array must be cropped. " +
            "The valid alternatives are:\n" +
            "● \"startingElementNumber__numerationFrom0\": must be the natural number or zero\n" +
            "● \"startingElementNumber__numerationFrom1\": must be the natural number\n" +
            "● \"fromStart\": must be the boolean herewith \"true\" only"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropArray(compoundParameter)"
    });
  }


  let endingElementNumber__numerationFrom1: number;

  if (isNaturalNumberOrZero(compoundParameter.endingElementNumber__numerationFrom0)) {
    endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom0 + 1;
  } else if (isNaturalNumber(compoundParameter.endingElementNumber__numerationFrom1)) {
    endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom1;
  } else if (isNaturalNumber(compoundParameter.elementsCount)) {
    endingElementNumber__numerationFrom1 = startingElementNumber__numerationFrom0 + compoundParameter.elementsCount;
  } else if (compoundParameter.untilEnd === true) {
    endingElementNumber__numerationFrom1 = targetArray.length;
  } else {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "It has been incorrectly specified until which element target array must be cropped. " +
            "The valid alternatives are:\n" +
            "● \"endingElementNumber__numerationFrom0\": must be the natural number or zero\n" +
            "● \"endingElementNumber__numerationFrom1\": must be the natural number\n" +
            "● \"elementsCount\": must be the natural number\n" +
            "● \"untilEnd\": must be the boolean herewith \"true\" only"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropArray(compoundParameter)"
    });
  }


  if (
    endingElementNumber__numerationFrom1 > targetArray.length &&
        compoundParameter.mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            `The specified last element number is ${ endingElementNumber__numerationFrom1 } (numeration from 1) while ` +
              `the target array has only ${ targetArray.length } elements.` +
            "The error has been thrown because the \"mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange\" option " +
              "has been set to \"true\"."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropArray(compoundParameter)"
    });
  }


  if (compoundParameter.mutably) {

    /* [ Approach ]
     * It is easier to cut off the right remainder first.
     * No need to compute the exact value of the second parameter - `targetArray.length` will always give the correct result. */
    compoundParameter.targetArray.splice(endingElementNumber__numerationFrom1, targetArray.length);

    compoundParameter.targetArray.splice(0, startingElementNumber__numerationFrom0);

    return compoundParameter.targetArray;

  }


  return targetArray.slice(startingElementNumber__numerationFrom0, endingElementNumber__numerationFrom1);

}

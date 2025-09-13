import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import limitMinimalValue from "../../Numbers/limitMinimalValue";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../../Logging/Logger";


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
      (
        {
          fromStart: true;
          fromEnd?: undefined;
        } &
        (
          {
            startingElementNumber__numerationFrom0: number;
            startingElementNumber__numerationFrom1?: undefined;
            fromFirstElement?: undefined;
          } |
          {
            startingElementNumber__numerationFrom1: number;
            startingElementNumber__numerationFrom0?: undefined;
            fromFirstElement?: undefined;
          } |
          {
            fromFirstElement: true;
            startingElementNumber__numerationFrom1?: undefined;
            startingElementNumber__numerationFrom0?: undefined;
          }
        ) &
        (
          {
            endingElementNumber__numerationFrom0__including: number;
            endingElementNumber__numerationFrom1__including?: undefined;
            endingElementNumber__numerationFrom0__notIncluding?: undefined;
            endingElementNumber__numerationFrom1__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLastElement?: undefined;
          } |
          {
            endingElementNumber__numerationFrom1__including: number;
            endingElementNumber__numerationFrom0__including?: undefined;
            endingElementNumber__numerationFrom0__notIncluding?: undefined;
            endingElementNumber__numerationFrom1__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLastElement?: undefined;
          } |
          {
            endingElementNumber__numerationFrom0__notIncluding: number;
            endingElementNumber__numerationFrom0__including?: undefined;
            endingElementNumber__numerationFrom1__including?: undefined;
            endingElementNumber__numerationFrom1__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLastElement?: undefined;
          } |
          {
            endingElementNumber__numerationFrom1__notIncluding: number;
            endingElementNumber__numerationFrom0__including?: undefined;
            endingElementNumber__numerationFrom1__including?: undefined;
            endingElementNumber__numerationFrom0__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLastElement?: undefined;
          } |
          {
            elementsCount: number;
            endingElementNumber__numerationFrom0__including?: undefined;
            endingElementNumber__numerationFrom1__including?: undefined;
            endingElementNumber__numerationFrom0__notIncluding?: undefined;
            endingElementNumber__numerationFrom1__notIncluding?: undefined;
            untilLastElement?: undefined;
          } |
          {
            untilLastElement: true;
            endingElementNumber__numerationFrom0__including?: undefined;
            endingElementNumber__numerationFrom1__including?: undefined;
            endingElementNumber__numerationFrom0__notIncluding?: undefined;
            endingElementNumber__numerationFrom1__notIncluding?: undefined;
            elementsCount?: undefined;
          }
        )
      ) |
      (
        {
          fromEnd: true;
          fromStart?: undefined;
        } &
        (
          {
            rightElementNumber__numerationFrom0_AndRight: number;
            rightElementNumber__numerationFrom1_AndRight?: undefined;
            fromRightmostElement?: undefined;
          } |
          {
            rightElementNumber__numerationFrom1_AndRight: number;
            rightElementNumber__numerationFrom0_AndRight?: undefined;
            fromRightmostElement?: undefined;
          } |
          {
            fromRightmostElement: true;
            rightElementNumber__numerationFrom1_AndRight?: undefined;
            rightElementNumber__numerationFrom0_AndRight?: undefined;
          }
        ) &
        (
          {
            leftElementNumber__numerationFrom0_AndRight__including: number;
            leftElementNumber__numerationFrom1_AndRight__including?: undefined;
            leftElementNumber__numerationFrom0_AndRight__notIncluding?: undefined;
            leftElementNumber__numerationFrom1_AndRight__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLeftmostElement?: undefined;
          } |
          {
            leftElementNumber__numerationFrom1_AndRight__including: number;
            leftElementNumber__numerationFrom0_AndRight__including?: undefined;
            leftElementNumber__numerationFrom0_AndRight__notIncluding?: undefined;
            leftElementNumber__numerationFrom1_AndRight__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLeftmostElement?: undefined;
          } |
          {
            leftElementNumber__numerationFrom0_AndRight__notIncluding: number;
            leftElementNumber__numerationFrom0_AndRight__including?: undefined;
            leftElementNumber__numerationFrom1_AndRight__including?: undefined;
            leftElementNumber__numerationFrom1_AndRight__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLeftmostElement?: undefined;
          } |
          {
            leftElementNumber__numerationFrom1_AndRight__notIncluding: number;
            leftElementNumber__numerationFrom0_AndRight__including?: undefined;
            leftElementNumber__numerationFrom1_AndRight__including?: undefined;
            leftElementNumber__numerationFrom0_AndRight__notIncluding?: undefined;
            elementsCount?: undefined;
            untilLeftmostElement?: undefined;
          } |
          {
            elementsCount: number;
            leftElementNumber__numerationFrom0_AndRight__including?: undefined;
            leftElementNumber__numerationFrom1_AndRight__including?: undefined;
            leftElementNumber__numerationFrom0_AndRight__notIncluding?: undefined;
            leftElementNumber__numerationFrom1_AndRight__notIncluding?: undefined;
            untilLeftmostElement?: undefined;
          } |
          {
            untilLeftmostElement: true;
            leftElementNumber__numerationFrom0_AndRight__including?: undefined;
            leftElementNumber__numerationFrom1_AndRight__including?: undefined;
            leftElementNumber__numerationFrom0_AndRight__notIncluding?: undefined;
            leftElementNumber__numerationFrom1_AndRight__notIncluding?: undefined;
            elementsCount?: undefined;
          }
        )
      )
    ) &
    { mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: boolean; }
  >
): Array<ArrayElement> {

  const targetArray: ReadonlyArray<ArrayElement> = compoundParameter.targetArray;
  const elementsCountInTargetArray: number = targetArray.length;

  let startingElementNumber__numerationFrom0: number;
  let endingElementNumber__numerationFrom1: number;

  if (compoundParameter.fromStart) {

    if (isNaturalNumberOrZero(compoundParameter.startingElementNumber__numerationFrom0)) {

      startingElementNumber__numerationFrom0 = compoundParameter.startingElementNumber__numerationFrom0;

    } else if (isNaturalNumber(compoundParameter.startingElementNumber__numerationFrom1)) {

      startingElementNumber__numerationFrom0 = compoundParameter.startingElementNumber__numerationFrom1 - 1;

    } else if (compoundParameter.fromFirstElement === true) {

      startingElementNumber__numerationFrom0 = 0;

    } else {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
            "It has been incorrectly specified from which element target array must be cropped. " +
            "The valid alternatives for `fromStart: true` case are:\n" +
            "● `startingElementNumber__numerationFrom0`: must be the natural number or zero\n" +
            "● `startingElementNumber__numerationFrom1`: must be the natural number\n" +
            "● `fromFirstElement`: must be the boolean herewith \"true\" only"
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "cropArray(compoundParameter)"
      });

    }

    if (isNaturalNumberOrZero(compoundParameter.endingElementNumber__numerationFrom0__including)) {

      endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom0__including + 1;

    } else if (isNaturalNumber(compoundParameter.endingElementNumber__numerationFrom1__including)) {

      endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom1__including;

    } else if (isNaturalNumberOrZero(compoundParameter.endingElementNumber__numerationFrom0__notIncluding)) {

      endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom0__notIncluding;

    } else if (isNaturalNumber(compoundParameter.endingElementNumber__numerationFrom1__notIncluding)) {

      endingElementNumber__numerationFrom1 = compoundParameter.endingElementNumber__numerationFrom1__notIncluding - 1;

    } else if (isNaturalNumber(compoundParameter.elementsCount)) {

      endingElementNumber__numerationFrom1 = startingElementNumber__numerationFrom0 + compoundParameter.elementsCount;

    } else if (compoundParameter.untilLastElement === true) {

      endingElementNumber__numerationFrom1 = elementsCountInTargetArray;

    } else {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
            "It has been incorrectly specified until which element target array must be cropped. " +
            "The valid alternatives for `fromStart: true` case are:\n" +
            "● `endingElementNumber__numerationFrom0__including`: must be the natural number or zero\n" +
            "● `endingElementNumber__numerationFrom1__including`: must be the natural number\n" +
            "● `endingElementNumber__numerationFrom0__notIncluding`: must be the natural number or zero\n" +
            "● `endingElementNumber__numerationFrom1__notIncluding`: must be the natural number\n" +
            "● `elementsCount`: must be the natural number\n" +
            "● `untilLastElement`: must be the boolean herewith \"true\" only"
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "cropArray(compoundParameter)"
      });

    }

  } else {

    if (isNaturalNumberOrZero(compoundParameter.rightElementNumber__numerationFrom0_AndRight)) {

      endingElementNumber__numerationFrom1 =
          elementsCountInTargetArray -
          compoundParameter.rightElementNumber__numerationFrom0_AndRight;

    } else if (isNaturalNumber(compoundParameter.rightElementNumber__numerationFrom1_AndRight)) {

      endingElementNumber__numerationFrom1 =
          elementsCountInTargetArray -
          compoundParameter.rightElementNumber__numerationFrom1_AndRight +
          1;

    } else if (compoundParameter.fromRightmostElement === true) {

      endingElementNumber__numerationFrom1 = elementsCountInTargetArray;

    } else {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
            "It has been incorrectly specified from which element target array must be cropped. " +
            "The valid alternatives for `fromEnd: true` case are:\n" +
            "● `rightElementNumber__numerationFrom0`: must be the natural number or zero\n" +
            "● `rightElementNumber__numerationFrom1`: must be the natural number\n" +
            "● `fromLastElement`: must be the boolean herewith \"true\" only"
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "cropArray(compoundParameter)"
      });

    }

    if (isNaturalNumberOrZero(compoundParameter.leftElementNumber__numerationFrom0_AndRight__including)) {

      startingElementNumber__numerationFrom0 =
          elementsCountInTargetArray -
          compoundParameter.leftElementNumber__numerationFrom0_AndRight__including -
          1;

    } else if (isNaturalNumber(compoundParameter.leftElementNumber__numerationFrom1_AndRight__including)) {

      startingElementNumber__numerationFrom0 =
          elementsCountInTargetArray -
          compoundParameter.leftElementNumber__numerationFrom1_AndRight__including;

    } else if (isNaturalNumberOrZero(compoundParameter.leftElementNumber__numerationFrom0_AndRight__notIncluding)) {

      startingElementNumber__numerationFrom0 =
          elementsCountInTargetArray -
          compoundParameter.leftElementNumber__numerationFrom0_AndRight__notIncluding;

    } else if (isNaturalNumber(compoundParameter.leftElementNumber__numerationFrom1_AndRight__notIncluding)) {

      startingElementNumber__numerationFrom0 =
          elementsCountInTargetArray -
          compoundParameter.leftElementNumber__numerationFrom1_AndRight__notIncluding +
          1;

    } else if (isNaturalNumber(compoundParameter.elementsCount)) {

      startingElementNumber__numerationFrom0 = endingElementNumber__numerationFrom1 - compoundParameter.elementsCount;

    } else if (compoundParameter.untilLeftmostElement === true) {

      startingElementNumber__numerationFrom0 = 0;

    } else {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
            "It has been incorrectly specified until which element target array must be cropped. " +
            "The valid alternatives for `fromStart: true` case are:\n" +
            "● `leftElementNumber__numerationFrom0__including`: must be the natural number or zero\n" +
            "● `leftElementNumber__numerationFrom1__including`: must be the natural number\n" +
            "● `leftElementNumber__numerationFrom0__notIncluding`: must be the natural number or zero\n" +
            "● `leftElementNumber__numerationFrom1__notIncluding`: must be the natural number\n" +
            "● `elementsCount`: must be the natural number\n" +
            "● `untilFirstElement`: must be the boolean herewith \"true\" only"
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "cropArray(compoundParameter)"
      });

    }

  }


  if (
    startingElementNumber__numerationFrom0 >= elementsCountInTargetArray &&
        compoundParameter.mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange
  ) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
          `The cropping of array with ${ elementsCountInTargetArray } element(s) has been requested while ` +
            `specified starting element has index ${ startingElementNumber__numerationFrom0 } (from left). ` +
          "The error has been thrown because the \"mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange\" option " +
            "has been set to \"true\"."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropArray(compoundParameter)"
    });
  }


  if (
    startingElementNumber__numerationFrom0 < 0 &&
        compoundParameter.mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange
  ) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
          "Starting (left) element has been specified such as it has the negative index if to recompute it to " +
            "numeration from zero and left. " +
          "The error has been thrown because the \"mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange\" option " +
            "has been set to \"true\"."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropArray(compoundParameter)"
    });
  }


  if (
    endingElementNumber__numerationFrom1 > elementsCountInTargetArray &&
        compoundParameter.mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange
  ) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            `The cropping of array with ${ elementsCountInTargetArray } element(s) has been requested from ` +
              `element with index ${ startingElementNumber__numerationFrom0 } (from left) until element with index ` +
              `${ endingElementNumber__numerationFrom1 - 1 } what is out of range. ` +
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


  return targetArray.slice(
    limitMinimalValue({ targetNumber: startingElementNumber__numerationFrom0, minimalValue: 0 }),
    endingElementNumber__numerationFrom1
  );

}

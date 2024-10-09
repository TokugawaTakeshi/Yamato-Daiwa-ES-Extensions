import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";


export default function cropString(
  compoundParameter:
      { targetString: string; } &
      (
        {
          startingCharacterNumber__numerationFrom0: number;
          startingCharacterNumber__numerationFrom1?: undefined;
          fromStart?: undefined;
        } |
        {
          startingCharacterNumber__numerationFrom1: number;
          startingCharacterNumber__numerationFrom0?: undefined;
          fromStart?: undefined;
        } |
        {
          fromStart: true;
          startingCharacterNumber__numerationFrom1?: undefined;
          startingCharacterNumber__numerationFrom0?: undefined;
        }
      ) &
      (
        {
          endingCharacterNumber__numerationFrom0: number;
          endingCharacterNumber__numerationFrom1?: undefined;
          charactersCount?: undefined;
          untilEnd?: undefined;
        } |
        {
          endingCharacterNumber__numerationFrom1: number;
          endingCharacterNumber__numerationFrom0?: undefined;
          charactersCount?: undefined;
          untilEnd?: undefined;
        } |
        {
          charactersCount: number;
          endingCharacterNumber__numerationFrom0?: undefined;
          endingCharacterNumber__numerationFrom1?: undefined;
          untilEnd?: undefined;
        } |
        {
          untilEnd: true;
          endingCharacterNumber__numerationFrom0?: undefined;
          endingCharacterNumber__numerationFrom1?: undefined;
          charactersCount?: undefined;
        }
      ) &
      { mustThrowErrorIfSpecifiedCharactersNumbersIsOutOfRange: boolean; }
): string {

  const targetString: string = compoundParameter.targetString;
  let startingCharacterNumber__numerationFrom0: number;

  if (isNonNegativeInteger(compoundParameter.startingCharacterNumber__numerationFrom0)) {
    startingCharacterNumber__numerationFrom0 = compoundParameter.startingCharacterNumber__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.startingCharacterNumber__numerationFrom1)) {
    startingCharacterNumber__numerationFrom0 = compoundParameter.startingCharacterNumber__numerationFrom1 - 1;
  } else if (compoundParameter.fromStart === true) {
    startingCharacterNumber__numerationFrom0 = 0;
  } else {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "It has been incorrectly specified from which character target string must be cropped. " +
            "The valid alternatives are:\n" +
            "● \"startingCharacterNumber__numerationFrom0\": must be the the positive integer\n" +
            "● \"startingCharacterNumber__numerationFrom1\": must be the the natual number\n" +
            "● \"fromStart\": must be the boolean herewith \"true\" only"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropString(compoundParameter)"
    });
  }


  let endingCharacterNumber__numerationFrom1: number;

  if (isNonNegativeInteger(compoundParameter.endingCharacterNumber__numerationFrom0)) {
    endingCharacterNumber__numerationFrom1 = compoundParameter.endingCharacterNumber__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.endingCharacterNumber__numerationFrom1)) {
    endingCharacterNumber__numerationFrom1 = compoundParameter.endingCharacterNumber__numerationFrom1 - 1;
  } else if (isNaturalNumber(compoundParameter.charactersCount)) {
    endingCharacterNumber__numerationFrom1 = startingCharacterNumber__numerationFrom0 + compoundParameter.charactersCount;
  } else if (compoundParameter.untilEnd === true) {
    endingCharacterNumber__numerationFrom1 = targetString.length;
  } else {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "It has been incorrectly specified until which character target string must be cropped. " +
            "The valid alternatives are:\n" +
            "● \"endingCharacterNumber__numerationFrom0\": must be the positive integer\n" +
            "● \"endingCharacterNumber__numerationFrom1\": must be the natual number\n" +
            "● \"charactersCount\": must be the natual number\n" +
            "● \"untilEnd\": must be the boolean herewith \"true\" only\n"

      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropString(compoundParameter)"
    });
  }


  if (
    endingCharacterNumber__numerationFrom1 > targetString.length &&
        compoundParameter.mustThrowErrorIfSpecifiedCharactersNumbersIsOutOfRange
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            `The specified last character number is ${ endingCharacterNumber__numerationFrom1 } (numeration from 0) while ` +
              `the target string has only ${ targetString.length } elements.` +
            "The error has been thrown because the \"mustThrowErrorIfSpecifiedCharactersNumbersIsOutOfRange\" option " +
              "has been set to \"true\"."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "cropString(compoundParameter)"
    });
  }

  /* [ Theory ] Such method is more safe that `String.prototype.substring` because of the UTF-16 surrogate paris. */
  return Array.from(targetString).
      slice(startingCharacterNumber__numerationFrom0, endingCharacterNumber__numerationFrom1 + 1).
      join("");

}

import getRandomString from "../RandomValuesGenerators/getRandomString/getRandomString";
import cropString from "./cropString";
import isFunctionLike from "../TypeGuards/isFunctionLike";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace StringCharactersCountAdjusting {

  export type SourceDataAndOptions = Readonly<{
    targetString: string;
    minimalCharactersCount: number;
    maximalCharactersCount: number;
    filling: Readonly<{
      toStart?: boolean;
      toEnd?: boolean;
      customFiller?: CustomFiller;
      allowedCharacters?: Readonly<{
        latinUppercase?: boolean;
        latinLowercase?: boolean;
        digits?: boolean;
        other?: ReadonlyArray<string> | string;
      }>;
    }>;
    cropping: Readonly<{
      fromStart?: boolean;
      fromEnd?: boolean;
      customCropper?: CustomCropper;
    }>;
  }>;


  /* ━━━ Custom Filler ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type CustomFiller = (compoundParameters: CustomFiller.SourceDataAndOptions) => string;

  export namespace CustomFiller {

    /* eslint-disable-next-line @typescript-eslint/no-shadow --
    * Valid TypeScript. No problems while refer to each `SourceDataAndOptions` by fully qualified name. */
    export type SourceDataAndOptions =
        Pick<
          StringCharactersCountAdjusting.SourceDataAndOptions,
              "targetString" |
              "minimalCharactersCount" |
              "maximalCharactersCount"
        > &
        Readonly<{
          lackingCharactersCount: number;
        }>;

  }


  /* ━━━ Custom Trimmer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type CustomCropper = (compoundParameters: CustomTrimmer.SourceDataAndOptions) => string;

  export namespace CustomTrimmer {

    /* eslint-disable-next-line @typescript-eslint/no-shadow --
     * Valid TypeScript. No problems while refer to each `SourceDataAndOptions` by fully qualified name. */
    export type SourceDataAndOptions =
        Pick<
          StringCharactersCountAdjusting.SourceDataAndOptions,
              "targetString" |
              "minimalCharactersCount" |
              "maximalCharactersCount"
        > &
        Readonly<{
          exceedingCharactersCount: number;
        }>;

  }

}


export default function adjustCharactersCount(
  {
    targetString,
    minimalCharactersCount,
    maximalCharactersCount,
    filling,
    cropping
  }: StringCharactersCountAdjusting.SourceDataAndOptions
): string {

  if (minimalCharactersCount > maximalCharactersCount) {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceDataAndOptions",
        customMessage:
          `Specified minimal characters count (${ minimalCharactersCount }) if greater than maximal characters count ` +
            `(${ maximalCharactersCount }).`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "adjustCharactersCount(sourceDataAndOptions)"
    });

  }


  const actualCharactersCount: number = targetString.length;
  const lackingCharactersCount: number = minimalCharactersCount - actualCharactersCount;

  if (filling.toStart === true) {

    if (lackingCharactersCount > 0) {

      return getRandomString({
        fixedCharactersCount: lackingCharactersCount,
        allowedCharacters: filling.allowedCharacters
      }) + targetString;

    }

  } else if (filling.toEnd === true) {

    if (lackingCharactersCount > 0) {

      return targetString + getRandomString({
        fixedCharactersCount: lackingCharactersCount,
        allowedCharacters: filling.allowedCharacters
      });

    }

  } else if (isFunctionLike(filling.customFiller)) {

    if (lackingCharactersCount > 0) {

      return filling.customFiller({
        targetString,
        minimalCharactersCount,
        maximalCharactersCount,
        lackingCharactersCount
      });

    }

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceDataAndOptions",
        customMessage:
            "It has not been specified now to fill the string when it has not enough characters. " +
            "The valid alternatives are:\n" +
            "● \"filling.toStart\": must be the boolean herewith \"true\" only\"\n" +
            "● \"filling.toEnd\": must be the boolean herewith \"true\" only\"\n" +
            "● \"filling.customFiller\": must be the function with parameter of " +
                "\"StringCharactersCountAdjusting.CustomFiller.SourceDataAndOptions\" type"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "adjustCharactersCount(sourceDataAndOptions)"
    });

  }


  const exceedingCharactersCount: number = actualCharactersCount - maximalCharactersCount;

  if (cropping.fromStart === true) {

    if (exceedingCharactersCount > 0) {

      return cropString({
        targetString,
        startingCharacterNumber__numerationFrom0: exceedingCharactersCount,
        untilEnd: true,
        mustThrowErrorIfSpecifiedCharactersNumbersIsOutOfRange: true
      });

    }

  } else if (cropping.fromEnd === true) {

    if (exceedingCharactersCount > 0) {

      return cropString({
        targetString,
        fromStart: true,
        endingCharacterNumber__numerationFrom1: maximalCharactersCount,
        mustThrowErrorIfSpecifiedCharactersNumbersIsOutOfRange: true
      });

    }

  } else if (isFunctionLike(cropping.customCropper)) {

    if (exceedingCharactersCount > 0) {

      return cropping.customCropper({
        targetString,
        minimalCharactersCount,
        maximalCharactersCount,
        exceedingCharactersCount
      });

    }

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceDataAndOptions",
        customMessage:
          "It has not been specified now to crop the string when it has more characters than required. " +
          "The valid alternatives are:\n" +
          "● \"filling.fromStart\": must be the boolean herewith \"true\" only\"\n" +
          "● \"filling.fromEnd\": must be the boolean herewith \"true\" only\"\n" +
          "● \"filling.customTrimmer\": must be the function with parameter of " +
            "\"StringCharactersCountAdjusting.CustomTrimmer.SourceDataAndOptions\" type"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "adjustCharactersCount(sourceDataAndOptions)"
    });

  }


  return targetString;

}

import lowercaseLatinCharacters from "../../Strings/CharactersAssets/lowercaseLatinCharacters";
import uppercaseLatinCharacters from "../../Strings/CharactersAssets/uppercaseLatinCharacters";
import stringifiedDigits from "../../Strings/CharactersAssets/stringifiedDigits";

import isString from "../../TypeGuards/Strings/isString";
import isUndefined from "../../TypeGuards/EmptyTypes/isUndefined";
import isNotUndefined from "../../TypeGuards/EmptyTypes/isNotUndefined";
import undefinedToEmptyString from "../../ValueTransformers/undefinedToEmptyString";
import substituteWhenUndefined from "../../DefaultValueSubstituters/substituteWhenUndefined";
import getRandomInteger from "../getRandomInteger";
import getRandomArrayElement from "../getRandomArrayElement";

import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";
import IncompatiblePropertiesInObjectTypeParameterError from
    "../../Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";

import GetRandomStringOperationLocalization__English from "./GetRandomStringOperationLocalization__English";


export class RandomStringsGenerator {

  public static localization: RandomStringsGenerator.Localization = GetRandomStringOperationLocalization__English;

  private static readonly DEFAULT_MAXIMAL_TO_MINIMAL_CHARACTERS_COUNT_RATIO: number = 2;


  public static getRandomString(namedParameters: RandomStringsGenerator.ParametersObject): string {

    const prefix: string = undefinedToEmptyString(namedParameters.prefix);
    const infix: string = undefinedToEmptyString(namedParameters.infix);
    const postfix: string = undefinedToEmptyString(namedParameters.postfix);
    const prefixInfixAndPostfixTotalCharactersCount: number = prefix.length + infix.length + postfix.length;

    let randomlyGeneratedCharactersCount: number;


    if (isUndefined(namedParameters.fixedCharactersCount)) {

      const minimalCharactersCount: number = RandomStringsGenerator.getMinimalCharactersCount({
        prefixInfixAndPostfixTotalCharactersCount,
        minimalCharactersCount__explicitlySpecified: namedParameters.minimalCharactersCount,
        fixedCharactersCount__explicitlySpecified: namedParameters.fixedCharactersCount,
        minimalRandomlyGeneratedCharactersCount__explicitlySpecified: namedParameters.minimalRandomlyGeneratedCharactersCount
      });

      /* 〔 Theory 〕 As default, if user specified { prefix: "MOCK" } and  { minimalCharactersCount: 4 }, "getRandomString"
       *    could return "MOCK" only. */
      const minimalRandomlyGeneratedCharactersCount: number =
          prefixInfixAndPostfixTotalCharactersCount +
              substituteWhenUndefined(namedParameters.minimalRandomlyGeneratedCharactersCount, 0) <=
              minimalCharactersCount ?
                  minimalCharactersCount - prefixInfixAndPostfixTotalCharactersCount :
                  substituteWhenUndefined(namedParameters.minimalRandomlyGeneratedCharactersCount, 0);

      const maximalCharactersCount: number = RandomStringsGenerator.getMaximalCharactersCont({
        ...namedParameters,
        ...{ minimalCharactersCount, prefix, infix, postfix, minimalRandomlyGeneratedCharactersCount }
      });

      const maximalRandomlyGeneratedCharactersCount: number = maximalCharactersCount - prefixInfixAndPostfixTotalCharactersCount;

      randomlyGeneratedCharactersCount = getRandomInteger({
        minimalValue: minimalRandomlyGeneratedCharactersCount,
        maximalValue: maximalRandomlyGeneratedCharactersCount
      });

    } else {

      randomlyGeneratedCharactersCount = namedParameters.fixedCharactersCount -
          prefixInfixAndPostfixTotalCharactersCount -
          substituteWhenUndefined(namedParameters.minimalRandomlyGeneratedCharactersCount, 0);
    }


    let randomString: string = "";
    const characters: Array<string> = RandomStringsGenerator.
        getCharactersForRandomStringGeneration(namedParameters.allowedCharacters);

    for (
        let loopCounter: number = randomString.length;
        loopCounter < randomlyGeneratedCharactersCount;
        loopCounter++
    ) {
      randomString = `${ randomString }${ getRandomArrayElement(characters) }`;
    }

    if (infix.length > 0) {

      const randomStringSlicingPosition: number = getRandomInteger({
        minimalValue: 1, maximalValue: randomString.length - 2
      });

      const randomString__firstPart: string = randomString.slice(0, randomStringSlicingPosition);
      const randomString__secondPart: string = randomString.slice(randomStringSlicingPosition);

      randomString = `${ randomString__firstPart }${ infix }${ randomString__secondPart }`;
    }

    return `${ prefix }${ randomString }${ postfix }`;
  }

  public static setLocalization(localization: RandomStringsGenerator.Localization): void {
    RandomStringsGenerator.localization = localization;
  }


  private static getMinimalCharactersCount(
    {
      prefixInfixAndPostfixTotalCharactersCount,
      minimalCharactersCount__explicitlySpecified,
      fixedCharactersCount__explicitlySpecified,
      minimalRandomlyGeneratedCharactersCount__explicitlySpecified
    }: RandomStringsGenerator.MinimalCharactersCountComputing.NamedParameters
  ): number {

    if (isUndefined(minimalCharactersCount__explicitlySpecified)) {
      return prefixInfixAndPostfixTotalCharactersCount +
          substituteWhenUndefined(minimalRandomlyGeneratedCharactersCount__explicitlySpecified, 0);
    }


    if (isNotUndefined(fixedCharactersCount__explicitlySpecified)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new IncompatiblePropertiesInObjectTypeParameterError({
          parameterName: "parametersObject",
          conflictingPropertyName: "fixedCharactersCount__explicitlySpecified",
          incompatiblePropertiesNames: [ "minimalCharactersCount__explicitlySpecified" ]
        }),
        title: IncompatiblePropertiesInObjectTypeParameterError.localization.defaultTitle,
        occurrenceLocation: "getRandomString(parametersObject)"
      });
    }


    if (minimalCharactersCount__explicitlySpecified < 0) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "parametersObject.minimalCharactersCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.minimalCharactersCountMustBeGreaterThan0(
              minimalCharactersCount__explicitlySpecified
          )
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });
    }


    const actuallyRequiredMinimalCharactersCount: number = prefixInfixAndPostfixTotalCharactersCount +
        substituteWhenUndefined(minimalRandomlyGeneratedCharactersCount__explicitlySpecified, 0);


    return minimalCharactersCount__explicitlySpecified >= actuallyRequiredMinimalCharactersCount ?
        minimalCharactersCount__explicitlySpecified : actuallyRequiredMinimalCharactersCount;
  }

  private static getMaximalCharactersCont(
    namedParameters: RandomStringsGenerator.MaximalCharactersCountComputing.ParametersObject
  ): number {

    if (isUndefined(namedParameters.maximalCharactersCount)) {
      return RandomStringsGenerator.DEFAULT_MAXIMAL_TO_MINIMAL_CHARACTERS_COUNT_RATIO * namedParameters.minimalCharactersCount;
    }

    if (isNotUndefined(namedParameters.fixedCharactersCount)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new IncompatiblePropertiesInObjectTypeParameterError({
          parameterName: "namedParameters",
          conflictingPropertyName: "fixedCharactersCount",
          incompatiblePropertiesNames: [ "maximalCharactersCount" ]
        }),
        title: IncompatiblePropertiesInObjectTypeParameterError.localization.defaultTitle,
        occurrenceLocation: "getRandomString(namedParameters)"
      });
    }

    const maximalCharactersCount: number = namedParameters.maximalCharactersCount;

    if (
      namedParameters.prefix.length +
      namedParameters.infix.length +
      namedParameters.postfix.length +
      namedParameters.minimalRandomlyGeneratedCharactersCount >
      maximalCharactersCount
    ) {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "namedParameters.minimalCharactersCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.
              sumOfCharactersCountOfAffixesAndMinimalRandomlyGeneratedCharactersCountIsExceedsMaximalCharactersCount(
                namedParameters
              )
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(namedParameters)"
      });

    } else if (namedParameters.minimalCharactersCount > maximalCharactersCount) {

      /* [ Theory ] The case when the 'minimalCharactersCount' has been explicitly specified.  */
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "namedParameters.minimalCharactersCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.
              explicitlySpecifiedMinimalCharactersCountExceedsMaximalCharactersCount({
                minimalCharactersCount: namedParameters.minimalCharactersCount, maximalCharactersCount
              })
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(namedParameters)"
      });
    }

    return maximalCharactersCount;
  }

  private static getCharactersForRandomStringGeneration(
    allowedCharacters: RandomStringsGenerator.ParametersObject.AllowedCharacters = {
      latinUppercase: true,
      latinLowercase: true,
      digits: true
    }
  ): Array<string> {

    const charactersForRandomStringGeneration: Array<string> = [];

    if (allowedCharacters.latinUppercase === true) {
      charactersForRandomStringGeneration.push(...uppercaseLatinCharacters);
    }

    if (allowedCharacters.latinLowercase === true) {
      charactersForRandomStringGeneration.push(...lowercaseLatinCharacters);
    }

    if (allowedCharacters.digits === true) {
      charactersForRandomStringGeneration.push(...stringifiedDigits);
    }

    const otherCharacters: Array<string> = [];

    if (Array.isArray(allowedCharacters.other)) {
      for (const arrayElement__possiblyHasMoreThanOneCharacter of otherCharacters) {
        otherCharacters.push(...arrayElement__possiblyHasMoreThanOneCharacter.split(""));
      }
    } else if (isString(allowedCharacters.other)) {
      otherCharacters.push(...allowedCharacters.other.split(""));
    }

    charactersForRandomStringGeneration.push(...otherCharacters);

    if (charactersForRandomStringGeneration.length === 0) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.allowedCharacters",
          customMessage: RandomStringsGenerator.localization.errors.noAllowedCharactersForRandomGeneration
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });
    }

    return charactersForRandomStringGeneration;
  }
}


export namespace RandomStringsGenerator {

  export type ParametersObject = Readonly<{
    prefix?: string;
    infix?: string;
    postfix?: string;
    minimalRandomlyGeneratedCharactersCount?: number;
    fixedCharactersCount?: number;
    minimalCharactersCount?: number;
    maximalCharactersCount?: number;
    allowedCharacters?: ParametersObject.AllowedCharacters;
  }>;

  export namespace ParametersObject {

    export type AllowedCharacters = Readonly<{
      latinUppercase?: boolean;
      latinLowercase?: boolean;
      digits?: boolean;
      other?: ReadonlyArray<string> | string;
    }>;
  }

  export namespace MinimalCharactersCountComputing {
    export type NamedParameters = Readonly<{
      prefixInfixAndPostfixTotalCharactersCount: number;
      minimalCharactersCount__explicitlySpecified?: number;
      fixedCharactersCount__explicitlySpecified?: number;
      minimalRandomlyGeneratedCharactersCount__explicitlySpecified?: number;
    }>;
  }

  export namespace MaximalCharactersCountComputing {
    export type ParametersObject =
        RandomStringsGenerator.ParametersObject &
        Readonly<{
          minimalCharactersCount: number;
          prefix: string;
          infix: string;
          postfix: string;
          minimalRandomlyGeneratedCharactersCount: number;
        }>;
  }

  export type Localization = Readonly<{
    errors: Readonly<{
      minimalCharactersCountMustBeGreaterThan0: (actualValue: number) => string;
      sumOfCharactersCountOfAffixesAndMinimalRandomlyGeneratedCharactersCountIsExceedsMaximalCharactersCount: (
        namedParameters: MaximalCharactersCountComputing.ParametersObject
      ) => string;
      explicitlySpecifiedMinimalCharactersCountExceedsMaximalCharactersCount: (
        namedParameters: Readonly<{ minimalCharactersCount: number; maximalCharactersCount: number; }>
      ) => string;
      noAllowedCharactersForRandomGeneration: string;
    }>;
  }>;
}


export default RandomStringsGenerator.getRandomString;

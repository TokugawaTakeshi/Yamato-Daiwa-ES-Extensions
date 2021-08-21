import { latinSymbols__lowercase, latinSymbols__uppercase, stringifiedDigits } from "../../Strings/CharactersAssets";

import isString from "../../TypeGuards/Strings/isString";
import isUndefined from "../../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../../TypeGuards/Nullables/isNotUndefined";
import undefinedToEmptyString from "../../ValueTransformers/undefinedToEmptyString";
import substituteWhenUndefined from "../../DefaultValueSubstituters/substituteWhenUndefined";
import getRandomInteger from "../getRandomInteger";
import getRandomArrayElement from "../getRandomArrayElement";

import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";
import IncompatiblePropertiesInObjectTypeParameterError
  from "../../Logging/Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";

import GetRandomStringOperationLocalization__English from "./GetRandomStringOperationLocalization__English";


export class RandomStringsGenerator {

  private static localization: RandomStringsGenerator.Localization = GetRandomStringOperationLocalization__English;

  private static readonly DEFAULT_MAXIMAL_TO_MINIMAL_SYMBOLS_COUNT_RATIO: number = 2;


  public static getRandomString(parametersObject: RandomStringsGenerator.ParametersObject): string {

    const prefix: string = undefinedToEmptyString(parametersObject.prefix);
    const infix: string = undefinedToEmptyString(parametersObject.infix);
    const postfix: string = undefinedToEmptyString(parametersObject.postfix);
    const prefixInfixAndPostfixTotalSymbolsCount: number = prefix.length + infix.length + postfix.length;

    let randomlyGeneratedSymbolsCount: number;


    if (isUndefined(parametersObject.fixedSymbolsCount)) {

      const minimalSymbolsCount: number = RandomStringsGenerator.getMinimalSymbolsCount({
        prefixInfixAndPostfixTotalSymbolsCount,
        minimalSymbolsCount__explicitlySpecified: parametersObject.minimalSymbolsCount,
        fixedSymbolsCount__explicitlySpecified: parametersObject.fixedSymbolsCount,
        minimalRandomlyGeneratedSymbolsCount__explicitlySpecified: parametersObject.minimalRandomlyGeneratedSymbolsCount
      });

      /* 〔 Theory 〕 As default, if user specified { prefix: "MOCK" } and  { minimalSymbolsCount: 4 }, "getRandomString"
       *    could return "MOCK" only. */
      const minimalRandomlyGeneratedSymbolsCount: number =
          prefixInfixAndPostfixTotalSymbolsCount +
              substituteWhenUndefined(parametersObject.minimalRandomlyGeneratedSymbolsCount, 0) <=
              minimalSymbolsCount ?
                  minimalSymbolsCount - prefixInfixAndPostfixTotalSymbolsCount :
                  substituteWhenUndefined(parametersObject.minimalRandomlyGeneratedSymbolsCount, 0);

      const maximalSymbolsCount: number = RandomStringsGenerator.getMaximalSymbolsCont({
        ...parametersObject,
        ...{ minimalSymbolsCount, prefix, infix, postfix, minimalRandomlyGeneratedSymbolsCount }
      });

      const maximalRandomlyGeneratedSymbolsCount: number = maximalSymbolsCount - prefixInfixAndPostfixTotalSymbolsCount;

      randomlyGeneratedSymbolsCount = getRandomInteger({
        minimalValue: minimalRandomlyGeneratedSymbolsCount,
        maximalValue: maximalRandomlyGeneratedSymbolsCount
      });

    } else {

      randomlyGeneratedSymbolsCount = parametersObject.fixedSymbolsCount -
          prefixInfixAndPostfixTotalSymbolsCount -
          substituteWhenUndefined(parametersObject.minimalRandomlyGeneratedSymbolsCount, 0);
    }


    let randomString: string = "";
    const characters: Array<string> = RandomStringsGenerator.
        getCharactersForRandomStringGeneration(parametersObject.allowedSymbols);

    for (
        let loopCounter: number = randomString.length;
        loopCounter < randomlyGeneratedSymbolsCount;
        loopCounter++
    ) {
      randomString = `${randomString}${getRandomArrayElement(characters)}`;
    }

    if (infix.length > 0) {

      const randomStringSlicingPosition: number = getRandomInteger({
        minimalValue: 1, maximalValue: randomString.length - 2
      });

      const randomString__firstPart: string = randomString.slice(0, randomStringSlicingPosition);
      const randomString__secondPart: string = randomString.slice(randomStringSlicingPosition);

      randomString = `${randomString__firstPart}${infix}${randomString__secondPart}`;
    }

    return `${prefix}${randomString}${postfix}`;
  }

  public static setLocalization(localization: RandomStringsGenerator.Localization): void {
    RandomStringsGenerator.localization = localization;
  }


  private static getMinimalSymbolsCount(
    {
      prefixInfixAndPostfixTotalSymbolsCount,
      minimalSymbolsCount__explicitlySpecified,
      fixedSymbolsCount__explicitlySpecified,
      minimalRandomlyGeneratedSymbolsCount__explicitlySpecified
    }: RandomStringsGenerator.MinimalSymbolsCountComputing.ParametersObject
  ): number {

    if (isUndefined(minimalSymbolsCount__explicitlySpecified)) {
      return prefixInfixAndPostfixTotalSymbolsCount +
          substituteWhenUndefined(minimalRandomlyGeneratedSymbolsCount__explicitlySpecified, 0);
    }


    if (isNotUndefined(fixedSymbolsCount__explicitlySpecified)) {
      Logger.throwErrorAndLog({
        errorInstance: new IncompatiblePropertiesInObjectTypeParameterError({
          parameterName: "parametersObject",
          conflictingPropertyName: "fixedSymbolsCount__explicitlySpecified",
          incompatiblePropertiesNames: [ "minimalSymbolsCount__explicitlySpecified" ]
        }),
        title: IncompatiblePropertiesInObjectTypeParameterError.DEFAULT_TITLE,
        occurrenceLocation: "getRandomString(parametersObject)"
      });
    }


    if (minimalSymbolsCount__explicitlySpecified < 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.minimalSymbolsCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.minimalSymbolsCountMustBeGreaterThan0(
              minimalSymbolsCount__explicitlySpecified
          )
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });
    }


    const actuallyRequiredMinimalSymbolsCount: number = prefixInfixAndPostfixTotalSymbolsCount +
        substituteWhenUndefined(minimalRandomlyGeneratedSymbolsCount__explicitlySpecified, 0);


    return minimalSymbolsCount__explicitlySpecified >= actuallyRequiredMinimalSymbolsCount ?
        minimalSymbolsCount__explicitlySpecified : actuallyRequiredMinimalSymbolsCount;
  }

  private static getMaximalSymbolsCont(
    parametersObject: RandomStringsGenerator.MaximalSymbolsCountComputing.ParametersObject
  ): number {

    if (isUndefined(parametersObject.maximalSymbolsCount)) {
      return RandomStringsGenerator.DEFAULT_MAXIMAL_TO_MINIMAL_SYMBOLS_COUNT_RATIO * parametersObject.minimalSymbolsCount;
    }

    if (isNotUndefined(parametersObject.fixedSymbolsCount)) {
      Logger.throwErrorAndLog({
        errorInstance: new IncompatiblePropertiesInObjectTypeParameterError({
          parameterName: "parametersObject",
          conflictingPropertyName: "fixedSymbolsCount",
          incompatiblePropertiesNames: [ "maximalSymbolsCount" ]
        }),
        title: IncompatiblePropertiesInObjectTypeParameterError.DEFAULT_TITLE,
        occurrenceLocation: "getRandomString(parametersObject)"
      });
    }

    const maximalSymbolsCount: number = parametersObject.maximalSymbolsCount;

    if (
      parametersObject.prefix.length +
      parametersObject.infix.length +
      parametersObject.postfix.length +
      parametersObject.minimalRandomlyGeneratedSymbolsCount >
      maximalSymbolsCount
    ) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.minimalSymbolsCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.
            sumOfSymbolsCountOfAffixesAndMinimalRandomlyGeneratedSymbolsCountIsExceedsMaximalSymbolsCount(parametersObject)
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });

    } else if (parametersObject.minimalSymbolsCount > maximalSymbolsCount) {
      /* [ Theory ] The case when the 'minimalSymbolsCount' has been explicitly specified.  */
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.minimalSymbolsCount",
          messageSpecificPart: RandomStringsGenerator.localization.errors.
              explicitlySpecifiedMinimalSymbolsCountExceedsMaximalSymbolsCount({
                minimalSymbolsCount: parametersObject.minimalSymbolsCount, maximalSymbolsCount
              })
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });
    }

    return maximalSymbolsCount;
  }

  private static getCharactersForRandomStringGeneration(
    allowedSymbols: RandomStringsGenerator.ParametersObject.AllowedSymbols = {
      latinUppercase: true,
      latinLowercase: true,
      digits: true
    }
  ): Array<string> {

    const charactersForRandomStringGeneration: Array<string> = [];

    if (allowedSymbols.latinUppercase === true) {
      charactersForRandomStringGeneration.push(...latinSymbols__uppercase);
    }

    if (allowedSymbols.latinLowercase === true) {
      charactersForRandomStringGeneration.push(...latinSymbols__lowercase);
    }

    if (allowedSymbols.digits === true) {
      charactersForRandomStringGeneration.push(...stringifiedDigits);
    }

    const otherSymbols: Array<string> = [];

    if (Array.isArray(allowedSymbols.other)) {
      for (const arrayElement__possiblyHasMoreThanOneCharacter of otherSymbols) {
        otherSymbols.push(...arrayElement__possiblyHasMoreThanOneCharacter.split(""));
      }
    } else if (isString(allowedSymbols.other)) {
      otherSymbols.push(...allowedSymbols.other.split(""));
    }

    charactersForRandomStringGeneration.push(...otherSymbols);

    if (charactersForRandomStringGeneration.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject.allowedSymbols",
          customMessage: RandomStringsGenerator.localization.errors.noAllowedSymbolsForRandomGeneration
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "RandomStringsGenerator.getRandomString(parametersObject)"
      });
    }

    return charactersForRandomStringGeneration;
  }
}


export namespace RandomStringsGenerator {

  export type ParametersObject = {
    prefix?: string;
    infix?: string;
    postfix?: string;
    minimalRandomlyGeneratedSymbolsCount?: number;
    fixedSymbolsCount?: number;
    minimalSymbolsCount?: number;
    maximalSymbolsCount?: number;
    allowedSymbols?: ParametersObject.AllowedSymbols;
  };

  export namespace ParametersObject {

    export type AllowedSymbols = {
      latinUppercase?: boolean;
      latinLowercase?: boolean;
      digits?: boolean;
      other?: Array<string> | string;
    };
  }

  export namespace MinimalSymbolsCountComputing {
    export type ParametersObject = {
      prefixInfixAndPostfixTotalSymbolsCount: number;
      minimalSymbolsCount__explicitlySpecified?: number;
      fixedSymbolsCount__explicitlySpecified?: number;
      minimalRandomlyGeneratedSymbolsCount__explicitlySpecified?: number;
    };
  }

  export namespace MaximalSymbolsCountComputing {
    export type ParametersObject =
        RandomStringsGenerator.ParametersObject &
        {
          minimalSymbolsCount: number;
          prefix: string;
          infix: string;
          postfix: string;
          minimalRandomlyGeneratedSymbolsCount: number;
        };
  }

  export type Localization = {
    errors: {
      minimalSymbolsCountMustBeGreaterThan0: (realValue: number) => string;
      sumOfSymbolsCountOfAffixesAndMinimalRandomlyGeneratedSymbolsCountIsExceedsMaximalSymbolsCount: (
        parametersObject: MaximalSymbolsCountComputing.ParametersObject
      ) => string;
      explicitlySpecifiedMinimalSymbolsCountExceedsMaximalSymbolsCount: (
        parametersObject: { minimalSymbolsCount: number; maximalSymbolsCount: number; }
      ) => string;
      noAllowedSymbolsForRandomGeneration: string;
    };
  };
}


export default RandomStringsGenerator.getRandomString;

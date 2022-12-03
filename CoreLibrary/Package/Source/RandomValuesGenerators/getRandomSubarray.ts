import getRandomInteger from "./getRandomInteger";
import getRandomArrayElement from "./getRandomArrayElement";
import removeRandomArrayElement from "./removeRandomArrayElement";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace GetRandomSubarrayOperation {

  export type Localization = Readonly<{
    generateInvalidMinimalElementsCountErrorMessage: (namedParameters: Readonly<{ actualValue: number; }>) => string;
    generateInvalidMaximalElementsCountErrorMessage: (namedParameters: Readonly<{ actualValue: number; }>) => string;
    generateMaximalElementCountIsSmallerThanMinimal:
        (namedParameters: Readonly<{ minimalElementsCount: number; maximalElementsCount: number; }>) => string;
  }>;

  export const Localization__English: Localization = {
    generateInvalidMinimalElementsCountErrorMessage: ({ actualValue }: { actualValue: number; }): string =>
        `The minimal elements count must the non-negative integer while it's actual value is ${ actualValue }.`,
    generateInvalidMaximalElementsCountErrorMessage: ({ actualValue }: { actualValue: number; }): string =>
        `The maximal elements count must the non-negative integer while it's actual value is ${ actualValue }.`,
    generateMaximalElementCountIsSmallerThanMinimal: (
      { minimalElementsCount, maximalElementsCount }: { minimalElementsCount: number; maximalElementsCount: number; }
    ): string => `The maximal elements count (${ maximalElementsCount }) is smaller than minimal elements count ` +
        `(${ minimalElementsCount }).`
  };

  export let localization: Localization = Localization__English;

  export function setLocalization(newLocalization: Localization): void {
    localization = newLocalization;
  }

}

export default function getRandomSubarray<ArrayElement>(
  targetArray: Array<ArrayElement>,
  options: { minimalElementsCount?: number; maximalElementsCount?: number; } = {}
): Array<ArrayElement> {

  let minimalElementsCount: number;

  if (isNotUndefined(options.minimalElementsCount)) {

    if (!Number.isInteger(options.minimalElementsCount)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.minimalElementsCount",
          messageSpecificPart: GetRandomSubarrayOperation.localization.
              generateInvalidMinimalElementsCountErrorMessage({ actualValue: options.minimalElementsCount })
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }


    if (options.minimalElementsCount < 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.minimalElementsCount",
          messageSpecificPart: GetRandomSubarrayOperation.localization.
              generateInvalidMinimalElementsCountErrorMessage({ actualValue: options.minimalElementsCount })
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }

    if (options.minimalElementsCount >= targetArray.length) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.minimalElementsCount",
          messageSpecificPart: "The minimal element's count of subarray must be less than elements count of initial array."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }

    minimalElementsCount = options.minimalElementsCount;

  } else {

    minimalElementsCount = 1;

  }

  let maximalElementsCount: number;

  if (isNotUndefined(options.maximalElementsCount)) {

    if (!Number.isInteger(options.maximalElementsCount)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.maximalElementsCount",
          messageSpecificPart: GetRandomSubarrayOperation.localization.
              generateInvalidMaximalElementsCountErrorMessage({ actualValue: options.maximalElementsCount })
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }


    if (options.maximalElementsCount < minimalElementsCount) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.minimalElementsCount",
          messageSpecificPart: GetRandomSubarrayOperation.localization.generateMaximalElementCountIsSmallerThanMinimal({
            minimalElementsCount, maximalElementsCount: options.maximalElementsCount
          })
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }

    if (options.maximalElementsCount > targetArray.length) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "options.maximalElementsCount",
          messageSpecificPart: "The maximal elements count of subarray could not exceed the elements count of initial array."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "getRandomSubarray(targetArray, options)"
      });
    }

    maximalElementsCount = options.maximalElementsCount;

  } else {

    maximalElementsCount = targetArray.length > 1 ? targetArray.length - 1 : 1;

  }

  const elementsCountInResultSubarray: number = getRandomInteger({
    minimalValue: minimalElementsCount,
    maximalValue: maximalElementsCount
  });

  if (elementsCountInResultSubarray === 1) {
    return [ getRandomArrayElement(targetArray) ];
  }


  const targetArrayCopy: Array<ArrayElement> = Array.from(targetArray);
  const resultSubarray: Array<ArrayElement> = [];

  for (let loopCounter: number = 0; loopCounter < elementsCountInResultSubarray; loopCounter++) {
    resultSubarray.push(removeRandomArrayElement(targetArrayCopy));
  }

  return resultSubarray;

}

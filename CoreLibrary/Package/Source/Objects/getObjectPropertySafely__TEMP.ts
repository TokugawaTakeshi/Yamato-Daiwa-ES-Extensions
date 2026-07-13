import type { ArbitraryObject } from "../Types/ArbitraryObject";

import splitString from "../Strings/splitString";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";

import isNonEmptyString from "../TypeGuards/Strings/isNonEmptyString";
import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";
import isNaturalNumberOrZero from "../TypeGuards/Numbers/isNaturalNumberOrZero";


/**
 * @description
 * Temporary upgraded function for fixed `RawObjectDataProcessor`.
 * ● Must not be exposed.
 * ● The function of this body will moved to `getObjectPropertySafely.ts` in v.1.9
 * */
export default function getObjectPropertySafely(
  targetObject: unknown,
  dotSeparatedOrArrayedPathToTargetProperty: ReadonlyArray<string | number> | string | number
): unknown {

  /* [ Theory ] Arrays will pass this check. */
  if (!isArbitraryObject(targetObject)) {
    return;
  }


  let targetPropertyPathSegments: Array<string | number>;

  if (
    Array.isArray(dotSeparatedOrArrayedPathToTargetProperty) &&
        dotSeparatedOrArrayedPathToTargetProperty.length > 0 &&
        dotSeparatedOrArrayedPathToTargetProperty.
            every((key: unknown): boolean => isNonEmptyString(key) || isNaturalNumberOrZero(key))
  ) {

    targetPropertyPathSegments = dotSeparatedOrArrayedPathToTargetProperty;

  } else if (isNaturalNumberOrZero(dotSeparatedOrArrayedPathToTargetProperty)) {

    targetPropertyPathSegments = [ String(dotSeparatedOrArrayedPathToTargetProperty) ];

  } else if (isNonEmptyString(dotSeparatedOrArrayedPathToTargetProperty)) {

    targetPropertyPathSegments = splitString(dotSeparatedOrArrayedPathToTargetProperty, ".");

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance:
          new InvalidParameterValueError({
            parameterNumber: 2,
            parameterName: "dotSeparatedOrArrayedPathToTargetProperty",
            messageSpecificPart:
                "This parameter must be either a non-empty string, or a non-negative integer, or a non-empty array " +
                  "of strings and/or non-negative integers."
          }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getObjectPropertySafely(targetObject, dotSeparatedOrArrayedPathToTargetProperty)"
    });

    return;

  }


  let objectOfCurrentDepthLevel: ArbitraryObject = targetObject;

  for (
    let depthLevel__numerationFrom1: number = 1;
    depthLevel__numerationFrom1 <= targetPropertyPathSegments.length;
    depthLevel__numerationFrom1++
  ) {

    const isLastDepthLevel: boolean = depthLevel__numerationFrom1 === targetPropertyPathSegments.length;
    const valueOfCurrentDepthLevel: unknown =
        objectOfCurrentDepthLevel[targetPropertyPathSegments[depthLevel__numerationFrom1 - 1]];

    if (isLastDepthLevel) {

      return valueOfCurrentDepthLevel;

    } else if (isArbitraryObject(valueOfCurrentDepthLevel)) {

      objectOfCurrentDepthLevel = valueOfCurrentDepthLevel;

    } else {

      return;

    }

  }


  /* eslint-disable-next-line no-useless-return --
  * TypeScript assumes that in the above loop it may be 0 iterations, while the `targetPropertyPathSegments`
  *  cannot be an empty array with current validation of `dotSeparatedOrArrayedPathToTargetProperty`. */
  return;

}

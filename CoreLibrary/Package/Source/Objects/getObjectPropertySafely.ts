import type { ArbitraryObject } from "../Types/ArbitraryObject";

import splitString from "../Strings/splitString";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";

import isNonEmptyString from "../TypeGuards/Strings/isNonEmptyString";
import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";


export default function getObjectPropertySafely(
  targetObject: unknown,
  dotSeparatedOrArrayedPathToTargetProperty: ReadonlyArray<string> | string
): unknown {

  if (
    !isNonEmptyString(dotSeparatedOrArrayedPathToTargetProperty) &&
    (
      !Array.isArray(dotSeparatedOrArrayedPathToTargetProperty) ||
      dotSeparatedOrArrayedPathToTargetProperty.some((key: string): boolean => !isNonEmptyString(key))
    )
  ) {

    Logger.logError({
      errorType: InvalidParameterValueError.NAME,
      title: InvalidParameterValueError.localization.defaultTitle,
      description: InvalidParameterValueError.localization.generateDescription({
        parameterNumber: 2,
        parameterName: "dotSeparatedOrArrayedPathToTargetProperty",
        messageSpecificPart: "This parameter must be either non-empty string or array of non-empty strings."
      }),
      occurrenceLocation: "getObjectPropertySafely(targetObject, dotSeparatedOrArrayedPathToTargetProperty)"
    });

    return;

  }


  if (!isArbitraryObject(targetObject)) {
    return;
  }


  let targetPropertyPathSegments: Array<string>;

  if (Array.isArray(dotSeparatedOrArrayedPathToTargetProperty)) {
    targetPropertyPathSegments = dotSeparatedOrArrayedPathToTargetProperty;
  } else {
    targetPropertyPathSegments = splitString(dotSeparatedOrArrayedPathToTargetProperty, ".");
  }

  if (targetPropertyPathSegments.length === 0) {
    return;
  }


  let objectOfCurrentDepthLevel: ArbitraryObject = targetObject;

  for (let depthLevel: number = 1; depthLevel <= targetPropertyPathSegments.length; depthLevel++) {

    const isLastDepthLevel: boolean = depthLevel === targetPropertyPathSegments.length;
    const valueOfNextDepthLevel: unknown = objectOfCurrentDepthLevel[targetPropertyPathSegments[depthLevel - 1]];

    if (isLastDepthLevel) {
      return valueOfNextDepthLevel;
    } else if (isArbitraryObject(valueOfNextDepthLevel)) {
      objectOfCurrentDepthLevel = valueOfNextDepthLevel;
    } else {
      return;
    }

  }


  /* eslint-disable no-useless-return --
  * TypeScript could not see that this function will return value once `isLastDepthLevel` become truthy.
  * If no bugs, `isLastDepthLevel` inevitably will become truthy because the requested property is in certain depth level. */
  return;

}

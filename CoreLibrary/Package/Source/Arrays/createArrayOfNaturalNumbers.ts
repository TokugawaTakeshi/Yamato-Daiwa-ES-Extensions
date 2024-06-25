import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";


export default function createArrayOfNaturalNumbers(
  options: Readonly<{
    elementsCount: number;
    startingNumber?: number;
    isDescendingOrder?: boolean;
  }>
): Array<number> {

  const {

    elementsCount,
    isDescendingOrder = false,

    /* eslint-disable-next-line no-nested-ternary, @stylistic/no-extra-parens --
    * Actually not so readable, but the expanded version will not be so element.  */
    startingNumber = isDescendingOrder ? (elementsCount === 0 ? 1 : elementsCount) : 1

  }: Parameters<typeof createArrayOfNaturalNumbers>["0"] = options;

  if (!isNonNegativeInteger(elementsCount)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "options",
        messageSpecificPart:
            `The "elementsCount" must be the positive integer while ${ String(elementsCount) } has been specified.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createArrayOfNaturalNumbers(elementsCount)"
    });
  }


  if (!isNaturalNumber(startingNumber)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "options",
        messageSpecificPart:
            `The "startingNumber" must the natural number while ${ String(elementsCount) } has been specified.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createArrayOfNaturalNumbers(elementsCount)"
    });
  }


  if (isDescendingOrder && startingNumber < elementsCount) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "options",
        messageSpecificPart:
            `The specified "startingNumber" ${ startingNumber } is smaller than requested ${ elementsCount }. ` +
            "The monotonically decreasing array of natual number could not be created with such conditions."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createArrayOfNaturalNumbers(elementsCount)"
    });
  }


  return Array.from(new Array(elementsCount).keys()).
      map(
        (elementAsIndex: number): number =>
            startingNumber + (isDescendingOrder ? -elementAsIndex : elementAsIndex)
      );

}

import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function createArrayOfNaturalNumbers(
  {

    elementsCount,
    isDescendingOrder = false,

    /* eslint-disable-next-line no-nested-ternary, @stylistic/no-extra-parens --
     * The expanded version will require to make the `startingNumber` the let-variable what is undesirable for parameters. */
    startingNumber = isDescendingOrder ? (elementsCount === 0 ? 1 : elementsCount) : 1

  }: Readonly<{
    elementsCount: number;
    startingNumber?: number;
    isDescendingOrder?: boolean;
  }>
): Array<number> {

  if (!isNonNegativeInteger(elementsCount)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "options",
        messageSpecificPart:
            `The "elementsCount" must be the positive integer while ${ elementsCount } has been specified.`
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
            `The "startingNumber" must the natural number while ${ elementsCount } has been specified.`
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
            "The monotonically decreasing array of natural numbers could not be created with such conditions."
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

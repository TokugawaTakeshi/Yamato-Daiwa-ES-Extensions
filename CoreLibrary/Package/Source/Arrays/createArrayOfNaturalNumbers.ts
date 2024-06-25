import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";


export default function createArrayOfNaturalNumbers(elementsCount: number): Array<number> {

  if (!isNonNegativeInteger(elementsCount)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "elementsCount",
        messageSpecificPart:
            "The first and only parameter of \"createArrayOfNatuaclNumbers\" must be the natural number while actually " +
              `has value: ${ String(elementsCount) }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createArrayOfNaturalNumbers(elementsCount)"
    });
  }


  return Array.from(new Array(elementsCount).keys()).map((elementAsIndex: number): number => elementAsIndex + 1);

}

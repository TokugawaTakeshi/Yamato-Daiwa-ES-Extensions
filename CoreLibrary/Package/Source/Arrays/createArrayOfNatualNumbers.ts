import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function createArrayOfNatualNumbers(elementsCount: number): Array<number> {

  if (!isNaturalNumber(elementsCount)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "elementsCount",
        messageSpecificPart:
            "The first and only parameter of \"createArrayOfNatualNumbers\" must be the natural number while actually " +
              `has value: ${ String(elementsCount) }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createArrayOfNatualNumbers(elementsCount)"
    });
  }


  return Array.from(new Array(elementsCount).keys()).map((elementAsIndex: number): number => elementAsIndex + 1);

}

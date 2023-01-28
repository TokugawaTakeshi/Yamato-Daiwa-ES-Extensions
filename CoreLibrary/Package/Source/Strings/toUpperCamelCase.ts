import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";

import capitalizeFirstCharacter from "./capitalizeFirstCharacter";
import toLowerCamelCase from "./toLowerCamelCase";
import isString from "../TypeGuards/Strings/isString";


export default function toUpperCamelCase(targetString: string): string {

  if (!isString(targetString)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "targetString",
        customMessage: `The first and only parameter must be a string while actually is has type '${ typeof targetString }'.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "toUpperCamelCase(targetString)"
    });
  }


  return capitalizeFirstCharacter(toLowerCamelCase(targetString));
}

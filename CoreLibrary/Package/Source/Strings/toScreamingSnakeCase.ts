import explodeCasedPhraseToWords from "./explodeCasedPhraseToWords";
import isString from "../TypeGuards/Strings/isString";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function toScreamingSnakeCase(targetString: string): string {

  if (!isString(targetString)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "targetString",
        customMessage: `The first and only parameter must be a string while actually is has type '${ typeof targetString }'.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "toLowerCamelCase(targetString)"
    });
  }


  return explodeCasedPhraseToWords(targetString).
      map((word: string): string => word.toUpperCase()).
      join("_");

}

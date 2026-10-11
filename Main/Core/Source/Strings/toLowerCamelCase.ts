import isString from "../TypeGuards/Strings/isString";
import capitalizeFirstCharacter from "./capitalizeFirstCharacter";
import explodeCasedPhraseToWords from "./explodeCasedPhraseToWords";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function toLowerCamelCase(targetString: string): string {

  if (!isString(targetString)) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "targetString",
        customMessage: `The first and only parameter must be a string while actually is has type '${ typeof targetString }'.`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "toLowerCamelCase(targetString)"
    });
  }


  const words: Array<string> = explodeCasedPhraseToWords(targetString);
  let accumulatingResult: string = "";

  for (const [ index, word ] of words.entries()) {

    if (index === 0) {
      accumulatingResult = `${ accumulatingResult }${ word.toLowerCase() }`;
    } else {
      accumulatingResult = `${ accumulatingResult }${ capitalizeFirstCharacter(word.toLowerCase()) }`;
    }
  }

  return accumulatingResult;

}

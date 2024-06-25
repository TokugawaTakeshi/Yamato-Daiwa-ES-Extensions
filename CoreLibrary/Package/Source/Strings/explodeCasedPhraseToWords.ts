import isString from "../TypeGuards/Strings/isString";
import splitString from "./splitString";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNotNull from "../TypeGuards/Nullables/isNotNull";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function explodeCasedPhraseToWords(targetString: string): Array<string> {

  if (!isString(targetString)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "targetString",
        customMessage: `The first and only parameter must be a string while actually is has type "${ typeof targetString }".`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "explodeToWords(targetString)"
    });
  }


  const characters: ReadonlyArray<string> = splitString(targetString, "");
  const words: Array<string> = [];
  let currentWord: string = "";

  for (const [ index, currentCharacter ] of characters.entries()) {

    if (currentCharacter === " " || currentCharacter === "-" || currentCharacter === "_") {

      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = "";
      }

      continue;

    }


    if (!(/[a-zA-Z]/u).test(currentCharacter)) {
      words.push(currentWord);
      continue;
    }


    const isCurrentCharacterTheCapital: boolean = (/[A-Z]/u).test(currentCharacter);

    const previousCharacter: string | null = index > 1 ? characters[index - 1] : null;
    const isPreviousCharacterTheLowerCase: boolean = isNotNull(previousCharacter) ? (/[a-z]/u).test(previousCharacter) : false;

    /* Example
     *    ↓↓
     *  IAmATeapot */
    if (currentWord !== "" && isPreviousCharacterTheLowerCase && isCurrentCharacterTheCapital) {
      words.push(currentWord);
      currentWord = currentCharacter;
      continue;
    }


    const nextCharacter: string | undefined = characters[index + 1];
    const isNextCharacterTheLowerCase: boolean = isNotUndefined(nextCharacter) ? (/[a-z]/u).test(nextCharacter) : false;

    /* Example
     *     ↓↓
     *  HTMLContent */
    if (currentWord !== "" && isCurrentCharacterTheCapital && isNextCharacterTheLowerCase) {
      words.push(currentWord);
      currentWord = currentCharacter;
      continue;
    }

    currentWord = `${ currentWord }${ currentCharacter }`;

  }


  words.push(currentWord);

  return words;

}

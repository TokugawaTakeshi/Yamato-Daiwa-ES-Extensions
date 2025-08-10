import isString from "../TypeGuards/Strings/isString";
import splitString from "./splitString";
import addElementsToSet from "../Sets/addElementsToSet";
import lowercaseLatinCharacters from "./CharactersAssets/lowercaseLatinCharacters";
import uppercaseLatinCharacters from "./CharactersAssets/uppercaseLatinCharacters";
import stringifiedDigits from "./CharactersAssets/stringifiedDigits";


export default function hasStringOnlySpecificCharacters(
  targetString: string,
  characters: Array<string> | string | Readonly<{
    latinUppercase?: boolean;
    latinLowercase?: boolean;
    digits?: boolean;
    other?: Array<string> | string;
  }>
): boolean {

  const allowedCharactersSet: Set<string> = new Set<string>();

  if (Array.isArray(characters)) {

    for (const character of characters) {
      if (character.length === 1) {
        allowedCharactersSet.add(character);
      } else {
        addElementsToSet({ targetSet: allowedCharactersSet, newElements: splitString(character, "") });
      }
    }

  } else if (isString(characters)) {

    addElementsToSet({ targetSet: allowedCharactersSet, newElements: splitString(characters, "") });

  } else {

    if (characters.latinUppercase === true) {
      addElementsToSet({ targetSet: allowedCharactersSet, newElements: uppercaseLatinCharacters });
    }

    if (characters.latinLowercase === true) {
      addElementsToSet({ targetSet: allowedCharactersSet, newElements: lowercaseLatinCharacters });
    }

    if (characters.digits === true) {
      addElementsToSet({ targetSet: allowedCharactersSet, newElements: stringifiedDigits });
    }

    if (Array.isArray(characters.other)) {

      for (const characterOrMultipleOfThem of characters.other) {
        addElementsToSet({ targetSet: allowedCharactersSet, newElements: splitString(characterOrMultipleOfThem, "") });
      }

    } else if (isString(characters.other)) {
      addElementsToSet({ targetSet: allowedCharactersSet, newElements: splitString(characters.other, "") });
    }
  }

  for (const character of splitString(targetString, "")) {
    if (!allowedCharactersSet.has(character)) {
      return false;
    }
  }


  return true;
}

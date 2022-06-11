import addMultipleElementsToSet from "../Sets/addMultipleElementsToSet";
import splitString from "./splitString";
import isString from "../TypeGuards/Strings/isString";
import {
  latinCharacters__lowercase,
  latinCharacters__uppercase,
  stringifiedDigits
} from "./CharactersAssets";


export default function hasStringOnlySpecificCharacters(
  targetString: string, characters: Array<string> | string | {
    latinUppercase?: boolean;
    latinLowercase?: boolean;
    digits?: boolean;
    other?: Array<string> | string;
  }
): boolean {

  const allowedCharactersSet: Set<string> = new Set<string>();

  if (Array.isArray(characters)) {
    for (const character of characters) {
      if (character.length === 1) {
        allowedCharactersSet.add(character);
      } else {
        addMultipleElementsToSet(allowedCharactersSet, splitString(character, ""));
      }
    }
  } else if (isString(characters)) {
    addMultipleElementsToSet(allowedCharactersSet, splitString(characters, ""));
  } else {

    if (characters.latinUppercase === true) {
      addMultipleElementsToSet(allowedCharactersSet, latinCharacters__uppercase);
    }

    if (characters.latinLowercase === true) {
      addMultipleElementsToSet(allowedCharactersSet, latinCharacters__lowercase);
    }

    if (characters.digits === true) {
      addMultipleElementsToSet(allowedCharactersSet, stringifiedDigits);
    }

    if (Array.isArray(characters.other)) {

      for (const character of characters.other) {
        if (character.length === 1) {
          allowedCharactersSet.add(character);
        } else {
          addMultipleElementsToSet(allowedCharactersSet, splitString(character, ""));
        }
      }

    } else if (isString(characters.other)) {
      addMultipleElementsToSet(allowedCharactersSet, splitString(characters.other, ""));
    }
  }

  for (const character of splitString(targetString, "")) {
    if (!allowedCharactersSet.has(character)) {
      return false;
    }
  }


  return true;
}

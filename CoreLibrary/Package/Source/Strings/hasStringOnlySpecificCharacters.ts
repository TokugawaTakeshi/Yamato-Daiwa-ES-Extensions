import isString from "../TypeGuards/Strings/isString";
import splitString from "./splitString";
import addMultipleElementsToSet from "../Sets/addMultipleElementsToSet";
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
        addMultipleElementsToSet(allowedCharactersSet, splitString(character, ""));
      }
    }

  } else if (isString(characters)) {

    addMultipleElementsToSet(allowedCharactersSet, splitString(characters, ""));

  } else {

    if (characters.latinUppercase === true) {
      addMultipleElementsToSet(allowedCharactersSet, uppercaseLatinCharacters);
    }

    if (characters.latinLowercase === true) {
      addMultipleElementsToSet(allowedCharactersSet, lowercaseLatinCharacters);
    }

    if (characters.digits === true) {
      addMultipleElementsToSet(allowedCharactersSet, stringifiedDigits);
    }

    if (Array.isArray(characters.other)) {

      for (const characterOrMultipleOfThem of characters.other) {
        addMultipleElementsToSet(allowedCharactersSet, splitString(characterOrMultipleOfThem, ""));
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

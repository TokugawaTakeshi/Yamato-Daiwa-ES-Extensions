import uppercaseLatinCharacters from "../Strings/CharactersAssets/uppercaseLatinCharacters";
import lowercaseLatinCharacters from "../Strings/CharactersAssets/lowercaseLatinCharacters";

import getRandomBoolean from "./getRandomBoolean";
import getRandomArrayElement from "./getRandomArrayElement";


export default function getRandomLatinCharacter(
  {
    capital = false,
    lowercase = false
  }: {
    capital?: boolean;
    lowercase?: boolean;
  } = {}
): string {

  if (capital) {
    return getRandomArrayElement(uppercaseLatinCharacters);
  } else if (lowercase) {
    return getRandomArrayElement(lowercaseLatinCharacters);
  }


  return getRandomArrayElement(getRandomBoolean() ? uppercaseLatinCharacters : lowercaseLatinCharacters);
}

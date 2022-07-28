import latinCharacters__uppercase from "../Strings/CharactersAssets/latinCharacters__uppercase";
import latinCharacters__lowercase from "../Strings/CharactersAssets/latinCharacters__lowercase";

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
    return getRandomArrayElement(latinCharacters__uppercase);
  } else if (lowercase) {
    return getRandomArrayElement(latinCharacters__lowercase);
  }


  return getRandomArrayElement(getRandomBoolean() ? latinCharacters__uppercase : latinCharacters__lowercase);
}

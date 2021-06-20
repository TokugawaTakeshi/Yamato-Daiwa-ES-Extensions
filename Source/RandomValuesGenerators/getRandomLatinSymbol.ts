import getRandomInteger from "./getRandomInteger";
import getRandomBoolean from "./getRandomBoolean";


export default function getRandomLatinSymbol(
  {
    capital = false,
    lowercase = false
  }: {
    capital?: boolean;
    lowercase?: boolean;
  } = {}
): string {

  const latinSymbols: string = "abcdefghijklmnopqrstuvwxyz";
  const randomLatinSymbol: string = latinSymbols[getRandomInteger({
    minimalValue: 0,
    maximalValue: latinSymbols.length - 1
  })];

  if (capital) {
    return randomLatinSymbol.toUpperCase();
  } else if (lowercase) {
    return randomLatinSymbol;
  }

  return getRandomBoolean() ? randomLatinSymbol : randomLatinSymbol.toUpperCase();
}

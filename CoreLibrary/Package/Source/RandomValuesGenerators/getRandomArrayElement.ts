import getRandomInteger from "./getRandomInteger";


export default function getRandomArrayElement<ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): ArrayElement {
  return targetArray[getRandomInteger({
    minimalValue: 0,
    maximalValue: targetArray.length - 1
  })];
}

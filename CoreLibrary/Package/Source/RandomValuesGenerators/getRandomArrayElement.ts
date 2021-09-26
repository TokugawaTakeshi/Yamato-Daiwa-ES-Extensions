import getRandomInteger from "./getRandomInteger";


export default function getRandomArrayElement<ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement {
  return targetArray[getRandomInteger({
    minimalValue: 0,
    maximalValue: targetArray.length - 1
  })];
}

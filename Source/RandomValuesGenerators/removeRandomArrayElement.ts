import getRandomInteger from "./getRandomInteger";


export default function removeRandomArrayElement<ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement {

  const indexOfArrayElementWhichWillBeRemoved: number = getRandomInteger({
    minimalValue: 0,
    maximalValue: targetArray.length - 1
  });

  return targetArray.splice(indexOfArrayElementWhichWillBeRemoved, 1)[0];
}

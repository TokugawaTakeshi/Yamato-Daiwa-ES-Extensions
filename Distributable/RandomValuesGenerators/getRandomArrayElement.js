import getRandomInteger from "./getRandomInteger";
export default function getRandomArrayElement(targetArray) {
    return targetArray[getRandomInteger({
        minimalValue: 0,
        maximalValue: targetArray.length - 1
    })];
}

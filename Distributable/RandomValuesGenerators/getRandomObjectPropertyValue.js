import getRandomArrayElement from "./getRandomArrayElement";
export default function getRandomObjectPropertyValue(targetObject) {
    return getRandomArrayElement(Object.values(targetObject));
}

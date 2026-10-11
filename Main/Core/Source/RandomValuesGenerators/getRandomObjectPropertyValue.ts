import getRandomArrayElement from "./getRandomArrayElement";


export default function getRandomObjectPropertyValue<ObjectValue>(targetObject: { [ key: string ]: ObjectValue; }): ObjectValue {
  return getRandomArrayElement(Object.values(targetObject));
}

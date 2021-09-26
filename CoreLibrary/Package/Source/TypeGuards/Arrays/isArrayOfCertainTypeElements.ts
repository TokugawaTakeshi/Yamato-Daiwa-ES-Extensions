export default function isArrayOfCertainTypeElements<ArrayElementType>(
    potentialArray: unknown, elementTypeGuard: (element: unknown) => element is ArrayElementType
): potentialArray is Array<ArrayElementType> {

  if (!Array.isArray(potentialArray)) {
    return false;
  }

  for (const arrayElement of potentialArray) {
    if (!elementTypeGuard(arrayElement)) {
      return false;
    }
  }

  return true;
}

export default function getIndexOfArrayElementByPredicate<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): number | null {

  for (const [ index, element ] of targetArray.entries()) {
    if (predicate(element)) {
      return index;
    }
  }

  return null;
}

export default function getIndexesOfArrayElementsWhichSatisfiesThePredicate<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): Array<number> {

  const indexesOfElementsWhichSatisfiesToPredicate: Array<number> = [];

  targetArray.forEach((arrayElement: ArrayElement, index: number): void => {
    if (predicate(arrayElement)) {
      indexesOfElementsWhichSatisfiesToPredicate.push(index);
    }
  });

  return indexesOfElementsWhichSatisfiesToPredicate;
}

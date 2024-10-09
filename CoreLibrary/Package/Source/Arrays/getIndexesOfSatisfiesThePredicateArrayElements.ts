export default function getIndexesOfSatisfiesThePredicateArrayElements<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): Array<number> {
  return targetArray.flatMap(
    (arrayElement: ArrayElement, index: number): Array<number> | number =>
        (predicate(arrayElement) ? index : [])
  );
}

import removeArrayElementsByIndexes from "./removeArrayElementsByIndexes";
import getIndexesOfSatisfiesThePredicateArrayElements from
    "../02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements";


export namespace RemovingOfArrayElementsByPredicates {

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
    indexesOfRemovedElements: Array<number>;
  }>;

}


export default function removeArrayElementsByPredicates<ArrayElement>(
  {
    targetArray,
    mutably,
    ...sourceData
  }: Readonly<
    (
      {
        mutably: true;
        targetArray: Array<ArrayElement>;
      } |
      {
        mutably: false;
        targetArray: ReadonlyArray<ArrayElement>;
      }
    ) &
    (
      { predicate: (arrayElement: ArrayElement) => boolean; } |
      { predicates: ReadonlyArray<(arrayElement: ArrayElement) => boolean>; }
    )
  >
): RemovingOfArrayElementsByPredicates.Result<ArrayElement> {

  const indexesOfElementsWhichWillBeRemoved: Array<number> = [];

  for (
    const predicate of
    [ ..."predicates" in sourceData ? sourceData.predicates : [ sourceData.predicate ] ]
  ) {
    indexesOfElementsWhichWillBeRemoved.push(
      ...getIndexesOfSatisfiesThePredicateArrayElements(targetArray, predicate).
          filter((index: number): boolean => !indexesOfElementsWhichWillBeRemoved.includes(index))
    );
  }


  return {
    ...removeArrayElementsByIndexes({
      ...mutably ? {
        mutably: true,
        targetArray
      } : {
        mutably: false,
        targetArray
      },
      indexes: indexesOfElementsWhichWillBeRemoved
    }),
    indexesOfRemovedElements: indexesOfElementsWhichWillBeRemoved.
    sort((oneElement: number, otherElement: number): number => oneElement - otherElement)
  };

}

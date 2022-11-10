import removeArrayElementsByIndexes from "./removeArrayElementsByIndexes";
import getIndexesOfArrayElementsWhichSatisfiesThePredicate from "./getIndexesOfArrayElementsWhichSatisfiesThePredicate";


export namespace RemovingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> = Readonly<
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
  >;

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
    indexesOfRemovedElements: Array<number>;
  }>;

}


export default function removeArrayElementsByPredicates<ArrayElement>(
  namedParameters: RemovingArrayElementsByPredicatesOperation.NamedParameters<ArrayElement>
): RemovingArrayElementsByPredicatesOperation.Result<ArrayElement> {

  const {
    targetArray,
    mutably
  }: RemovingArrayElementsByPredicatesOperation.NamedParameters<ArrayElement> = namedParameters;

  const indexesOfElementsWhichWillBeRemoved: Array<number> = [];

  for (
    const predicate of
    [ ..."predicates" in namedParameters ? namedParameters.predicates : [ namedParameters.predicate ] ]
  ) {
    indexesOfElementsWhichWillBeRemoved.push(
      ...getIndexesOfArrayElementsWhichSatisfiesThePredicate(targetArray, predicate).
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

import removeArrayElementsByIndexes from "./removeArrayElementsByIndexes";
import getIndexesOfArrayElementsWhichSatisfiesThePredicate from "./getIndexesOfArrayElementsWhichSatisfiesThePredicate";


export namespace RemovingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> =
    Readonly<{
      targetArray: Array<ArrayElement>;
      mutably: boolean;
    }> & (
      Readonly<{ predicate: (arrayElement: ArrayElement) => boolean; }> |
      Readonly<{ predicates: Array<(arrayElement: ArrayElement) => boolean>; }>
    );

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
    indexesOfRemovedElements: Array<number>;
  }>;


  export function removeArrayElementsByPredicates<ArrayElement>(
    namedParameters: NamedParameters<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: NamedParameters<ArrayElement> = namedParameters;

    const indexesOfElementsWhichWillBeRemoved: Array<number> = [];

    for (
      const predicate of
      [ ..."predicates" in namedParameters ? namedParameters.predicates : [ namedParameters.predicate ] ]
    ) {
      indexesOfElementsWhichWillBeRemoved.push(
        ...getIndexesOfArrayElementsWhichSatisfiesThePredicate(
          targetArray, predicate
        ).filter((index: number): boolean => !indexesOfElementsWhichWillBeRemoved.includes(index))
      );
    }


    return {
      ...removeArrayElementsByIndexes({
        targetArray,
        indexes: indexesOfElementsWhichWillBeRemoved,
        mutably
      }),
      indexesOfRemovedElements: indexesOfElementsWhichWillBeRemoved.
          sort((oneElement: number, otherElement: number): number => oneElement - otherElement)
    };
  }
}


export default RemovingArrayElementsByPredicatesOperation.removeArrayElementsByPredicates;

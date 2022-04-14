import removeArrayElementsByIndexes from "./removeArrayElementsByIndexes";
import getIndexesOfArrayElementsWhichSatisfiesThePredicate from "./getIndexesOfArrayElementsWhichSatisfiesThePredicate";


export namespace RemovingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> = {
    readonly targetArray: Array<ArrayElement>;
    readonly predicates: (Array<(arrayElement: ArrayElement) => boolean>) | ((arrayElement: ArrayElement) => boolean);
    readonly mutably: boolean;
  };

  export type Result<ArrayElement> = {
    readonly updatedArray: Array<ArrayElement>;
    readonly removedElements: Array<ArrayElement>;
    readonly indexedOfRemovedElements: Array<number>;
  };


  export function removeArrayElementsByPredicates<ArrayElement>(
    namedParameters: NamedParameters<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: NamedParameters<ArrayElement> = namedParameters;

    const predicates: Array<(arrayElement: ArrayElement) => boolean> =
        Array.isArray(namedParameters.predicates) ? namedParameters.predicates : [ namedParameters.predicates ];

    const indexesOfElementsWhichWillBeRemoved: Array<number> = [];

    for (const predicate of predicates) {
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
      indexedOfRemovedElements: indexesOfElementsWhichWillBeRemoved.
          sort((oneElement: number, otherElement: number): number => oneElement - otherElement)
    };
  }
}


export default RemovingArrayElementsByPredicatesOperation.removeArrayElementsByPredicates;

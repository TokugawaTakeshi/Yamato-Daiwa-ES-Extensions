import removeArrayElementsByIndexes from "./removeArrayElementsByIndexes";
import getIndexesOfArrayElementsWhichSatisfiesToPredicate from "./getIndexesOfArrayElementsWhichSatisfiesToPredicate";


export namespace RemovingArrayElementsByPredicatedOperation {

  export type CompoundParameter<ArrayElement> = {
    targetArray: Array<ArrayElement>;
    predicates: (arrayElement: ArrayElement) => boolean;
    mutably: boolean;
  };

  export type Result<ArrayElement> = {
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
  };

  export function removeArrayElementsByPredicates<ArrayElement>(
    compoundParameter: CompoundParameter<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: CompoundParameter<ArrayElement> = compoundParameter;

    const predicates: Array<(arrayElement: ArrayElement) => boolean> =
        Array.isArray(compoundParameter.predicates) ? compoundParameter.predicates : [ compoundParameter.predicates ];

    const indexesOfElementsWhichWillBeRemoved: Array<number> = [];

    for (const predicate of predicates) {
      indexesOfElementsWhichWillBeRemoved.push(
        ...getIndexesOfArrayElementsWhichSatisfiesToPredicate(
          targetArray, predicate
        ).filter((index: number): boolean => !indexesOfElementsWhichWillBeRemoved.includes(index))
      );
    }


    return removeArrayElementsByIndexes({
      targetArray,
      indexes: indexesOfElementsWhichWillBeRemoved,
      mutably
    });
  }
}


export default RemovingArrayElementsByPredicatedOperation.removeArrayElementsByPredicates;

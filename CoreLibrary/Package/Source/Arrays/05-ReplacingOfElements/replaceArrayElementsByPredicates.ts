import getIndexesOfSatisfiesThePredicateArrayElements from
    "../02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements";


export namespace ReplacingArrayElementsByPredicates {

  export type SourceData<ArrayElement> =
    Readonly<(
      {
        mutably: true;
        targetArray: Array<ArrayElement>;
      } |
      {
        mutably: false;
        targetArray: ReadonlyArray<ArrayElement>;
      }
    )> &
    (
      Replacement<ArrayElement> |
      Readonly<{ replacements: ReadonlyArray<Replacement<ArrayElement>>; }>
    );

  export type Replacement<ArrayElement> = Readonly<
    { predicate: (arrayElement: ArrayElement) => boolean; } &
    (
      { newValue: ArrayElement; } |
      { replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }
    )
  >;

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    indexesOfReplacedElements: Array<number>;
  }>;

}


export default function replaceArrayElementsByPredicates<ArrayElement>(
  {
    targetArray,
    mutably,
    ...sourceData
  }: ReplacingArrayElementsByPredicates.SourceData<ArrayElement>
): ReplacingArrayElementsByPredicates.Result<ArrayElement> {

  const indexesOfElementsWhichWillBeReplacedAndNewValuesMap: Map<number, ArrayElement> = new Map<number, ArrayElement>();
  const indexesOfElementsWhichAlreadyHasBeenReplaced: Array<number> = [];

  let replacements: ReadonlyArray<ReplacingArrayElementsByPredicates.Replacement<ArrayElement>>;

  if ("replacements" in sourceData) {
    replacements = sourceData.replacements;
  } else if ("newValue" in sourceData) {
    replacements = [ { predicate: sourceData.predicate, newValue: sourceData.newValue } ];
  } else {
    replacements = [ { predicate: sourceData.predicate, replacer: sourceData.replacer } ];
  }

  for (const replacement of replacements) {

    const indexesOfElementsSatisfiesTheCurrentPredicate: ReadonlyArray<number> =
        getIndexesOfSatisfiesThePredicateArrayElements(targetArray, replacement.predicate);

    for (const indexOfElementWhichSatisfiedToCurrentPredicate of indexesOfElementsSatisfiesTheCurrentPredicate) {

      if (!indexesOfElementsWhichAlreadyHasBeenReplaced.includes(indexOfElementWhichSatisfiedToCurrentPredicate)) {
        indexesOfElementsWhichAlreadyHasBeenReplaced.push(indexOfElementWhichSatisfiedToCurrentPredicate);
      }

      indexesOfElementsWhichWillBeReplacedAndNewValuesMap.set(
        indexOfElementWhichSatisfiedToCurrentPredicate,
        "newValue" in replacement ?
            replacement.newValue :
            replacement.replacer(targetArray[indexOfElementWhichSatisfiedToCurrentPredicate])
      );

    }

  }


  const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...targetArray ];

  for (const [ targetElementIndex, newValue ] of indexesOfElementsWhichWillBeReplacedAndNewValuesMap) {
    workpiece[targetElementIndex] = newValue;
  }

  return {
    updatedArray: workpiece,
    indexesOfReplacedElements: indexesOfElementsWhichAlreadyHasBeenReplaced
  };

}

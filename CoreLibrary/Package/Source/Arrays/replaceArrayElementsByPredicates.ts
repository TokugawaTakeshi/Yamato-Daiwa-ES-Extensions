import getIndexesOfArrayElementsWhichSatisfiesThePredicate from "./getIndexesOfArrayElementsWhichSatisfiesThePredicate";


export namespace ReplacingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> =
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
  namedParameters: ReplacingArrayElementsByPredicatesOperation.NamedParameters<ArrayElement>
): ReplacingArrayElementsByPredicatesOperation.Result<ArrayElement> {

  const {
    targetArray,
    mutably
  }: ReplacingArrayElementsByPredicatesOperation.NamedParameters<ArrayElement> = namedParameters;

  const indexesOfElementsWhichWillBeReplacedAndNewValuesMap: Map<number, ArrayElement> = new Map<number, ArrayElement>();
  const indexesOfElementsWhichAlreadyHasBeenReplaced: Array<number> = [];

  let replacements: ReadonlyArray<ReplacingArrayElementsByPredicatesOperation.Replacement<ArrayElement>>;

  if ("replacements" in namedParameters) {
    replacements = namedParameters.replacements;
  } else if ("newValue" in namedParameters) {
    replacements = [ { predicate: namedParameters.predicate, newValue: namedParameters.newValue } ];
  } else {
    replacements = [ { predicate: namedParameters.predicate, replacer: namedParameters.replacer } ];
  }

  for (const replacement of replacements) {

    const indexesOfElementsSatisfiesTheCurrentPredicate: ReadonlyArray<number> =
        getIndexesOfArrayElementsWhichSatisfiesThePredicate(targetArray, replacement.predicate);

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


  const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...namedParameters.targetArray ];

  for (const [ targetElementIndex, newValue ] of indexesOfElementsWhichWillBeReplacedAndNewValuesMap) {
    workpiece[targetElementIndex] = newValue;
  }

  return {
    updatedArray: workpiece,
    indexesOfReplacedElements: indexesOfElementsWhichAlreadyHasBeenReplaced
  };

}

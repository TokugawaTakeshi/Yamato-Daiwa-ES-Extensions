import getIndexesOfArrayElementsWhichSatisfiesThePredicate from "./getIndexesOfArrayElementsWhichSatisfiesThePredicate";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace ReplacingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> =
    Readonly<{
      targetArray: Array<ArrayElement>;
      mutably: boolean;
    }> &
    (
      Replacement<ArrayElement> |
      Readonly<{ replacements: Array<Replacement<ArrayElement>>; }>
    );

  export type Replacement<ArrayElement> =
    Readonly<{ predicate: (arrayElement: ArrayElement) => boolean; }> &
    (
      Readonly<{ readonly newValue: ArrayElement; }> |
      Readonly<{ readonly replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }>
    );

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    indexesOfReplacedElements: Array<number>;
  }>;

  export function replaceArrayElementsByPredicates<ArrayElement>(
    namedParameters: NamedParameters<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: NamedParameters<ArrayElement> = namedParameters;

    const indexesOfElementsWhichWillBeReplacedAndNewValuesMap: Map<number, ArrayElement> = new Map<number, ArrayElement>();
    const indexedOfElementsWhichHasBeenAlreadyReplaced: Array<number> = [];

    let replacements: Array<Replacement<ArrayElement>>;

    if ("replacements" in namedParameters) {
      replacements = namedParameters.replacements;
    } else if ("newValue" in namedParameters) {
      replacements = [ { predicate: namedParameters.predicate, newValue: namedParameters.newValue } ];
    } else {
      replacements = [ { predicate: namedParameters.predicate, replacer: namedParameters.replacer } ];
    }

    for (const replacement of replacements) {

      const indexesOfElementsWhichSatisfiedToCurrentPredicate: Array<number> =
          getIndexesOfArrayElementsWhichSatisfiesThePredicate(targetArray, replacement.predicate);

      for (const indexOfElementWhichSatisfiedToCurrentPredicate of indexesOfElementsWhichSatisfiedToCurrentPredicate) {

        if (indexedOfElementsWhichHasBeenAlreadyReplaced.includes(indexOfElementWhichSatisfiedToCurrentPredicate)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: InvalidParameterValueError.localization.generateDescription({
              parameterName: "namedParameters.replacements",
              messageSpecificPart: `The element with index ${ indexOfElementWhichSatisfiedToCurrentPredicate } is satisfies ` +
                  "to multiple predicated therefore will be replaced more that one time."
            }),
            occurrenceLocation: "replaceArrayElementsByPredicates(namedParameters)"
          });
        } else {
          indexedOfElementsWhichHasBeenAlreadyReplaced.push(indexOfElementWhichSatisfiedToCurrentPredicate);
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
      indexesOfReplacedElements: indexedOfElementsWhichHasBeenAlreadyReplaced
    };
  }
}


export default ReplacingArrayElementsByPredicatesOperation.replaceArrayElementsByPredicates;

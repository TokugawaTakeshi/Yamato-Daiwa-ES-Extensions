import getIndexesOfArrayElementsWhichSatisfiesToPredicate from "./getIndexesOfArrayElementsWhichSatisfiesToPredicate";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace ReplacingArrayElementsByPredicatesOperation {

  export type NamedParameters<ArrayElement> = {
    readonly targetArray: Array<ArrayElement>;
    readonly replacements: Replacement<ArrayElement> | Array<Replacement<ArrayElement>>;
    readonly mutably: boolean;
  };

  export type Replacement<ArrayElement> =
    {
      readonly predicate: (arrayElement: ArrayElement) => boolean;
    } & (
      { readonly newValue: ArrayElement; } |
      { readonly replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }
    );


  export type Result<ArrayElement> = {
    readonly updatedArray: Array<ArrayElement>;
    readonly indexesOfReplacedElements: Array<number>;
  };

  export function replaceArrayElementsByPredicates<ArrayElement>(
    namedParameters: NamedParameters<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: NamedParameters<ArrayElement> = namedParameters;

    const indexesOfElementsWhichWillBeRemovedAndNewValuesMap: Map<number, ArrayElement> = new Map<number, ArrayElement>();
    const indexedOfElementsWhichHasBeenAlreadyReplaced: Array<number> = [];

    for (
      const replacement of
      [ ...Array.isArray(namedParameters.replacements) ? namedParameters.replacements : [ namedParameters.replacements ] ]
    ) {

      const indexesOfElementsWhichSatisfiedToCurrentPredicate: Array<number> =
          getIndexesOfArrayElementsWhichSatisfiesToPredicate(targetArray, replacement.predicate);

      for (const indexOfElementWhichSatisfiedToCurrentPredicate of indexesOfElementsWhichSatisfiedToCurrentPredicate) {

        if (indexedOfElementsWhichHasBeenAlreadyReplaced.includes(indexOfElementWhichSatisfiedToCurrentPredicate)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.DEFAULT_TITLE,
            description: InvalidParameterValueError.localization.generateMessage({
              parameterName: "namedParameters.replacements",
              messageSpecificPart: `The element with index ${indexOfElementWhichSatisfiedToCurrentPredicate} is satisfies ` +
                  "to multiple predicated therefore will be replaced more that one time."
            }),
            occurrenceLocation: "replaceArrayElementsByPredicates(namedParameters)"
          });
        } else {
          indexedOfElementsWhichHasBeenAlreadyReplaced.push(indexOfElementWhichSatisfiedToCurrentPredicate);
        }

        indexesOfElementsWhichWillBeRemovedAndNewValuesMap.set(
          indexOfElementWhichSatisfiedToCurrentPredicate,
          "newValue" in replacement ?
              replacement.newValue :
              replacement.replacer(targetArray[indexOfElementWhichSatisfiedToCurrentPredicate])
        );
      }
    }


    const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...namedParameters.targetArray ];

    for (const [ targetElementIndex, newValue ] of indexesOfElementsWhichWillBeRemovedAndNewValuesMap) {
      workpiece[targetElementIndex] = newValue;
    }


    return {
      updatedArray: workpiece,
      indexesOfReplacedElements: indexedOfElementsWhichHasBeenAlreadyReplaced
    };
  }
}


export default ReplacingArrayElementsByPredicatesOperation.replaceArrayElementsByPredicates;

import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace RemovingArrayElementsByIndexesOperation {

  export type NamedParameters<ArrayElement> = {
    readonly targetArray: Array<ArrayElement>;
    readonly indexes: number | Array<number>;
    readonly mutably: boolean;
  };

  export type Result<ArrayElement> = {
    readonly updatedArray: Array<ArrayElement>;
    readonly removedElements: Array<ArrayElement>;
  };


  export function removeArrayElementsByIndexes<ArrayElement>(
    namedParameters: NamedParameters<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: NamedParameters<ArrayElement> = namedParameters;

    const initialElementsCount: number = targetArray.length;
    const indexesOfArrayElementsWhichWillBeRemoved__actualForArrayInInitialStateOnly: Array<number> =
        typeof namedParameters.indexes === "number" ?
            [ namedParameters.indexes ] :
            namedParameters.indexes.sort(
              (oneElement: number, otherElement: number): number => oneElement - otherElement
            );

    const removedArrayElements: Array<ArrayElement> = [];
    const indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly: Array<number> = [];
    const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...namedParameters.targetArray ];


    for (
      const indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly of
      indexesOfArrayElementsWhichWillBeRemoved__actualForArrayInInitialStateOnly.reverse()
    ) {

      if (!isNonNegativeInteger(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)) {

        Logger.logError({
          errorType: InvalidParameterValueError.NAME,
          title: InvalidParameterValueError.DEFAULT_TITLE,
          description: InvalidParameterValueError.localization.generateMessage({
            parameterName: "namedParameters.indexes",
            messageSpecificPart:
                `The index ${String(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)} ` +
                "is not the non-negative integer therefore will be ignored."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(namedParameters)"
        });

        continue;
      }


      if (indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly >= initialElementsCount) {

        Logger.logError({
          errorType: InvalidParameterValueError.NAME,
          title: InvalidParameterValueError.DEFAULT_TITLE,
          description: InvalidParameterValueError.localization.generateMessage({
            parameterName: "namedParameters.indexes",
            messageSpecificPart: `The index ${indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly} ` +
                "is greater than index of last element of target array therefore will be ignored."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(namedParameters)"
        });

        continue;
      }


      if (
        indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly.
            includes(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)
      ) {

        Logger.logError({
          errorType: InvalidParameterValueError.NAME,
          title: InvalidParameterValueError.DEFAULT_TITLE,
          description: InvalidParameterValueError.localization.generateMessage({
            parameterName: "namedParameters.indexes",
            messageSpecificPart: "Removing of element with index " +
                `${indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly} has been demanded more ` +
                "than one time."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(namedParameters)"
        });

        continue;
      }

      removedArrayElements.push(
        workpiece.splice(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly, 1)[0]
      );

      indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly.
          push(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly);
    }


    return {
      updatedArray: workpiece,
      removedElements: removedArrayElements.reverse()
    };
  }
}


export default RemovingArrayElementsByIndexesOperation.removeArrayElementsByIndexes;

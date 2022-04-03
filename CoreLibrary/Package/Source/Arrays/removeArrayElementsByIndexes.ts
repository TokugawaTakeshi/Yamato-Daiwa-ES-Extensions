import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace RemovingArrayElementsByIndexesOperation {

  export type CompoundParameter<ArrayElement> = {
    readonly targetArray: Array<ArrayElement>;
    readonly indexes: number | Array<number>;
    readonly mutably: boolean;
  };

  export type Result<ArrayElement> = {
    readonly updatedArray: Array<ArrayElement>;
    readonly removedElements: Array<ArrayElement>;
  };


  export function removeArrayElementsByIndexes<ArrayElement>(
    compoundParameter: CompoundParameter<ArrayElement>
  ): Result<ArrayElement> {

    const {
      targetArray,
      mutably
    }: CompoundParameter<ArrayElement> = compoundParameter;

    const initialElementsCount: number = targetArray.length;
    const indexesOfArrayElementsWhichWillBeRemoved__actualForArrayInInitialStateOnly: Array<number> =
        typeof compoundParameter.indexes === "number" ?
            [ compoundParameter.indexes ] :
            compoundParameter.indexes.sort(
              (oneElement: number, otherElement: number): number => oneElement - otherElement
            );

    const removedArrayElements: Array<ArrayElement> = [];
    const indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly: Array<number> = [];
    const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...compoundParameter.targetArray ];


    for (
      const indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly of
      indexesOfArrayElementsWhichWillBeRemoved__actualForArrayInInitialStateOnly.reverse()
    ) {

      if (!isNonNegativeInteger(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)) {

        Logger.logError({
          errorType: InvalidParameterValueError.NAME,
          title: InvalidParameterValueError.DEFAULT_TITLE,
          description: InvalidParameterValueError.localization.generateMessage({
            parameterName: "compoundParameter.indexes",
            messageSpecificPart:
                `The index ${String(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)} ` +
                "is not the non-negative integer therefore will be ignored."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(compoundParameter)"
        });

        continue;
      }


      if (indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly >= initialElementsCount) {

        Logger.logError({
          errorType: InvalidParameterValueError.NAME,
          title: InvalidParameterValueError.DEFAULT_TITLE,
          description: InvalidParameterValueError.localization.generateMessage({
            parameterName: "compoundParameter.indexes",
            messageSpecificPart: `The index ${indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly} ` +
                "is greater than index of last element of target array therefore will be ignored."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(compoundParameter)"
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
            parameterName: "compoundParameter.indexes",
            messageSpecificPart: "Removing of element with index " +
                `${indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly} has been demanded more ` +
                "than one time."
          }),
          occurrenceLocation: "removeArrayElementsByIndexes(compoundParameter)"
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

import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace RemovingArrayElementsByIndexesOperation {

  export type SourceData<ArrayElement> = Readonly<
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
    { indexes: number | ReadonlyArray<number>; }
  >;

  export type Result<ArrayElement> = Readonly<{
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
  }>;

}

export default function removeArrayElementsByIndexes<ArrayElement>(
  sourceData: RemovingArrayElementsByIndexesOperation.SourceData<ArrayElement>
): RemovingArrayElementsByIndexesOperation.Result<ArrayElement> {

  const {
    targetArray,
    mutably
  }: RemovingArrayElementsByIndexesOperation.SourceData<ArrayElement> = sourceData;

  const initialElementsCount: number = targetArray.length;
  const indexesOfArrayElementsWhichWillBeRemoved__fromLast__actualForArrayInInitialStateOnly: ReadonlyArray<number> =
      typeof sourceData.indexes === "number" ?
          [ sourceData.indexes ] :
          [ ...sourceData.indexes ].sort(
            (oneElement: number, otherElement: number): number => oneElement - otherElement
          ).reverse();

  const removedArrayElements: Array<ArrayElement> = [];
  const indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly: Array<number> = [];
  const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...sourceData.targetArray ];


  for (
    const indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly of
    indexesOfArrayElementsWhichWillBeRemoved__fromLast__actualForArrayInInitialStateOnly
  ) {

    if (!isNonNegativeInteger(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: InvalidParameterValueError.localization.generateDescription({
          parameterNumber: 1,
          parameterName: "sourceData.indexes",
          messageSpecificPart:
              `The index ${ String(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly) } ` +
              "is not the non-negative integer therefore will be ignored."
        }),
        occurrenceLocation: "removeArrayElementsByIndexes(sourceData)"
      });

      continue;

    }


    if (indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly >= initialElementsCount) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: InvalidParameterValueError.localization.generateDescription({
          parameterNumber: 1,
          parameterName: "sourceData.indexes",
          messageSpecificPart: `The index ${ indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly } ` +
              "is greater than index of last element of target array therefore will be ignored."
        }),
        occurrenceLocation: "removeArrayElementsByIndexes(sourceData)"
      });

      continue;

    }


    if (
      indexesOfArrayElementsWhichAlreadyHasBeenRemoved__actualForArrayInInitialStateOnly.
          includes(indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly)
    ) {
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

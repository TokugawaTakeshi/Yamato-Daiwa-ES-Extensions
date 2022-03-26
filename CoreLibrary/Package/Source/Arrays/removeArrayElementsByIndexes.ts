import Logger from "../Logging/Logger";


export namespace RemovingArrayElementsByIndexesOperation {

  export type CompoundParameter<ArrayElement> = {
    targetArray: Array<ArrayElement>;
    indexes: number | Array<number>;
    mutably: boolean;
  };

  export type Result<ArrayElement> = {
    updatedArray: Array<ArrayElement>;
    removedElements: Array<ArrayElement>;
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
    const workpiece: Array<ArrayElement> = mutably ? targetArray : [ ...compoundParameter.targetArray ];

    for (
      const [
        numberOfElementWhichWillBeRemoved__numerationFrom0,
        indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly
      ] of indexesOfArrayElementsWhichWillBeRemoved__actualForArrayInInitialStateOnly.entries()
    ) {

      if (indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly >= initialElementsCount) {
        Logger.logWarning({
          title: "Invalid index",
          description: "Unable to remove array element with index " + 
              `${indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly} because target array has ` +
              `${targetArray.length} elements.`,
          occurrenceLocation: "removeArrayElementsByIndexes"
        });
        break;
      }


      const targetElementIndex__actualForArrayInCurrentState: number =
          indexOfArrayElementWhichWillBeRemoved__actualForArrayInInitialStateOnly -
              numberOfElementWhichWillBeRemoved__numerationFrom0;

      removedArrayElements.push(
        workpiece.splice(targetElementIndex__actualForArrayInCurrentState, 1)[0]
      );
    }


    return {
      updatedArray: workpiece,
      removedElements: removedArrayElements
    };
  }
}


export default RemovingArrayElementsByIndexesOperation.removeArrayElementsByIndexes;

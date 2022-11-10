export default function addElementsToArray<ArrayElement>(
  sourceData:
      Readonly<
        { newElements: ReadonlyArray<ArrayElement>; } &
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
        (
          { toStart: true; } |
          { toEnd: true; } |
          { toPosition__numerationFrom0: number; } |
          { toPosition__numerationFrom1: number; }
        )
      >
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = sourceData.mutably ?
      sourceData.targetArray : [ ...sourceData.targetArray ];

  if ("toStart" in sourceData) {
    workpiece.unshift(...sourceData.newElements);
    return workpiece;
  }


  if ("toEnd" in sourceData) {
    workpiece.push(...sourceData.newElements);
    return workpiece;
  }


  const positionOfFirstNewElement__numerationFrom0: number = "toPosition__numerationFrom0" in sourceData ?
      sourceData.toPosition__numerationFrom0 : sourceData.toPosition__numerationFrom1 - 1;

  workpiece.splice(positionOfFirstNewElement__numerationFrom0, 0, ...sourceData.newElements);

  return workpiece;

}

export default function addElementsToArray<ArrayElement>(
  namedParameters:
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

  const workpiece: Array<ArrayElement> = namedParameters.mutably ?
      namedParameters.targetArray : [ ...namedParameters.targetArray ];

  if ("toStart" in namedParameters) {
    workpiece.unshift(...namedParameters.newElements);
    return workpiece;
  }


  if ("toEnd" in namedParameters) {
    workpiece.push(...namedParameters.newElements);
    return workpiece;
  }


  const positionOfFirstNewElement__numerationFrom0: number = "toPosition__numerationFrom0" in namedParameters ?
      namedParameters.toPosition__numerationFrom0 : namedParameters.toPosition__numerationFrom1 - 1;

  workpiece.splice(positionOfFirstNewElement__numerationFrom0, 0, ...namedParameters.newElements);

  return workpiece;

}

export default function replaceArrayElementsByIndexesImmutably<ArrayElement>(
  sourceData:
      Readonly<
        { targetArray: ReadonlyArray<ArrayElement>; } &
        (
          {
            index: number;
            newElement: ArrayElement;
          } |
          {
            replacements: ReadonlyArray<{
              index: number;
              newElement: ArrayElement;
            }>;
          }
        )
      >
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = [ ...sourceData.targetArray ];

  const replacements: ReadonlyArray<{ index: number; newElement: ArrayElement; }> =
      "replacements" in sourceData ?
          sourceData.replacements :
          [ { index: sourceData.index, newElement: sourceData.newElement } ];

  for (const replacement of replacements) {
    workpiece[replacement.index] = replacement.newElement;
  }

  return workpiece;

}

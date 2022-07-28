export default function replaceArrayElementsByIndexesImmutably<ArrayElement>(
  namedParameters:
      Readonly<{ targetArray: Array<ArrayElement>; }> &
      (
        Readonly<{
          index: number;
          newElement: ArrayElement;
        }> |
        Readonly<{
          replacements: Array<{
            index: number;
            newElement: ArrayElement;
          }>;
        }>
      )
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = [ ...namedParameters.targetArray ];
  const replacements: Array<{ index: number; newElement: ArrayElement; }> =
      "replacements" in namedParameters ? namedParameters.replacements :
      [ { index: namedParameters.index, newElement: namedParameters.newElement } ];

  for (const replacement of replacements) {
    workpiece[replacement.index] = replacement.newElement;
  }

  return workpiece;
}

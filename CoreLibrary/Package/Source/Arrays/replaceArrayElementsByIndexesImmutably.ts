export default function replaceArrayElementsByIndexesImmutably<ArrayElement>(
  namedParameters: {
    targetArray: Array<ArrayElement>;
    replacements: Array<{
      index: number;
      newElement: ArrayElement;
    }>;
  }
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = [ ...namedParameters.targetArray ];

  for (const replacement of namedParameters.replacements) {
    workpiece[replacement.index] = replacement.newElement;
  }

  return workpiece;
}

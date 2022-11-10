export default function twoDimensionalizeArray<ArrayElement>(
  sourceData: Readonly<{
    targetFlatArray: ReadonlyArray<ArrayElement>;
    elementsCountPerNestedArray: number;
  }>
): Array<Array<ArrayElement>> {

  const twoDimensionalArray: Array<Array<ArrayElement>> = [];
  const elementsCountInTargetFlatArray: number = sourceData.targetFlatArray.length;
  let nestedArray: Array<ArrayElement> = [];

  for (const [ index, arrayElement ] of sourceData.targetFlatArray.entries()) {

    nestedArray.push(arrayElement);

    const hasNextElement: boolean = index !== elementsCountInTargetFlatArray - 1;

    if (hasNextElement) {

      if (nestedArray.length === sourceData.elementsCountPerNestedArray) {
        twoDimensionalArray.push(nestedArray);
        nestedArray = [];
      }

      continue;

    }


    twoDimensionalArray.push(nestedArray);

  }

  return twoDimensionalArray;

}

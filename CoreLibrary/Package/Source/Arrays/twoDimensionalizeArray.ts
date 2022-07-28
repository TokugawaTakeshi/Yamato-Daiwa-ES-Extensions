export default function twoDimensionalizeArray<ArrayElement>(
  {
    targetFlatArray,
    elementsPerNestedArray
  }: Readonly<{
    targetFlatArray: Array<ArrayElement>;
    elementsPerNestedArray: number;
  }>
): Array<Array<ArrayElement>> {

  const twoDimensionalArray: Array<Array<ArrayElement>> = [];
  const elementsCountInTargetFlatArray: number = targetFlatArray.length;
  let nestedArray: Array<ArrayElement> = [];

  for (const [ index, arrayElement ] of targetFlatArray.entries()) {

    nestedArray.push(arrayElement);
    const hasNextElement: boolean = index !== elementsCountInTargetFlatArray - 1;

    if (hasNextElement) {

      if (nestedArray.length === elementsPerNestedArray) {
        twoDimensionalArray.push(nestedArray);
        nestedArray = [];
      }

      continue;
    }


    twoDimensionalArray.push(nestedArray);
  }


  return twoDimensionalArray;
}

import { ColumnVector, type RowVector, Matrix } from "../index";


export default function performElementWiseOperationOnMatrices<
  Element,
  LeftOperand extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>,
  RightOperand extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>,
  Result extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>
>(
  {
    leftOperand,
    rightOperand,
    elementWiseOperation,
    productNormalizer
  }: Readonly<{
    leftOperand: LeftOperand;
    rightOperand: RightOperand;
    elementWiseOperation: (firstElement: Element, secondElement: Element) => Element;
    productNormalizer: (arrayedProduct: ReadonlyArray<ReadonlyArray<Element>>) => Result;
  }>
): Result {

  let rowsCountInLeftOperand: number;
  let rowsCountInRightOperand: number;
  let columnsCountInLeftOperand: number;
  let columnsCountInRightOperand: number;

  let arrayedLeftOperand: Array<Array<Element>>;
  let arrayedRightOperand: Array<Array<Element>>;

  if (leftOperand instanceof Matrix) {
    rowsCountInLeftOperand = leftOperand.rowsCount;
    columnsCountInLeftOperand = leftOperand.columnsCount;
    arrayedLeftOperand = leftOperand.to2DimensionalArray();
  } else if (leftOperand instanceof ColumnVector) {
    rowsCountInLeftOperand = leftOperand.length;
    columnsCountInLeftOperand = 1;
    arrayedLeftOperand = [ ...leftOperand.map((element: Element): [ Element ] => [ element ]) ];
  } else {
    rowsCountInLeftOperand = 1;
    columnsCountInLeftOperand = leftOperand.length;
    arrayedLeftOperand = [ leftOperand ];
  }

  if (rightOperand instanceof Matrix) {
    rowsCountInRightOperand = rightOperand.rowsCount;
    columnsCountInRightOperand = rightOperand.columnsCount;
    arrayedRightOperand = rightOperand.to2DimensionalArray();
  } else if (rightOperand instanceof ColumnVector) {
    rowsCountInRightOperand = rightOperand.length;
    columnsCountInRightOperand = 1;
    arrayedRightOperand = [ ...rightOperand.map((element: Element): [ Element ] => [ element ]) ];
  } else {
    rowsCountInRightOperand = 1;
    columnsCountInRightOperand = rightOperand.length;
    arrayedRightOperand = [ rightOperand ];
  }

  if (rowsCountInLeftOperand !== rowsCountInRightOperand) {
    throw new Error("LinearAlgebraViolation");
  }


  if (columnsCountInLeftOperand !== columnsCountInRightOperand) {
    throw new Error("LinearAlgebraViolation");
  }


  const arrayedProduct: Array<Array<Element>> = [];

  for (let rowIndex: number = 0; rowIndex < rowsCountInLeftOperand; rowIndex++) {

    arrayedProduct[rowIndex] = [];

    for (let columnIndex: number = 0; columnIndex < columnsCountInLeftOperand; columnIndex++) {
      arrayedProduct[rowIndex][columnIndex] =
          elementWiseOperation(arrayedLeftOperand[rowIndex][columnIndex], arrayedRightOperand[rowIndex][columnIndex]);
    }

  }

  return productNormalizer(arrayedProduct);

}

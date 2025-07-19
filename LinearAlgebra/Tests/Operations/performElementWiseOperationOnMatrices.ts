import { ColumnVector, Matrix, RowVector } from "../../Source";
import { getLastElementOfArray } from "@yamato-daiwa/es-extensions";


export default function performElementWiseOperationOnMatrices<
  Element,
  LeftOperand extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>,
  RightOperand extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>,
  Result extends Matrix<Element> | ColumnVector<Element> | RowVector<Element>
>(
  {
    leftOperand,
    rightOperand,
    productNormalizer
  }: Readonly<{
    leftOperand: LeftOperand;
    rightOperand: RightOperand;
    productNormalizer: (arrayedProduct: ReadonlyArray<ReadonlyArray<Element>>) => Result;
  }>
): Result {

  let rowsCountInLeftOperand: number;
  let rowsCountInRightOperand: number;
  let columnsCountInLeftOperand: number;
  let columnsCountInRightOperand: number;

  let arrayedLeftOperand: Array<Array<Element>>;
  let arrayedRightOperand: Array<Array<Element>>;
  let arrayedProduct: Array<Array<Element>> = [];

  if (leftOperand instanceof Matrix) {
    rowsCountInLeftOperand = leftOperand.rowsCount;
    columnsCountInLeftOperand = leftOperand.columnsCount;
  } else if (leftOperand instanceof ColumnVector) {
    rowsCountInLeftOperand = leftOperand.length;
    columnsCountInLeftOperand = 1;
  } else {
    rowsCountInLeftOperand = 1;
    columnsCountInLeftOperand = leftOperand.length;
  }

  if (rightOperand instanceof Matrix) {
    rowsCountInRightOperand = rightOperand.rowsCount;
    columnsCountInRightOperand = rightOperand.columnsCount;
  } else if (rightOperand instanceof ColumnVector) {
    rowsCountInRightOperand = rightOperand.length;
    columnsCountInRightOperand = 1;
  } else {
    rowsCountInRightOperand = 1;
    columnsCountInRightOperand = rightOperand.length;
  }

  if (rowsCountInLeftOperand !== rowsCountInRightOperand) {
    throw new Error("LinearAlgebraViolation");
  }


  if (columnsCountInLeftOperand !== columnsCountInRightOperand) {
    throw new Error("LinearAlgebraViolation");
  }


  for (let rowIndex: number = 0; rowIndex < rowsCountInLeftOperand; rowIndex++) {

  }

  return productNormalizer(arrayedProduct);

}

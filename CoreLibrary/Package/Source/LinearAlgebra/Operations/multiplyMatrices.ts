import Matrix from "../Classes/Matrix";
import computeDotProduct from "./computeDotProduct";


export default function multiplyMatrices(
  firstMatrix: Matrix<number>, secondMatrix: Matrix<number>
): Matrix<number> {

  if (firstMatrix.columnsCount !== secondMatrix.rowsCount) {
    throw new Error("LinearAlgebraViolation");
  }


  const product: Matrix<number> = Matrix.createEmptyOne({
    rowsCount: firstMatrix.rowsCount,
    columnsCount: secondMatrix.columnsCount
  });

  for (let productRowIndex: number = 0; productRowIndex <= firstMatrix.rowsCount; productRowIndex++) {

    for (let productColumnIndex: number = 0; productColumnIndex <= secondMatrix.columnsCount; productColumnIndex++) {

      product.setElement({
        rowIndex: productRowIndex,
        columnIndex: productColumnIndex,
        value: computeDotProduct(
          firstMatrix.getRow({ index: productRowIndex }),
          secondMatrix.getColumn({ index: productColumnIndex })
        )
      });

    }

  }


  return product;

}

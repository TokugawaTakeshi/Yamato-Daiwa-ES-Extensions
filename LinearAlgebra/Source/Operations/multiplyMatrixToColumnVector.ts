import type Matrix from "../Classes/Matrix";
import ColumnVector from "../Classes/ColumnVector";
import type ReadonlyColumnVector from "../Classes/ReadonlyColumnVector";
import computeDotProduct from "./computeDotProduct";


export default function multiplyMatrixToColumnVector(
  matrix: Matrix<number>, columnVector: ReadonlyColumnVector<number>
): ColumnVector<number> {

  if (matrix.columnsCount !== columnVector.length) {
    throw new Error("LinearAlgebraViolation");
  }

  return new ColumnVector(
    matrix.to2DimensionalArray().map(
      (elementsOfRow: ReadonlyArray<number>): number =>
          computeDotProduct(elementsOfRow, columnVector)
    )
  );

}

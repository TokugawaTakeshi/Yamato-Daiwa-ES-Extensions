import { ColumnVector, Matrix, multiplyMatrixToColumnVector } from "../../Source";
import { Logger } from "@yamato-daiwa/es-extensions";
import { test } from "node:test";
import Assert from "assert";


Promise.all([

  test(
    "Product is Even With Expected One",
    (): void => {

      Assert.deepStrictEqual(
        multiplyMatrixToColumnVector(
          new Matrix(
            [ 1, 3 ],
            [ 5, 7 ],
            [ 9, 11 ]
          ),
          new ColumnVector([ 2, 4 ])
        ),
        new ColumnVector([ 14, 38, 62 ])
      );

    }
  )

]).catch(Logger.logPromiseError);

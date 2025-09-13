import { Matrix, multiplyMatrices } from "../../Source";
import { Logger } from "@yamato-daiwa/es-extensions";
import { test } from "node:test";
import Assert from "assert";


Promise.all([

  test(
    "Product is Even With Expected One",
    (): void => {

      Assert.deepStrictEqual(
        multiplyMatrices(
          new Matrix(
            [ 2, 3 ],
            [ 4, 5 ]
          ),
          new Matrix(
            [ 6, 7, 8 ],
            [ 9, 10, 11 ]
          )
        ),
        new Matrix([
          [ 39, 44, 49 ],
          [ 69, 78, 87 ]
        ])
      );

    }
  ),

  test(
    "1x1 Matrices has been Multiplied Correctly",
    (): void => {

      Assert.deepStrictEqual(
        multiplyMatrices(
          new Matrix([ 0.9 ]),
          new Matrix([ 0.2 ])
        ),
        new Matrix([ [ 6 ] ])
      );

    }
  )

]).catch(Logger.logPromiseError);

import { Logger, Matrix, multiplyMatrices } from "../../../../Source";
import { test } from "node:test";
import Assert from "assert";


test(
  "Product is Even With Expected One",
  (): void => {

    Assert.deepStrictEqual(
      multiplyMatrices(
        new Matrix([
          [ 2, 3 ],
          [ 4, 5 ]
        ]),
        new Matrix([
          [ 6, 7, 8 ],
          [ 9, 10, 11 ]
        ])
      ),
      new Matrix([
        [ 39, 44, 49 ],
        [ 69, 78, 87 ]
      ])
    );

  }
).catch(Logger.logPromiseError);

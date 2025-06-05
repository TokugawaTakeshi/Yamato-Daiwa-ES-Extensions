import { computeDotProduct, Logger, RowVector } from "../../../../Source";
import { test } from "node:test";
import Assert from "assert";


test(
  "Dot Product is Matching with Expected One",
  (): void => {

    Assert.strictEqual(
      computeDotProduct(
        RowVector.fromArray([ 4, -1, 2 ]),
        RowVector.fromArray([ 2, -2, -1 ])
      ),
      8
    );

  }
).catch(Logger.logPromiseError);

import { computeDotProduct, RowVector } from "../../Source";
import { Logger } from "@yamato-daiwa/es-extensions";
import { test } from "node:test";
import Assert from "assert";


test(
  "Dot Product is Matching with Expected One",
  (): void => {

    Assert.strictEqual(
      computeDotProduct(
        new RowVector([ 4, -1, 2 ]),
        new RowVector([ 2, -2, -1 ])
      ),
      8
    );

  }
).catch(Logger.logPromiseError);

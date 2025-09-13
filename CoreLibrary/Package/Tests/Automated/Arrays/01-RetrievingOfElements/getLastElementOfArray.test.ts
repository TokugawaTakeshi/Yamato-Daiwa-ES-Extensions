import { getLastElementOfArray, Logger, UnexpectedEventError } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


Promise.all([

  test(
    "Normal Scenario",
    (): void => {
      Assert.strictEqual(getLastElementOfArray([ "alpha", "bravo", "charlie" ]), "charlie");
    }
  ),

  suite(
    "Handling of Empty Array",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Returning of Null",
          (): void => {
            Assert.strictEqual(getLastElementOfArray([]), null);
          }
        ),

        test(
          "Errored Scenario",
          (): void => {
            Assert.throws(
              (): void => { getLastElementOfArray([], { mustThrowErrorIfArrayIsEmpty: true }); },
              UnexpectedEventError
            );
          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

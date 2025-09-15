import { getLastElementOfArray, Logger, UnexpectedEventError } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.suite(
  "getLastElementOfArray",
  async (): Promise<void> => {

    await Promise.all([

      Testing.test(
        "Normal Scenario",
        (): void => {
          Assert.strictEqual(getLastElementOfArray([ "alpha", "bravo", "charlie" ]), "charlie");
        }
      ),

      Testing.suite(
        "Handling of Empty Array",
        async (): Promise<void> => {

          await Promise.all([

            Testing.test(
              "Returning of Null",
              (): void => {
                Assert.strictEqual(getLastElementOfArray([]), null);
              }
            ),

            Testing.test(
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

    ]);

  }
).catch(Logger.logPromiseError);

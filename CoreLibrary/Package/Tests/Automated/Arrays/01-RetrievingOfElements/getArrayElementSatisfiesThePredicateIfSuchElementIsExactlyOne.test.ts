import {
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  Logger,
  UnexpectedEventError
} from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.suite(
  "getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne",
  async (): Promise<void> => {

    const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

    await Promise.all([

      Testing.test(
        "One Match",
        (): void => {
          Assert.strictEqual(
            getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
              sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
            ),
            "St. Louis"
          );
        }
      ),

      Testing.test(
        "More than One Match",
        (): void => {

          Assert.strictEqual(
            getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
              sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
            ),
            null
          );

          Assert.throws(
            (): void => {
              getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                sample,
                (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
                { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
              );
            },
            UnexpectedEventError
          );

        }
      ),

      Testing.test(
        "No Matches",
        (): void => {

          Assert.strictEqual(
            getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
              sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
            ),
            null
          );

          Assert.throws(
            (): void => {
              getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                sample,
                (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
                { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
              );
            },
            UnexpectedEventError
          );

        }
      )

    ]);

  }
).catch(Logger.logPromiseError);

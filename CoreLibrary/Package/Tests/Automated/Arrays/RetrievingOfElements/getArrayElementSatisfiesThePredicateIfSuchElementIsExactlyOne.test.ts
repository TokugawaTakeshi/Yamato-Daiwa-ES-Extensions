import {
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  UnexpectedEventError
} from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


await suite("getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne", async (): Promise<void> => {

  const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

  await test("One match", (): void => {
    Assert.strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  });

  await test("More than one match", (): void => {

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

  });

  await test("No matches", (): void => {

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

  });

});

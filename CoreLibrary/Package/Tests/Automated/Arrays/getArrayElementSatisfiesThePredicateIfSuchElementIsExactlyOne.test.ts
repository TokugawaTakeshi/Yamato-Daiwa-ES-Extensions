import {
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  UnexpectedEventError
} from "../../../Source";
import Assert from "assert";


describe("getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne", (): void => {

  const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

  it("One match", (): void => {
    Assert.strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  });

  it("More than one match", (): void => {

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

  it("No matches", (): void => {

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

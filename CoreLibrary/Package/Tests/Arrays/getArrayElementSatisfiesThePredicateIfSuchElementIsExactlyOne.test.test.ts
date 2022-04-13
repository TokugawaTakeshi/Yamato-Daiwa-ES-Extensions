import getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne from
    "../../Source/Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";
import UnexpectedEventError from "../../Source/Logging/Errors/UnexpectedEvent/UnexpectedEventError";

import { strictEqual, throws } from "assert";


describe("getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne", (): void => {

  const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

  it("One match", (): void => {
    strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  });

  it("More than one match", (): void => {

    strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample,
          (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
          { throwErrorIfElementNotFoundOrMoreThan1: true }
        );
      },
      { name: UnexpectedEventError.name }
    );
  });

  it("No matches", (): void => {

    strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample,
          (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
          { throwErrorIfElementNotFoundOrMoreThan1: true }
        );
      },
      { name: UnexpectedEventError.name }
    );
  });
});

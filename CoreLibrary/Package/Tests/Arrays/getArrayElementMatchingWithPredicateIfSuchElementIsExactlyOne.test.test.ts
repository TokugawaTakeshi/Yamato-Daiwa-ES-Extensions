import getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne from
      "../../Source/Arrays/getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne";
import UnexpectedEventError from "../../Source/Logging/Errors/UnexpectedEvent/UnexpectedEventError";

import { strictEqual, throws } from "assert";


describe("getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne", (): void => {

  const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

  it("One match", (): void => {
    strictEqual(
      getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  });

  it("More than one match", (): void => {

    strictEqual(
      getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne(
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
      getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne(
          sample,
          (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
          { throwErrorIfElementNotFoundOrMoreThan1: true }
        );
      },
      { name: UnexpectedEventError.name }
    );
  });
});

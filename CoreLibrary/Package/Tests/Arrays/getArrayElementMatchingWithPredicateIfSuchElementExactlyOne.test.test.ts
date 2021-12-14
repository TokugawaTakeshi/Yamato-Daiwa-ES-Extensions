import getArrayElementMatchingWithPredicateIfSuchElementExactlyOne from
    "../../Source/Arrays/getArrayElementMatchingWithPredicateIfSuchElementExactlyOne";
import UnexpectedEventError from "../../Source/Logging/Errors/UnexpectedEvent/UnexpectedEventError";

import { strictEqual, throws } from "assert";


describe("getArrayElementMatchingWithPredicateIfSuchElementExactlyOne", (): void => {

  const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

  it("One match", (): void => {
    strictEqual(
      getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  });

  it("More than one match", (): void => {

    strictEqual(
      getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
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
      getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
      ),
      null
    );

    throws(
      (): void => {
        getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
          sample,
          (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
          { throwErrorIfElementNotFoundOrMoreThan1: true }
        );
      },
      { name: UnexpectedEventError.name }
    );
  });
});

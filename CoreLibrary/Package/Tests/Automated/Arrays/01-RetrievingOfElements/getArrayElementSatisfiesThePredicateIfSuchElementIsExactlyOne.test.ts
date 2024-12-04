import {
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne, Logger,
  UnexpectedEventError
} from "../../../../Source";
import { test } from "node:test";
import Assert from "assert";


const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];


Promise.all([

  test("One Match", (): void => {
    Assert.strictEqual(
      getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
        sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
      ),
      "St. Louis"
    );
  }),

  test("More than One Match", (): void => {

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

  }),

  test("No Matches", (): void => {

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

  })


]).catch(Logger.logPromiseError);

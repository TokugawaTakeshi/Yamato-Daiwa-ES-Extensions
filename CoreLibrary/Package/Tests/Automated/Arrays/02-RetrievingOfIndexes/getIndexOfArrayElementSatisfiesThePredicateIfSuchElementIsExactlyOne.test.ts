import {
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne, Logger,
  UnexpectedEventError
} from "../../../../Source";
import Assert from "assert";
import { suite, test } from "node:test";


type Product = { ID: number; title: string; price: number; };

const sample: Array<Product> = [
  { ID: 1, title: "ALPHA", price: 100 },
  { ID: 2, title: "BRAVO", price: 500 }
];


Promise.all([

  suite(
    "Normal Scenarios",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Retrieving of Index of Existing Element",
          (): void => {
            Assert.strictEqual(
              getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                sample, (product: Product): boolean => product.ID === 2
              ),
              1
            );
          }
        ),

        test(
          "Retrieving of Null for non-exiting Element",
          (): void => {
            Assert.strictEqual(
              getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                sample, (product: Product): boolean => product.ID === 3
              ),
              null
            );
          }
        ),

        test(
          "Retrieving of Null for More than One Elements Satisfies the Predicate",
          (): void => {
            Assert.strictEqual(
              getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                sample, (product: Product): boolean => product.price > 50
              ),
              null
            );
          }
        )

      ]);

    }
  ),

  suite(
    "Errored Scenarios",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Throwing of the Error for non-exiting Element",
          (): void => {
            Assert.throws(
              (): void => {
                getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                  sample,
                  (product: Product): boolean => product.ID === 3,
                  { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
                );
              },
              UnexpectedEventError
            );
          }
        ),

        test(
          "Throwing of the Error for More than One Elements Satisfies the Predicate",
          (): void => {
            Assert.throws(
              (): void => {
                getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
                  sample,
                  (product: Product): boolean => product.price > 50,
                  { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
                );
              },
              UnexpectedEventError
            );
          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

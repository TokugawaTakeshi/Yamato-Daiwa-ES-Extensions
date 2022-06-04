import { getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne, UnexpectedEventError } from "../../Source";
import { strictEqual, throws } from "assert";


describe("getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne", (): void => {

  type Product = { ID: number; title: string; price: number; };

  const sample: Array<Product> = [
    { ID: 1, title: "ALPHA", price: 100 },
    { ID: 2, title: "BRAVO", price: 500 }
  ];

  describe("Normal scenarios", (): void => {

    it("Retrieving of existing element", (): void => {
      strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.ID === 2
        ),
        1
      );
    });

    it("Null for non-exiting element", (): void => {
      strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.ID === 3
        ),
        null
      );
    });

    it("Null for more that one element satisfies to predicate", (): void => {
      strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.price > 50
        ),
        null
      );
    });
  });


  describe("Errored scenarios", (): void => {

    it("Null for non-exiting element", (): void => {
      throws(
        (): void => {
          getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
            sample,
            (product: Product): boolean => product.ID === 3,
            { throwErrorIfElementNotFoundOrMoreThan1: true }
          );
        },
        UnexpectedEventError
      );
    });

    it("Null for more that one element satisfies to predicate", (): void => {
      throws(
        (): void => {
          getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
              sample,
              (product: Product): boolean => product.price > 50,
              { throwErrorIfElementNotFoundOrMoreThan1: true }
          );
        },
        UnexpectedEventError
      );
    });
  });
});

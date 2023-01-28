import { getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne, UnexpectedEventError } from "../../../Source";
import Assert from "assert";


describe("getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne", (): void => {

  type Product = { ID: number; title: string; price: number; };

  const sample: Array<Product> = [
    { ID: 1, title: "ALPHA", price: 100 },
    { ID: 2, title: "BRAVO", price: 500 }
  ];

  describe("Normal scenarios", (): void => {

    it("Retrieving of index of existing element", (): void => {
      Assert.strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.ID === 2
        ),
        1
      );
    });

    it("Retrieving of null for non-exiting element", (): void => {
      Assert.strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.ID === 3
        ),
        null
      );
    });

    it("Retrieving of null for more that one elements satisfies the predicate", (): void => {
      Assert.strictEqual(
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          sample, (product: Product): boolean => product.price > 50
        ),
        null
      );
    });

  });


  describe("Errored scenarios", (): void => {

    it("Throwing of the error for non-exiting element", (): void => {
      Assert.throws(
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

    it("Throwing of the error for more that one elements satisfies to predicate", (): void => {
      Assert.throws(
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

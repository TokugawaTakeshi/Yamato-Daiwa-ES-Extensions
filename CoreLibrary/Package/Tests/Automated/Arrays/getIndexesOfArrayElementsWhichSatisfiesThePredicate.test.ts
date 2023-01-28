import { getIndexesOfArrayElementsWhichSatisfiesThePredicate } from "../../../Source";
import Assert from "assert";


describe("getIndexesOfArrayElementsWhichSatisfiesThePredicate", (): void => {

  type Product = { title: string; price: number; };

  const sample: Array<Product> = [
    { title: "ALPHA", price: 100 },
    { title: "BRAVO", price: 500 },
    { title: "CHARLIE", price: 1000 },
    { title: "DELTA", price: 1500 }
  ];

  it("Works as intended", (): void => {

    Assert.deepStrictEqual(
      getIndexesOfArrayElementsWhichSatisfiesThePredicate(
        sample, (arrayElement: Product): boolean => arrayElement.price > 500
      ),
      [ 2, 3 ]
    );

    Assert.deepStrictEqual(
      getIndexesOfArrayElementsWhichSatisfiesThePredicate(
        sample, (arrayElement: Product): boolean => arrayElement.price > 1500
      ),
      []
    );

  });

});

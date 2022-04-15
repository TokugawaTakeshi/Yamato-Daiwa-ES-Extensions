import { getIndexesOfArrayElementsWhichSatisfiesThePredicate } from "../../Source";
import { deepStrictEqual } from "assert";


describe("getIndexesOfArrayElementsWhichSatisfiesThePredicate", (): void => {

  type Product = { title: string; price: number; };

  const sample: Array<Product> = [
    { title: "ALPHA", price: 100 },
    { title: "BRAVO", price: 500 },
    { title: "CHARLIE", price: 1000 },
    { title: "DELTA", price: 1500 }
  ];

  it("Works as intended", (): void => {

    deepStrictEqual(getIndexesOfArrayElementsWhichSatisfiesThePredicate(
      sample, (arrayElement: Product): boolean => arrayElement.price > 500
    ), [ 2, 3 ]);

    deepStrictEqual(getIndexesOfArrayElementsWhichSatisfiesThePredicate(
      sample, (arrayElement: Product): boolean => arrayElement.price > 1500
    ), []);
  });
});


type Product = { title: string; price: number; };

const products: Array<Product> = [ { title: "ALPHA", price: 100 }, { title: "BRAVO", price: 500 } ];

getIndexesOfArrayElementsWhichSatisfiesThePredicate(
  products, (product: Product): boolean => product.price > 300
)

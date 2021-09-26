import getIndexOfArrayElementByPredicate from "../../Source/Arrays/getIndexOfArrayElementByPredicate";
import { strictEqual } from "assert";


describe("getIndexOfArrayElementByPredicate", (): void => {

  type Product = { ID: number; title: string; price: number; };

  const sample: Array<Product> = [
    { ID: 1, title: "ALPHA", price: 100 },
    { ID: 2, title: "BRAVO", price: 500 }
  ];

  it("Works as intended", (): void => {

    strictEqual(
      getIndexOfArrayElementByPredicate(sample, (product: Product): boolean => product.ID === 2), 1
    );

    strictEqual(
      getIndexOfArrayElementByPredicate(sample, (product: Product): boolean => product.ID === 3), null
    );
  });
});

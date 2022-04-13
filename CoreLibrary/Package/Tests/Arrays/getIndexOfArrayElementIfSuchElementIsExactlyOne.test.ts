import { getIndexOfArrayElementIfSuchElementIsExactlyOne } from "../../Source";
import { strictEqual } from "assert";


describe("getIndexOfArrayElementIfSuchElementIsExactlyOne", (): void => {

  type Product = { ID: number; title: string; price: number; };

  const sample: Array<Product> = [
    { ID: 1, title: "ALPHA", price: 100 },
    { ID: 2, title: "BRAVO", price: 500 }
  ];

  it("Works as intended", (): void => {

    strictEqual(
      getIndexOfArrayElementIfSuchElementIsExactlyOne(sample, (product: Product): boolean => product.ID === 2), 1
    );

    strictEqual(
      getIndexOfArrayElementIfSuchElementIsExactlyOne(sample, (product: Product): boolean => product.ID === 3), null
    );
  });
});

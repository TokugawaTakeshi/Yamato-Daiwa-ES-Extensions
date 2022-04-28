import { replaceArrayElementsByIndexesImmutably } from "../../Source";
import { deepStrictEqual } from "assert";


describe("replaceArrayElementsByIndexesImmutably", (): void => {

  type Product = { title: string; price: number; };

  const sampleArray: Array<Product> = [
    { title: "ALPHA", price: 100 },
    { title: "BRAVO", price: 500 },
    { title: "CHARLIE", price: 1000 },
    { title: "DELTA", price: 1500 }
  ];

  it("One replacement", (): void => {

    deepStrictEqual(
      replaceArrayElementsByIndexesImmutably({
        targetArray: sampleArray,
        index: 2,
        newElement: { title: "GOLF", price: 2000 }
      }),
      [
        { title: "ALPHA", price: 100 },
        { title: "BRAVO", price: 500 },
        { title: "GOLF", price: 2000 },
        { title: "DELTA", price: 1500 }
      ]
    );
  });

  it("Multiple replacements", (): void => {

    deepStrictEqual(
      replaceArrayElementsByIndexesImmutably({
        targetArray: sampleArray,
        replacements: [
          { index: 2, newElement: { title: "GOLF", price: 2000 } },
          { index: 3, newElement: { title: "HOTEL", price: 5000 } }
        ]
      }),
      [
        { title: "ALPHA", price: 100 },
        { title: "BRAVO", price: 500 },
        { title: "GOLF", price: 2000 },
        { title: "HOTEL", price: 5000 }
      ]
    );
  });
});

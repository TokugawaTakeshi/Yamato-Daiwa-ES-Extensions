import { getIndexesOfSatisfiesThePredicateArrayElements, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.suite(
  "getIndexesOfSatisfiesThePredicateArrayElements",
  async (): Promise<void> => {

    type Product = { title: string; price: number; };

    const sample: Array<Product> = [
      { title: "ALPHA", price: 100 },
      { title: "BRAVO", price: 500 },
      { title: "CHARLIE", price: 1000 },
      { title: "DELTA", price: 1500 }
    ];


    await Testing.test(
      "Works as Intended",
      (): void => {

        Assert.deepStrictEqual(
          getIndexesOfSatisfiesThePredicateArrayElements(
            sample, (arrayElement: Product): boolean => arrayElement.price > 500
          ),
          [ 2, 3 ]
        );

        Assert.deepStrictEqual(
          getIndexesOfSatisfiesThePredicateArrayElements(
            sample, (arrayElement: Product): boolean => arrayElement.price > 1500
          ),
          []
        );

      }
    );

  }
).catch(Logger.logPromiseError);

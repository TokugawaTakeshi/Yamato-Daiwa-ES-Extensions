import { createArrayOfNaturalNumbers, InvalidParameterValueError, Logger } from "../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


suite("createArrayOfNaturalNumbers", async (): Promise<void> => {

  await suite("Normal scenarios", async (): Promise<void> => {

    await suite("Ascending order", (): void => {
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0 }), []);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1 }), [ 1 ]);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3 }), [ 1, 2, 3 ]);
    });

    await suite("Descending order", (): void => {

      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true }), []);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true }), [ 1 ]);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true }), [ 3, 2, 1 ]);

      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true, startingNumber: 2 }), []
      );
      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true, startingNumber: 2 }), [ 2 ]
      );
      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true, startingNumber: 4 }), [ 4, 3, 2 ]
      );

    });

  });

  await suite("Errored scenarios", async (): Promise<void> => {

    await test("Negative elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: -1 }); },
        InvalidParameterValueError
      );

    });

    await test("Fractional elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 1.2 }); },
        InvalidParameterValueError
      );

    });

    await test("Non-natural starting number", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 0 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 1.2 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: -3 }); },
        InvalidParameterValueError
      );

    });

    await test("With descending order the starting number is less than elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 5, startingNumber: 4, isDescendingOrder: true }); },
        InvalidParameterValueError
      );

    });

  });

}).catch(Logger.logPromiseError);

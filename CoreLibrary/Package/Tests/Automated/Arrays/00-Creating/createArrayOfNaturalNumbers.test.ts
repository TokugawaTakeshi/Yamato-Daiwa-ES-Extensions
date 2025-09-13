import { createArrayOfNaturalNumbers, InvalidParameterValueError, Logger } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


Promise.all([

  suite(
    "Normal Scenarios",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "Ascending Order",
          (): void => {
            Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0 }), []);
            Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1 }), [ 1 ]);
            Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3 }), [ 1, 2, 3 ]);
          }
        ),

        suite(
          "Descending Order",
          (): void => {

            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true }), []
            );
            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true }), [ 1 ]
            );
            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true }), [ 3, 2, 1 ]
            );

            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true, startingNumber: 2 }), []
            );
            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true, startingNumber: 2 }), [ 2 ]
            );
            Assert.deepStrictEqual(
              createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true, startingNumber: 4 }), [ 4, 3, 2 ]
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

        test("Negative Elements Count", (): void => {

          Assert.throws(
            (): void => { createArrayOfNaturalNumbers({ elementsCount: -1 }); },
            InvalidParameterValueError
          );

        }),

        test("Fractional Elements Count", (): void => {

          Assert.throws(
            (): void => { createArrayOfNaturalNumbers({ elementsCount: 1.2 }); },
            InvalidParameterValueError
          );

        }),

        test("Non-natural Starting Number", (): void => {

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

        }),

        test("With Descending Order the Starting number is Less than Elements Count", (): void => {

          Assert.throws(
            (): void => {
              createArrayOfNaturalNumbers({ elementsCount: 5, startingNumber: 4, isDescendingOrder: true });
            },
            InvalidParameterValueError
          );

        })

      ]);

    }
  )

]).catch(Logger.logPromiseError);

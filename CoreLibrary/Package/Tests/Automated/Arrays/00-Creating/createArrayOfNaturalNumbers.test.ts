import { createArrayOfNaturalNumbers, InvalidParameterValueError, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.suite(
  "createArrayOfNaturalNumbers",
  async (): Promise<void> => {

    await Promise.all([

      Testing.suite(
        "Normal Scenarios",
        async (): Promise<void> => {

          await Promise.all([

            Testing.suite(
              "Ascending Order",
              (): void => {
                Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0 }), []);
                Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1 }), [ 1 ]);
                Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3 }), [ 1, 2, 3 ]);
              }
            ),

            Testing.suite(
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

      Testing.suite(
        "Errored Scenarios",
        async (): Promise<void> => {

          await Promise.all([

            Testing.test("Negative Elements Count", (): void => {

              Assert.throws(
                (): void => { createArrayOfNaturalNumbers({ elementsCount: -1 }); },
                InvalidParameterValueError
              );

            }),

            Testing.test("Fractional Elements Count", (): void => {

              Assert.throws(
                (): void => { createArrayOfNaturalNumbers({ elementsCount: 1.2 }); },
                InvalidParameterValueError
              );

            }),

            Testing.test("Non-natural Starting Number", (): void => {

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

            Testing.test("With Descending Order the Starting number is Less than Elements Count", (): void => {

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

    ]);

  }

).catch(Logger.logPromiseError);

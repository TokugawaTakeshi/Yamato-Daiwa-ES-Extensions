import { moveArrayElementTo1Position, InvalidParameterValueError, Logger } from "../../../../Source";
import Assert from "assert";
import { test, suite } from "node:test";


function getInitialSampleArray(): Array<number> {
  return [ 1, 2, 3, 4, 5 ];
}


await Promise.all([

  suite(
    "Moving to Left",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "Mutable Moving",
          async (): Promise<void> => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            moveArrayElementTo1Position({
              mutably: true,
              targetArray: experimentalSample,
              targetElementNumber__numerationFrom1: 3,
              toLeft: true,
              errorMustBeThrownIf: { elementsCountIsLessThan2: true, targetElementNumberIsOutOfRange: true }
            });

            await Promise.all([

              test(
                "Updated Array is Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, [ 1, 3, 2, 4, 5 ]);
                }
              ),

              test(
                "Initial Array has mutated",
                (): void => {
                  Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                }
              )

            ]);

          }
        ),

        suite(
          "Immutable Moving",
          async (): Promise<void> => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementTo1Position({
              mutably: false,
              targetArray: experimentalSample,
              targetElementNumber__numerationFrom1: 3,
              toLeft: true,
              errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
            });

            await Promise.all([

              test(
                "Updated Array is Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 3, 2, 4, 5 ]);
                }
              ),

              test(
                "Initial Array has not Mutated",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "Moving to Right",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "Mutable Moving",
          async (): Promise<void> => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            moveArrayElementTo1Position({
              mutably: true,
              targetArray: experimentalSample,
              targetElementNumber__numerationFrom1: 3,
              toLeft: false,
              errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
            });

            await Promise.all([

              test(
                "Updated Array is Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, [ 1, 2, 4, 3, 5 ]);
                }
              ),

              test(
                "Initial Array has mutated",
                (): void => {
                  Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                }
              )

            ]);

          }
        ),

        suite(
          "Immutable Moving",
          async (): Promise<void> => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementTo1Position({
              mutably: false,
              targetArray: experimentalSample,
              targetElementNumber__numerationFrom1: 3,
              toLeft: false,
              errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
            });

            await Promise.all([

              test(
                "Updated Array is Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 2, 4, 3, 5 ]);
                }
              ),

              test(
                "Initial Array has not Mutated",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "Error Scenarios",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Throws Error when Array has Less than 2 Elements and \"errorMustBeThrownIf\" is true",
          (): void => {

            const experimentalSample: Array<number> = [ 1 ];

            Assert.throws(
              (): void => {
                moveArrayElementTo1Position({
                  mutably: true,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: 1,
                  toLeft: true,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: true, targetElementNumberIsOutOfRange: true }
                });
              },
              InvalidParameterValueError
            );

          }
        ),

        test(
          "Does not Throw Error when Array has Less than 2 Elements and \"errorMustBeThrownIf\" is false",
          (): void => {

            const experimentalSample: Array<number> = [ 1 ];

            Assert.doesNotThrow((): void => {
              moveArrayElementTo1Position({
                mutably: true,
                targetArray: experimentalSample,
                targetElementNumber__numerationFrom1: 1,
                toLeft: true,
                errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: true }
              });
            });

          }
        ),

        test(
          "Throws Error when Target Element Number is Out of Range and \"targetElementNumberIsOutOfRange\" is true",
          (): void => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            Assert.throws(
              (): void => {
                moveArrayElementTo1Position({
                  mutably: true,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: experimentalSample.length + 2,
                  toLeft: true,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: true }
                });
              },
              InvalidParameterValueError
            );

          }
        ),

        test(
          "Does not Throw Error when Target Element Number is Out of Range \"targetElementNumberIsOutOfRange\" is false",
          (): void => {

            const experimentalSample: Array<number> = getInitialSampleArray();

            Assert.doesNotThrow(
              (): void => {
                moveArrayElementTo1Position({
                  mutably: true,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: experimentalSample.length + 2,
                  toLeft: true,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
                });
              }
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

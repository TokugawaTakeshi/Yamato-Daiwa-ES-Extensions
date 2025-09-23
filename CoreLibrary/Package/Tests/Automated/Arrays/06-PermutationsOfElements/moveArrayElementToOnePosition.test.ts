import { moveArrayElementToOnePosition, InvalidParameterValueError, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


function getInitialSampleArray(): Array<number> {
  return [ 1, 2, 3, 4, 5 ];
}


Testing.suite(
  moveArrayElementToOnePosition.name,
  async (): Promise<void> => {

    await Promise.all([

      Testing.suite(
        "Moving to Left",
        async (): Promise<void> => {

          await Promise.all([

            Testing.suite(
              "Mutable Moving",
              async (): Promise<void> => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                moveArrayElementToOnePosition({
                  mutably: true,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: 3,
                  toLeft: true,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: true, targetElementNumberIsOutOfRange: true }
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ 1, 3, 2, 4, 5 ]);
                    }
                  ),

                  Testing.test(
                    "Initial Array has mutated",
                    (): void => {
                      Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                    }
                  )

                ]);

              }
            ),

            Testing.suite(
              "Immutable Moving",
              async (): Promise<void> => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementToOnePosition({
                  mutably: false,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: 3,
                  toLeft: true,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 3, 2, 4, 5 ]);
                    }
                  ),

                  Testing.test(
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

      Testing.suite(
        "Moving to Right",
        async (): Promise<void> => {

          await Promise.all([

            Testing.suite(
              "Mutable Moving",
              async (): Promise<void> => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                moveArrayElementToOnePosition({
                  mutably: true,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: 3,
                  toLeft: false,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ 1, 2, 4, 3, 5 ]);
                    }
                  ),

                  Testing.test(
                    "Initial Array has mutated",
                    (): void => {
                      Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                    }
                  )

                ]);

              }
            ),

            Testing.suite(
              "Immutable Moving",
              async (): Promise<void> => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementToOnePosition({
                  mutably: false,
                  targetArray: experimentalSample,
                  targetElementNumber__numerationFrom1: 3,
                  toLeft: false,
                  errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 2, 4, 3, 5 ]);
                    }
                  ),

                  Testing.test(
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

      Testing.suite(
        "Error Scenarios",
        async (): Promise<void> => {

          await Promise.all([

            Testing.test(
              "Throws Error when Array has Less than 2 Elements and \"errorMustBeThrownIf\" is true",
              (): void => {

                const experimentalSample: Array<number> = [ 1 ];

                Assert.throws(
                  (): void => {
                    moveArrayElementToOnePosition({
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

            Testing.test(
              "Does not Throw Error when Array has Less than 2 Elements and \"errorMustBeThrownIf\" is false",
              (): void => {

                const experimentalSample: Array<number> = [ 1 ];

                Assert.doesNotThrow((): void => {
                  moveArrayElementToOnePosition({
                    mutably: true,
                    targetArray: experimentalSample,
                    targetElementNumber__numerationFrom1: 1,
                    toLeft: true,
                    errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: true }
                  });
                });

              }
            ),

            Testing.test(
              "Throws Error when Target Element Number is Out of Range and \"targetElementNumberIsOutOfRange\" is true",
              (): void => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                Assert.throws(
                  (): void => {
                    moveArrayElementToOnePosition({
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

            Testing.test(
              "Does not Throw Error when Target Element Number is Out of Range \"targetElementNumberIsOutOfRange\" is false",
              (): void => {

                const experimentalSample: Array<number> = getInitialSampleArray();

                Assert.doesNotThrow(
                  (): void => {
                    moveArrayElementToOnePosition({
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

    ])

  }
).catch(Logger.logPromiseError);


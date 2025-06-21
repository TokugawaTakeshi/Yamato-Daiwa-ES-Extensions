import { cropArray, InvalidParameterValueError, Logger } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


function generateConstantSample(): Array<string> {
  return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ];
}


Promise.all([

  suite(
    "With `endingElementNumber__numerationFrom0` ...",
    async (): Promise<void> => {

      const endingElementNumber__numerationFrom0: number = 3;

      await Promise.all([

        suite(
          "... and `startingElementNumber__numerationFrom0` Options",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )
                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "...and `startingElementNumber__numerationFrom1` Options",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 2,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 2,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... `fromStart` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    endingElementNumber__numerationFrom0,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "With `endingElementNumber__numerationFrom1` ....",
    async (): Promise<void> => {

      const endingElementNumber__numerationFrom1: number = 4;

      await Promise.all([

        suite(
          "... and `startingElementNumber__numerationFrom0` Options",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    endingElementNumber__numerationFrom1,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    endingElementNumber__numerationFrom1,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... and `startingElementNumber__numerationFrom1` Options",
          async (): Promise<void> => {

            await suite(
              "Mutably",
              async (): Promise<void> => {

                const experimentalSample: Array<string> = generateConstantSample();

                cropArray({
                  targetArray: experimentalSample,
                  startingElementNumber__numerationFrom1: 2,
                  endingElementNumber__numerationFrom1,
                  mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                  mutably: true
                });

                await Promise.all([

                  test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                    }
                  ),

                  test(
                    "Initial Array has Mutated",
                    (): void => {
                      Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                    }
                  )

                ]);

              }
            );

            await suite("Immutably", async (): Promise<void> => {

              const experimentalSample: Array<string> = generateConstantSample();

              const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                targetArray: experimentalSample,
                startingElementNumber__numerationFrom1: 2,
                endingElementNumber__numerationFrom1,
                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                mutably: false
              });

              await Promise.all([

                test(
                    "Updated Array is Matching with Expected One",
                  (): void => {
                    Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                  }
                ),

                test(
                  "Initial Array has not Mutated",
                  (): void => {
                    Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                  }
                )

              ]);

            });

          }
        ),

        suite(
          "... and `fromStart` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    endingElementNumber__numerationFrom1,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected", (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    endingElementNumber__numerationFrom1,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "With `elementsCount` Option",
    async (): Promise<void> => {

      const elementsCount: number = 3;

      await Promise.all([

        suite(
          "... and `startingElementNumber__numerationFrom0` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching With Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 1,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching With Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... and `startingElementNumber__numerationFrom1` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 2,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 2,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One", (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... and with `fromStart` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
                      }
                    ),

                    test(
                      "Initial array has mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    elementsCount,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "With `untilEnd` option",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "...and with `startingElementNumber__numerationFrom0` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 2,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom0: 2,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... and with `startingElementNumber__numerationFrom1` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 3,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected Once",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    startingElementNumber__numerationFrom1: 3,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        ),

        suite(
          "... and With `fromStart` Option",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: true
                  });

                  return test(
                    "Updated Array is Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                    }
                  );

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = generateConstantSample();

                  const updatedCopyOfExperimentalSample: Array<string> = cropArray({
                    targetArray: experimentalSample,
                    fromStart: true,
                    untilEnd: true,
                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                      }
                    ),

                    test(
                      "Initial Array has not Mutated",
                      (): void => {
                        Assert.deepStrictEqual(experimentalSample, generateConstantSample());
                      }
                    )

                  ]);

                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  suite(
    "Behaviour in out of Range Case",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Cropping until Last Element",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = generateConstantSample();

            cropArray({
              targetArray: experimentalSample,
              startingElementNumber__numerationFrom0: 1,
              endingElementNumber__numerationFrom0: experimentalSample.length,
              mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
              mutably: true
            });

            await test(
              "Updated Array is Matching With Expected One",
              (): void => {
                Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
              }
            );

          }
        ),

        test(
          "Error has been Thrown",
          (): void => {

            const experimentalSample: Array<string> = generateConstantSample();

            Assert.throws(
              (): void => {
                cropArray({
                  targetArray: experimentalSample,
                  startingElementNumber__numerationFrom0: 1,
                  endingElementNumber__numerationFrom0: experimentalSample.length,
                  mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                  mutably: true
                });
              },
              InvalidParameterValueError
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

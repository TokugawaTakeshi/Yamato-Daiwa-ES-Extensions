import { addElementsToArray, Logger } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


function getInitialSampleArray(): Array<string> {
  return [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];
}

Promise.all([

  suite(
    "One",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "To Start",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toStart: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }

              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toStart: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
          "To End",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toEnd: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toEnd: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
                        );
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
          "To Position Numerated From 0",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toPosition__numerationFrom0: 1,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toPosition__numerationFrom0: 1,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
          "To Position Numerated From 1",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toPosition__numerationFrom1: 2,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1" ],
                    toPosition__numerationFrom1: 2,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
        )

      ]);

    }
  ),

  suite(
    "Multiple",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "To Start",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toStart: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                     "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toStart: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
          "To End",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toEnd: true,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toEnd: true,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
                        );
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
          "To Position Numerated From 0",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toPosition__numerationFrom0: 1,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toPosition__numerationFrom0: 1,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
          "To Position Numerated From 1",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "Mutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toPosition__numerationFrom1: 2,
                    mutably: true
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          experimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
                      }
                    ),

                    test(
                      "Initial Array has Mutated",
                      (): void => {
                        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
                      }
                    )

                  ]);

                }
              ),

              suite(
                "Immutably",
                async (): Promise<void> => {

                  const experimentalSample: Array<string> = getInitialSampleArray();

                  const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
                    targetArray: experimentalSample,
                    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
                    toPosition__numerationFrom1: 2,
                    mutably: false
                  });

                  await Promise.all([

                    test(
                      "Updated Array is Matching with Expected One",
                      (): void => {
                        Assert.deepStrictEqual(
                          updatedCopyOfExperimentalSample,
                          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
                        );
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
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

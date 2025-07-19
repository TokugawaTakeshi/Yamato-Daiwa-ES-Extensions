import { InvalidParameterValueError, Logger } from "../../../../Source";
import cropArray from "../../../../Source/Arrays/03-RetrievingOfSubarrays/cropArray";
import { suite, test } from "node:test";
import Assert from "assert";


function generateConstantSample(): Array<string> {
  return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ];
}


Promise.all([

  suite(
    "Cropping From Start To End",
    async (): Promise<void> => {

      await Promise.all([

        suite(
          "With `startingElementNumber__numerationFrom0` ...",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "... and `endingElementNumber__numerationFrom0__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                test(
                                  "Cropped Array is Mathing with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom0: 1,
                                    endingElementNumber__numerationFrom0__including: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `endingElementNumber__numerationFrom1__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([

                                test(
                                  "Cropped Array is Mathing with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),

                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom0: 1,
                                    endingElementNumber__numerationFrom1__including: 4,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `endingElementNumber__numerationFrom0__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom0__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom0__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([

                                test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),

                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect New One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect Source One",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom0: 1,
                                    endingElementNumber__numerationFrom0__notIncluding: 4,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom0__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom0__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `endingElementNumber__numerationFrom1__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom1__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom1__notIncluding: 11,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom1__notIncluding: 11,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                endingElementNumber__numerationFrom1__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([

                                test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE" ]);
                                  }
                                ),

                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom0: 1,
                                    endingElementNumber__numerationFrom1__notIncluding: 4,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 1,
                                          endingElementNumber__numerationFrom1__notIncluding: 11,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 1,
                                      endingElementNumber__numerationFrom1__notIncluding: 11,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `elementsCount` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                elementsCount: 3,
                                mutably: true,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 3,
                                          elementsCount: 5,
                                          mutably: true,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 3,
                                      elementsCount: 5,
                                      mutably: true,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
                                    });

                                    Assert.deepStrictEqual(sample, [ "DELTA", "GOLF" ]);
                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              const result: ReadonlyArray<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 1,
                                elementsCount: 3,
                                mutably: false,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                              });

                              Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 4,
                                          elementsCount: 3,
                                          mutably: false,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    const result: ReadonlyArray<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 4,
                                      elementsCount: 3,
                                      mutably: false,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
                                    });

                                    Assert.deepStrictEqual(result, [ "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `untilLastElement` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 2,
                                untilLastElement: true,
                                mutably: true,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                              });

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "GOLF" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 5,
                                          untilLastElement: true,
                                          mutably: true,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 5,
                                      untilLastElement: true,
                                      mutably: true,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
                                    });

                                    Assert.deepStrictEqual(sample, []);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              const result: ReadonlyArray<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom0: 2,
                                untilLastElement: true,
                                mutably: false,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                              });

                              Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "GOLF" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());
                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom0: 6,
                                          untilLastElement: true,
                                          mutably: false,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    const result: ReadonlyArray<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom0: 6,
                                      untilLastElement: true,
                                      mutably: false,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
                                    });

                                    Assert.deepStrictEqual(result, []);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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

            ]);

          }

        ),

        suite(
          "With `startingElementNumber__numerationFrom1` ...",
          async (): Promise<void> => {

            await Promise.all([

              suite(
                "... and `endingElementNumber__numerationFrom0__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 2,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 2,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect Cropped One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect Source One",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom1: 2,
                                    endingElementNumber__numerationFrom0__including: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 2,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 2,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `endingElementNumber__numerationFrom1__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 2,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 2,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await test(
                                "Changing of Primitive-type Element of Source Array does Not Affect Cropped One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect Source One",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom1: 2,
                                    endingElementNumber__numerationFrom1__including: 4,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 2,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 2,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `endingElementNumber__numerationFrom0__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",

                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 1,
                                          endingElementNumber__numerationFrom0__notIncluding: 99,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 1,
                                      endingElementNumber__numerationFrom0__notIncluding: 99,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [
                                      "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF"
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
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              const result: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 1,
                                          endingElementNumber__numerationFrom0__notIncluding: 99,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 1,
                                      endingElementNumber__numerationFrom0__notIncluding: 99,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);

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
                "... and `endingElementNumber__numerationFrom1__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom1__notIncluding: 5,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 3,
                                          endingElementNumber__numerationFrom1__notIncluding: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 3,
                                      endingElementNumber__numerationFrom1__notIncluding: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              const result: ReadonlyArray<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                endingElementNumber__numerationFrom1__notIncluding: 5,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 3,
                                          endingElementNumber__numerationFrom1__notIncluding: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 3,
                                      endingElementNumber__numerationFrom1__notIncluding: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `elementsCount` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                elementsCount: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 4,
                                          elementsCount: 5,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 4,
                                      elementsCount: 5,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "DELTA", "GOLF" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              const result: ReadonlyArray<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 2,
                                elementsCount: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());

                            }
                          ),

                          suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                test(
                                  "Throwing of Error",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: sample,
                                          fromStart: true,
                                          startingElementNumber__numerationFrom1: 4,
                                          elementsCount: 5,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );

                                  }
                                ),

                                test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: ReadonlyArray<string> = generateConstantSample();

                                    const result: ReadonlyArray<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      startingElementNumber__numerationFrom1: 4,
                                      elementsCount: 5,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "DELTA", "GOLF" ]);
                                    Assert.deepStrictEqual(sample, generateConstantSample());

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
                "... and `untilLastElement` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 3,
                                untilLastElement: true,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "GOLF" ]);

                            }
                          ),

                          test(
                            "Out-of-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              Assert.throws(
                                (): void => {
                                  cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom1: 10,
                                    untilLastElement: true,
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
                    ),

                    suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          test(
                            "In-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              const result: ReadonlyArray<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                startingElementNumber__numerationFrom1: 3,
                                untilLastElement: true,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "GOLF" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());

                            }
                          ),

                          test(
                            "Out-of-range Request",
                            (): void => {

                              const sample: ReadonlyArray<string> = generateConstantSample();

                              Assert.throws(
                                (): void => {
                                  cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    startingElementNumber__numerationFrom1: 10,
                                    untilLastElement: true,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });
                                },
                                InvalidParameterValueError
                              );

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

      ]);

    }
  ),

  suite(
    "Cropping From End To Start",
    async (): Promise<void> => {
      // TODO
    }
  )

]).catch(Logger.logPromiseError);

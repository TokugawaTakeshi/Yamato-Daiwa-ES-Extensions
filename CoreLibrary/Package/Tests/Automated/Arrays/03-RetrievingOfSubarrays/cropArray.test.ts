import { cropArray, InvalidParameterValueError, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


function generateConstantSample(): Array<string> {
  return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];
}


Promise.all([

  Testing.suite(
    "Cropping From Start To End",
    async (): Promise<void> => {

      await Promise.all([

        Testing.suite(
          "With `startingElementNumber__numerationFrom0` ...",
          async (): Promise<void> => {

            await Promise.all([

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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
                                Testing.test(
                                  "Cropped Array is Mathing with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom1__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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

                                Testing.test(
                                  "Cropped Array is Mathing with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),

                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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

                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),

                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect New One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom1__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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

                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE" ]);
                                  }
                                ),

                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )

                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `elementsCount` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "DELTA", "ECHO" ]);
                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "ECHO" ]);
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

              Testing.suite(
                "... and `untilLastElement` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "ECHO" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                              Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "ECHO" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());
                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

        Testing.suite(
          "With `startingElementNumber__numerationFrom1` ...",
          async (): Promise<void> => {

            await Promise.all([

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect Cropped One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom1__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
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
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect Cropped One",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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
                                      "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO"
                                    ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ]);

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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom1__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `elementsCount` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(sample, [ "DELTA", "ECHO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
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

                                Testing.test(
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

                                    Assert.deepStrictEqual(result, [ "DELTA", "ECHO" ]);
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

              Testing.suite(
                "... and `untilLastElement` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA", "ECHO" ]);

                            }
                          ),

                          Testing.test(
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

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
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

                              Assert.deepStrictEqual(result, [ "CHARLIE", "DELTA", "ECHO" ]);
                              Assert.deepStrictEqual(sample, generateConstantSample());

                            }
                          ),

                          Testing.test(
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
        ),

        Testing.suite(
          "With `fromFirstElement` ...",
          async (): Promise<void> => {

            await Promise.all([

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, generateConstantSample());

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom0__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    fromFirstElement: true,
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom0__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom0__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, generateConstantSample());
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

              Testing.suite(
                  "... and `endingElementNumber__numerationFrom1__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, generateConstantSample());

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom1__including: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    fromFirstElement: true,
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom1__including: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom1__including: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, generateConstantSample());
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom0__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom0__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom0__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, generateConstantSample());

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom0__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    fromFirstElement: true,
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom0__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom0__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, generateConstantSample());
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

              Testing.suite(
                "... and `endingElementNumber__numerationFrom1__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom1__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom1__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom1__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, generateConstantSample());

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                endingElementNumber__numerationFrom1__notIncluding: 4,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    fromFirstElement: true,
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

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          endingElementNumber__numerationFrom1__notIncluding: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      endingElementNumber__numerationFrom1__notIncluding: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, generateConstantSample());
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

              Testing.suite(
                "... and `elementsCount` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                elementsCount: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          elementsCount: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      elementsCount: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, generateConstantSample());

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromStart: true,
                                fromFirstElement: true,
                                elementsCount: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromStart: true,
                                    fromFirstElement: true,
                                    elementsCount: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromStart: true,
                                          fromFirstElement: true,
                                          elementsCount: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromStart: true,
                                      fromFirstElement: true,
                                      elementsCount: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, generateConstantSample());
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

              Testing.suite(
                "... and `untilLastElement` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        const sample: Array<string> = generateConstantSample();

                        cropArray({
                          targetArray: sample,
                          fromStart: true,
                          fromFirstElement: true,
                          untilLastElement: true,
                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                          mutably: true
                        });

                        await Testing.test(
                          "Cropped Array is Matching with Expected One",
                          (): void => {
                            Assert.deepStrictEqual(sample, generateConstantSample());
                          }
                        );

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        let sample: Array<string> = generateConstantSample();

                        let croppedArray: Array<string> = cropArray({
                          targetArray: sample,
                          fromStart: true,
                          fromFirstElement: true,
                          untilLastElement: true,
                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                          mutably: false
                        });

                        await Promise.all([
                          Testing.test(
                            "Cropped Array is Matching with Expected One",
                            (): void => {
                              Assert.deepStrictEqual(croppedArray, generateConstantSample());
                            }
                          ),
                          Testing.test(
                            "Source Array has Not Changed",
                            (): void => {
                              Assert.deepStrictEqual(sample, generateConstantSample());
                            }
                          )
                        ]);

                        await Testing.test(
                          "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                          (): void => {

                            sample[0] = "__NEW_ELEMENT__";

                            Assert.deepStrictEqual(croppedArray, generateConstantSample());

                          }
                        );

                        await Testing.test(
                          "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                          (): void => {

                            sample = generateConstantSample();

                            croppedArray = cropArray({
                              targetArray: sample,
                              fromStart: true,
                              fromFirstElement: true,
                              untilLastElement: true,
                              mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                              mutably: false
                            });

                            croppedArray[0] = "__NEW_ELEMENT__";

                            Assert.deepStrictEqual(sample, generateConstantSample());

                          }
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
  ),

  Testing.suite(
    "Cropping From End To Start",
    async (): Promise<void> => {

      await Promise.all([

        Testing.suite(
          "With `rightElementNumber__numerationFrom0_AndRight` ...",
          async (): Promise<void> => {

            await Promise.all([

              Testing.suite(
                "... and `leftElementNumber__numerationFrom0_AndRight__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom0_AndRight__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "BRAVO", "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom0_AndRight__including: 6,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom0_AndRight__including: 6,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom0_AndRight__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[1] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "BRAVO", "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromEnd: true,
                                    rightElementNumber__numerationFrom0_AndRight: 1,
                                    leftElementNumber__numerationFrom0_AndRight__including: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom0_AndRight__including: 6,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom0_AndRight__including: 6,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO" ]);
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

              Testing.suite(
                "... and `leftElementNumber__numerationFrom1_AndRight__including` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom1_AndRight__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom1_AndRight__including: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom1_AndRight__including: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom1_AndRight__including: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[2] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromEnd: true,
                                    rightElementNumber__numerationFrom0_AndRight: 1,
                                    leftElementNumber__numerationFrom1_AndRight__including: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom1_AndRight__including: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom1_AndRight__including: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO" ]);
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

              Testing.suite(
                "... and `leftElementNumber__numerationFrom0_AndRight__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom0_AndRight__notIncluding: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom0_AndRight__notIncluding: 6,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom0_AndRight__notIncluding: 6,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom0_AndRight__notIncluding: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[2] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromEnd: true,
                                    rightElementNumber__numerationFrom0_AndRight: 1,
                                    leftElementNumber__numerationFrom0_AndRight__notIncluding: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom0_AndRight__notIncluding: 6,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom0_AndRight__notIncluding: 6,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO" ]);
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

              Testing.suite(
                "... and `leftElementNumber__numerationFrom1_AndRight__notIncluding` Options",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom1_AndRight__notIncluding: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom1_AndRight__notIncluding: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom1_AndRight__notIncluding: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                leftElementNumber__numerationFrom1_AndRight__notIncluding: 3,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[3] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromEnd: true,
                                    rightElementNumber__numerationFrom0_AndRight: 1,
                                    leftElementNumber__numerationFrom1_AndRight__notIncluding: 3,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 3,
                                          leftElementNumber__numerationFrom1_AndRight__notIncluding: 7,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 3,
                                      leftElementNumber__numerationFrom1_AndRight__notIncluding: 7,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO" ]);
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

              Testing.suite(
                "... and `elementsCount` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.test(
                            "In-range Request",
                            (): void => {

                              const sample: Array<string> = generateConstantSample();

                              cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                elementsCount: 2,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: true
                              });

                              Assert.deepStrictEqual(sample, [ "CHARLIE", "DELTA" ]);

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 1,
                                          elementsCount: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: true
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 1,
                                      elementsCount: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: true
                                    });

                                    Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);

                                  }
                                )

                              ]);

                            }
                          )

                        ]);

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Promise.all([

                          Testing.suite(
                            "In-range Request",
                            async (): Promise<void> => {

                              let sample: Array<string> = generateConstantSample();

                              let croppedArray: Array<string> = cropArray({
                                targetArray: sample,
                                fromEnd: true,
                                rightElementNumber__numerationFrom0_AndRight: 1,
                                elementsCount: 2,
                                mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                mutably: false
                              });

                              await Promise.all([
                                Testing.test(
                                  "Cropped Array is Matching with Expected One",
                                  (): void => {
                                    Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);
                                  }
                                ),
                                Testing.test(
                                  "Source Array has Not Changed",
                                  (): void => {
                                    Assert.deepStrictEqual(sample, generateConstantSample());
                                  }
                                )
                              ]);

                              await Testing.test(
                                "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                                (): void => {

                                  sample[2] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(croppedArray, [ "CHARLIE", "DELTA" ]);

                                }
                              );

                              await Testing.test(
                                "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                                (): void => {

                                  sample = generateConstantSample();

                                  croppedArray = cropArray({
                                    targetArray: sample,
                                    fromEnd: true,
                                    rightElementNumber__numerationFrom0_AndRight: 1,
                                    elementsCount: 2,
                                    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                    mutably: false
                                  });

                                  croppedArray[0] = "__NEW_ELEMENT__";

                                  Assert.deepStrictEqual(sample, generateConstantSample());

                                }
                              );

                            }
                          ),

                          Testing.suite(
                            "Out-of-range Request",
                            async (): Promise<void> => {

                              await Promise.all([

                                Testing.test(
                                  "Throwing of Error",
                                  (): void => {
                                    Assert.throws(
                                      (): void => {
                                        cropArray({
                                          targetArray: generateConstantSample(),
                                          fromEnd: true,
                                          rightElementNumber__numerationFrom0_AndRight: 1,
                                          elementsCount: 10,
                                          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                          mutably: false
                                        });
                                      },
                                      InvalidParameterValueError
                                    );
                                  }
                                ),

                                Testing.test(
                                  "Ignoring of Invalid Range",
                                  (): void => {

                                    const sample: Array<string> = generateConstantSample();

                                    const result: Array<string> = cropArray({
                                      targetArray: sample,
                                      fromEnd: true,
                                      rightElementNumber__numerationFrom0_AndRight: 1,
                                      elementsCount: 10,
                                      mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
                                      mutably: false
                                    });

                                    Assert.deepStrictEqual(result, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
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

              Testing.suite(
                "... and `untilLeftmostElement` Option",
                async (): Promise<void> => {

                  await Promise.all([

                    Testing.suite(
                      "Mutably",
                      async (): Promise<void> => {

                        await Testing.test(
                          "In-range Request",
                          (): void => {

                            const sample: Array<string> = generateConstantSample();

                            cropArray({
                              targetArray: sample,
                              fromEnd: true,
                              rightElementNumber__numerationFrom0_AndRight: 2,
                              untilLeftmostElement: true,
                              mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                              mutably: true
                            });

                            Assert.deepStrictEqual(sample, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                          }
                        );

                      }
                    ),

                    Testing.suite(
                      "Immutably",
                      async (): Promise<void> => {

                        await Testing.suite(
                          "In-range Request",
                          async (): Promise<void> => {

                            let sample: Array<string> = generateConstantSample();

                            let croppedArray: Array<string> = cropArray({
                              targetArray: sample,
                              fromEnd: true,
                              rightElementNumber__numerationFrom0_AndRight: 2,
                              untilLeftmostElement: true,
                              mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                              mutably: false
                            });

                            await Promise.all([
                              Testing.test(
                                "Cropped Array is Matching with Expected One",
                                (): void => {
                                  Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);
                                }
                              ),
                              Testing.test(
                                "Source Array has Not Changed",
                                (): void => {
                                  Assert.deepStrictEqual(sample, generateConstantSample());
                                }
                              )
                            ]);

                            await Testing.test(
                              "Changing of Primitive-type Element of Source Array does Not Affect to New one",
                              (): void => {

                                sample[0] = "__NEW_ELEMENT__";

                                Assert.deepStrictEqual(croppedArray, [ "ALPHA", "BRAVO", "CHARLIE" ]);

                              }
                            );

                            await Testing.test(
                              "Changing of Primitive-type Element of Cropped Array does Not Affect to Source one",
                              (): void => {

                                sample = generateConstantSample();

                                croppedArray = cropArray({
                                  targetArray: sample,
                                  fromEnd: true,
                                  rightElementNumber__numerationFrom0_AndRight: 2,
                                  untilLeftmostElement: true,
                                  mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
                                  mutably: false
                                });

                                croppedArray[0] = "__NEW_ELEMENT__";

                                Assert.deepStrictEqual(sample, generateConstantSample());

                              }
                            );

                          }
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

]).catch(Logger.logPromiseError);

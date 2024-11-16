import { swapArrayElements, Logger } from "../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


function generateConstantSample(
    { willLastElementBeSwapped }: Readonly<{ willLastElementBeSwapped: boolean; }>
): Array<string> {
  return willLastElementBeSwapped ?
      [ "ALPHA", "HOTEL", "CHARLIE", "DELTA", "BRAVO" ] :
      [ "ALPHA", "DELTA", "CHARLIE", "BRAVO", "HOTEL" ];
}

const expectedOutputArray: ReadonlyArray<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "HOTEL" ];

suite(
    "One Element Specified via `position__numerationFrom0`",
    async (): Promise<void> => {

      await suite(
          "Other Element Specified via `position__numerationFrom0`",
          async (): Promise<void> => {

            await suite(
                "Mutable Swapping",
                async (): Promise<void> => {

                  const sampleArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: false });

                  swapArrayElements({
                    targetArray: sampleArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      position__numerationFrom0: 3,
                      mustThrowErrorIfNotFound: true
                    },
                    mutably: true,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(sampleArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has Changed",
                      (): void => {
                        Assert.notDeepStrictEqual(sampleArray, generateConstantSample({ willLastElementBeSwapped: false }));
                      }
                  );

                }
            );

            await suite(
                "Immutable Swapping",
                async (): Promise<void> => {

                  const initialArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: false });

                  const updatedArray: Array<string> = swapArrayElements({
                    targetArray: initialArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      position__numerationFrom0: 3,
                      mustThrowErrorIfNotFound: true
                    },
                    mutably: false,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has not Changed",
                      (): void => {
                        Assert.deepStrictEqual(initialArray, generateConstantSample({ willLastElementBeSwapped: false }));
                      }
                  );

                }
            );

          }
      );

      await suite(
          "Other Element Specified via `position__numerationFrom1`",
          async (): Promise<void> => {

            await suite(
                "Mutable Swapping",
                async (): Promise<void> => {

                  const sampleArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: false });

                  swapArrayElements({
                    targetArray: sampleArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      position__numerationFrom1: 4,
                      mustThrowErrorIfNotFound: true
                    },
                    mutably: true,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(sampleArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has Changed",
                      (): void => {
                        Assert.notDeepStrictEqual(sampleArray, generateConstantSample({ willLastElementBeSwapped: false }));
                      }
                  );

                }
            );

            await suite(
                "Immutable Swapping",
                async (): Promise<void> => {

                  const initialArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: false });

                  const updatedArray: Array<string> = swapArrayElements({
                    targetArray: initialArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      position__numerationFrom1: 4,
                      mustThrowErrorIfNotFound: true
                    },
                    mutably: false,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has not Changed",
                      (): void => {
                        Assert.deepStrictEqual(initialArray, generateConstantSample({ willLastElementBeSwapped: false }));
                      }
                  );

                }
            );

          }
      );

      await suite(
          "Other Element Specified via `isLastOne`",
          async (): Promise<void> => {

            await suite(
                "Mutable Swapping",
                async (): Promise<void> => {

                  const sampleArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: true });

                  swapArrayElements({
                    targetArray: sampleArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      isLastOne: true
                    },
                    mutably: true,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(sampleArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has Changed",
                      (): void => {
                        Assert.notDeepStrictEqual(sampleArray, generateConstantSample({ willLastElementBeSwapped: true }));
                      }
                  );

                }
            );

            await suite(
                "Immutable Swapping",
                async (): Promise<void> => {

                  const initialArray: Array<string> = generateConstantSample({ willLastElementBeSwapped: true });

                  console.log("********************************");

                  const updatedArray: Array<string> = swapArrayElements({
                    targetArray: initialArray,
                    oneElement: {
                      position__numerationFrom0: 1,
                      mustThrowErrorIfNotFound: true
                    },
                    otherElement: {
                      isLastOne: true
                    },
                    mutably: false,
                    mustThrowErrorIfTargetArrayIsEmpty: true,
                    mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: true
                  });

                  await test(
                      "The Updated Array is Deeply Equals to Expected One",
                      (): void => {
                        Assert.deepStrictEqual(updatedArray, expectedOutputArray);
                      }
                  );

                  await test(
                      "Initial Array has not Changed",
                      (): void => {
                        Assert.deepStrictEqual(initialArray, generateConstantSample({ willLastElementBeSwapped: true }));
                      }
                  );

                }
            );

          }
      );

    }
).catch(Logger.logPromiseError);

//       await suite(
//         "One element specified via `isLastOne`",
//         (): void => {
//
//         }
//       );
//
//       await suite(
//         "One element specified via `finder`",
//         (): void => {
//
//         }
//       );
//
//       await suite(
//         "Other element is out of range",
//         async (): Promise<void> => {
//
//           await test(
//             "Error has been thrown when `mustThrowErrorIfNotFound` option is truthy",
//             (): void => {
//               // TODO
//             }
//           );
//
//         }
//       );
//
//     });
//
// await suite("One element specified via `position__numerationFrom1`", async (): Promise<void> => {
//
//   await suite("Other element specified via `position__numerationFrom0`", (): void => {
//
//   });
//
//   await suite("One element specified via `position__numerationFrom1`", (): void => {
//
//   });
//
//   await suite("One element specified via `isLastOne`", (): void => {
//
//   });
//
//   await suite("One element specified via `finder`", (): void => {
//
//   });
//
// });
//
// await suite("One element specified via `isLastOne`", async (): Promise<void> => {
//
//   await suite("Other element specified via `position__numerationFrom0`", (): void => {
//
//   });
//
//   await suite("One element specified via `position__numerationFrom1`", (): void => {
//
//   });
//
//   await suite("One element specified via `isLastOne`", (): void => {
//
//   });
//
//   await suite("One element specified via `finder`", (): void => {
//
//   });
//
// });
//
// await suite("One element specified via `finder`", async (): Promise<void> => {
//
//   await suite("Other element specified via `position__numerationFrom0`", (): void => {
//
//   });
//
//   await suite("One element specified via `position__numerationFrom1`", (): void => {
//
//   });
//
//   await suite("One element specified via `isLastOne`", (): void => {
//
//   });
//
//   await suite("One element specified via `finder`", (): void => {
//
//   });
//
// });

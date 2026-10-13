import {
  Logger,
  ObjectTypeElementsArrayOrdererByMultipleFields
} from "../../../../Source";
import Testing from "node:test";
import Asset from "node:assert";


Testing.describe(
  "OrdererByMultipleFields",
  async (): Promise<void> => {

    await Promise.all([

      /* ━━━ Ordering by 1 Field ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      Testing.describe(
        "Ordering by 1 Field",
        async (): Promise<void> => {

          type Sample = Readonly<{
            ID: number;
            latinCharacter: string;
          }>;

          function getExpectedOutput(): Array<Sample> {
            return [
              {
                ID: 1,
                latinCharacter: "A"
              },
              {
                ID: 2,
                latinCharacter: "A"
              },
              {
                ID: 3,
                latinCharacter: "B"
              },
              {
                ID: 4,
                latinCharacter: "C"
              },
              {
                ID: 5,
                latinCharacter: "C"
              },
              {
                ID: 6,
                latinCharacter: "C"
              }
            ];
          }

          function getConstantSample(): Array<Sample> {
            return [
              {
                ID: 2,
                latinCharacter: "A"
              },
              {
                ID: 6,
                latinCharacter: "C"
              },
              {
                ID: 4,
                latinCharacter: "C"
              },
              {
                ID: 1,
                latinCharacter: "A"
              },
              {
                ID: 3,
                latinCharacter: "B"
              },
              {
                ID: 5,
                latinCharacter: "C"
              }
            ];
          }

          function getOutputArray({ mutably }: Readonly<{ mutably: boolean; }>): ReadonlyArray<Sample> {
            return ObjectTypeElementsArrayOrdererByMultipleFields.order({
              targetArray: getConstantSample(),
              mutably,
              elementsComparers: [
                (firstElement: Sample, secondElement: Sample):
                    ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer.Result =>
                {

                  if (firstElement.latinCharacter > secondElement.latinCharacter) {
                    return { firstElementIsStrictlyGreater: true };
                  } else if (firstElement.latinCharacter < secondElement.latinCharacter) {
                    return { firstElementIsStrictlySmaller: true };
                  }


                  return { elementsAreEquals: true };
                }
              ],
              finalElementsStableComparer:
                  (firstElement: Sample, secondElement: Sample):
                      ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer.Result =>
                          ({ firstElementIsStrictlyGreater: firstElement.ID > secondElement.ID })
            });
          }

          await Promise.all([

            Testing.describe(
              "Mutably",
              async (): Promise<void> => {

                const outputArray: ReadonlyArray<Sample> = getOutputArray({ mutably: true });

                await Promise.all([

                  Testing.test(
                    "Output array is matching with expected one",
                    (): void => {
                      Asset.deepEqual(outputArray, getExpectedOutput());
                    }
                  ),

                  Testing.test(
                    "Input array has mutated",
                    (): void => {
                      Asset.notDeepEqual(outputArray, getConstantSample());
                    }
                  )

                ]);
              }
            ),

            Testing.describe(
              "Immutably",
              async (): Promise<void> => {

                const outputArray: ReadonlyArray<Sample> = getOutputArray({ mutably: false });

                await Promise.all([

                  Testing.test(
                    "Output array is matching with expected one",
                    (): void => {
                      Asset.deepEqual(outputArray, getExpectedOutput());
                    }
                  ),

                  Testing.test(
                    "Input array has not mutated",
                    (): void => {
                      Asset.notDeepEqual(outputArray, getConstantSample());
                    }
                  )

                ]);
              }
            )

          ]);

        }
      ),

      /* ━━━ Ordering by 2 Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      Testing.describe(
        "Ordering by 2 Fields",
        async (): Promise<void> => {

          type Sample = Readonly<{
            ID: number;
            latinCharacter: string;
            arabicNumber: number;
          }>;

          /* ┅┅┅ < Expected Output ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
          function getExpectedOutput(): Array<Sample> {
            return [

              /* ╍╍╍ "A" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
              /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 1,
                latinCharacter: "A",
                arabicNumber: 1
              },
              {
                ID: 2,
                latinCharacter: "A",
                arabicNumber: 1
              },

              /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 3,
                latinCharacter: "A",
                arabicNumber: 2
              },
              {
                ID: 4,
                latinCharacter: "A",
                arabicNumber: 2
              },

              /* ╍╍╍ "B" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
              /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 5,
                latinCharacter: "B",
                arabicNumber: 1
              },
              {
                ID: 6,
                latinCharacter: "B",
                arabicNumber: 1
              },

              /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 7,
                latinCharacter: "B",
                arabicNumber: 2
              },
              {
                ID: 8,
                latinCharacter: "B",
                arabicNumber: 2
              },

              /* ╍╍╍ "C" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
              /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 9,
                latinCharacter: "C",
                arabicNumber: 1
              },
              {
                ID: 10,
                latinCharacter: "C",
                arabicNumber: 1
              },

              /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────────── */
              {
                ID: 11,
                latinCharacter: "C",
                arabicNumber: 2
              },
              {
                ID: 11,
                latinCharacter: "C",
                arabicNumber: 2
              }

            ];
          }
          /* ┅┅┅ Expected Output > ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */

          function getConstantSample(): Array<Sample> {
            return [
              {
                ID: 11,
                latinCharacter: "C",
                arabicNumber: 2
              },
              {
                ID: 6,
                latinCharacter: "B",
                arabicNumber: 1
              },
              {
                ID: 4,
                latinCharacter: "A",
                arabicNumber: 2
              },
              {
                ID: 11,
                latinCharacter: "C",
                arabicNumber: 2
              },
              {
                ID: 3,
                latinCharacter: "A",
                arabicNumber: 2
              },
              {
                ID: 5,
                latinCharacter: "B",
                arabicNumber: 1
              },
              {
                ID: 10,
                latinCharacter: "C",
                arabicNumber: 1
              },
              {
                ID: 1,
                latinCharacter: "A",
                arabicNumber: 1
              },
              {
                ID: 8,
                latinCharacter: "B",
                arabicNumber: 2
              },
              {
                ID: 2,
                latinCharacter: "A",
                arabicNumber: 1
              },
              {
                ID: 9,
                latinCharacter: "C",
                arabicNumber: 1
              },
              {
                ID: 7,
                latinCharacter: "B",
                arabicNumber: 2
              }
            ];
          }

          function getOutputArray({ mutably }: Readonly<{ mutably: boolean; }>): ReadonlyArray<Sample> {
            return ObjectTypeElementsArrayOrdererByMultipleFields.order({
              targetArray: getConstantSample(),
              mutably,
              elementsComparers: [

                (firstElement: Sample, secondElement: Sample):
                    ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer.Result =>
                {
                  if (firstElement.latinCharacter > secondElement.latinCharacter) {
                    return { firstElementIsStrictlyGreater: true };
                  } else if (firstElement.latinCharacter < secondElement.latinCharacter) {
                    return { firstElementIsStrictlySmaller: true };
                  }


                  return { elementsAreEquals: true };

                },

                (firstElement: Sample, secondElement: Sample):
                    ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer.Result =>
                {
                  if (firstElement.arabicNumber > secondElement.arabicNumber) {
                    return { firstElementIsStrictlyGreater: true };
                  } else if (firstElement.arabicNumber < secondElement.arabicNumber) {
                    return { firstElementIsStrictlySmaller: true };
                  }


                  return { elementsAreEquals: true };

                }

              ],
              finalElementsStableComparer:
                  (firstElement: Sample, secondElement: Sample):
                      ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer.Result =>
                          ({ firstElementIsStrictlyGreater: firstElement.ID > secondElement.ID })
            });
          }

          await Promise.all([

            Testing.describe(
              "Mutably",
              async (): Promise<void> => {

                const outputArray: ReadonlyArray<Sample> = getOutputArray({ mutably: true });

                await Promise.all([

                  Testing.test(
                    "Output array is matching with expected one",
                    (): void => {
                      Asset.deepEqual(outputArray, getExpectedOutput());
                    }
                  ),

                  Testing.test(
                    "Input array has mutated",
                    (): void => {
                      Asset.notDeepEqual(outputArray, getConstantSample());
                    }
                  )

                ]);
              }
            ),

            Testing.describe(
              "Immutably",
              async (): Promise<void> => {

                const outputArray: ReadonlyArray<Sample> = getOutputArray({ mutably: false });

                await Promise.all([

                  Testing.test(
                    "Output array is matching with expected one",
                    (): void => {
                      Asset.deepEqual(outputArray, getExpectedOutput());
                    }
                  ),

                  Testing.test(
                    "Input array has not mutated",
                    (): void => {
                      Asset.notDeepEqual(outputArray, getConstantSample());
                    }
                  )

                ]);
              }
            )

          ]);

        }
      )

    ]);

    // type SampleEntity = Readonly<{
    //   ID: number;
    //   latinCharacter: string;
    //   greeceCharacter?: string;
    //   arabicNumber?: number;
    // }>;
    //
    // const sampleArray: Array<SampleEntity> = [
    //
    //   {
    //     ID: 7,
    //     latinCharacter: "A",
    //     arabicNumber: 2,
    //     greeceCharacter: "β"
    //   },
    //   {
    //     ID: 9,
    //     latinCharacter: "A",
    //     arabicNumber: 3,
    //     greeceCharacter: "α"
    //   },
    //   {
    //     ID: 4,
    //     latinCharacter: "A",
    //     arabicNumber: 1,
    //     greeceCharacter: "γ"
    //   },
    //   {
    //     ID: 2,
    //     latinCharacter: "A",
    //     arabicNumber: 1,
    //     greeceCharacter: "α"
    //   },
    //   {
    //     ID: 1,
    //     latinCharacter: "A",
    //     arabicNumber: 1,
    //     greeceCharacter: "α"
    //   },
    //   {
    //     ID: 3,
    //     latinCharacter: "A",
    //     arabicNumber: 1,
    //     greeceCharacter: "β"
    //   },
    //   {
    //     ID: 8,
    //     latinCharacter: "A",
    //     arabicNumber: 2,
    //     greeceCharacter: "γ"
    //   },
    //   {
    //     ID: 6,
    //     latinCharacter: "A",
    //     arabicNumber: 2,
    //     greeceCharacter: "β"
    //   },
    //   {
    //     ID: 5,
    //     latinCharacter: "A",
    //     arabicNumber: 2,
    //     greeceCharacter: "α"
    //   },
    //
    // ];
    //
    // function getExpectedArray(): Array<SampleEntity> {
    //   return [
    //
    //     {
    //       ID: 1,
    //       latinCharacter: "A",
    //       arabicNumber: 1,
    //       greeceCharacter: "α"
    //     },
    //     {
    //       ID: 2,
    //       latinCharacter: "A",
    //       arabicNumber: 1,
    //       greeceCharacter: "α"
    //     },
    //     {
    //       ID: 3,
    //       latinCharacter: "A",
    //       arabicNumber: 1,
    //       greeceCharacter: "β"
    //     },
    //     {
    //       ID: 4,
    //       latinCharacter: "A",
    //       arabicNumber: 1,
    //       greeceCharacter: "γ"
    //     },
    //     {
    //       ID: 5,
    //       latinCharacter: "A",
    //       arabicNumber: 2,
    //       greeceCharacter: "α"
    //     },
    //     {
    //       ID: 6,
    //       latinCharacter: "A",
    //       arabicNumber: 2,
    //       greeceCharacter: "β"
    //     },
    //     {
    //       ID: 7,
    //       latinCharacter: "A",
    //       arabicNumber: 2,
    //       greeceCharacter: "β"
    //     },
    //     {
    //       ID: 8,
    //       latinCharacter: "A",
    //       arabicNumber: 2,
    //       greeceCharacter: "γ"
    //     },
    //     {
    //       ID: 9,
    //       latinCharacter: "A",
    //       arabicNumber: 3,
    //       greeceCharacter: "α"
    //     },
    //
    //
    //
    //     {
    //       latinCharacter: "A",
    //       arabicNumber: 3,
    //       greeceCharacter: "β"
    //     },
    //     {
    //       latinCharacter: "A",
    //       arabicNumber: 3,
    //       greeceCharacter: "γ"
    //     },
    //
    //     {
    //       latinCharacter: "B"
    //     },
    //
    //     {
    //       latinCharacter: "C",
    //       arabicNumber: 1,
    //       greeceCharacter: "α"
    //     },
    //     {
    //       latinCharacter: "C",
    //       arabicNumber: 1,
    //       greeceCharacter: "β"
    //     },
    //     {
    //       latinCharacter: "C",
    //       arabicNumber: 2,
    //       greeceCharacter: "α"
    //     },
    //     {
    //       latinCharacter: "C",
    //       arabicNumber: 2,
    //       greeceCharacter: "β"
    //     },
    //
    //     {
    //       latinCharacter: "D",
    //       arabicNumber: 1
    //     },
    //     {
    //       latinCharacter: "D",
    //       arabicNumber: 2
    //     },
    //
    //     {
    //       latinCharacter: "E",
    //       greeceCharacter: "α"
    //     },
    //     {
    //       latinCharacter: "E",
    //       greeceCharacter: "β"
    //     }
    //   ];
    // }

  }
).catch(Logger.logPromiseError);

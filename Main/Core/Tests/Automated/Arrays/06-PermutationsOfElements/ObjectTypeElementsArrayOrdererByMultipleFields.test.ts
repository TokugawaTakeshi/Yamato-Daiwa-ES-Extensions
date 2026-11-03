import {
  isUndefined,
  Logger,
  ObjectTypeElementsArrayOrdererByMultipleFields
} from "../../../../Source";
import Testing from "node:test";
import Asset from "node:assert";


Testing.

    suite(
      "OrdererByMultipleFields",
      async (): Promise<void> => {

        await Promise.all([

          /* ━━━ Ordering by 1 Field ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          Testing.suite(
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

                Testing.suite(
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

                Testing.suite(
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

          /* ━━━ Ordering by 2 Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          Testing.suite(
            "Ordering by 2 Fields",
            async (): Promise<void> => {

              type Sample = Readonly<{
                ID: number;
                latinCharacter: string;
                arabicNumber: number;
              }>;

              /* ┅┅┅ < Expected Output ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
              function getExpectedOutput(): Array<Sample> {
                return [

                  /* ╍╍╍ "A" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
                  /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

                  /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

                  /* ╍╍╍ "B" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
                  /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

                  /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

                  /* ╍╍╍ "C" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
                  /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

                  /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────── */
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

              /* ┅┅┅ Expected Output > ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */

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

                Testing.suite(
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

                Testing.suite(
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

          /* ━━━ Ordering by 3 Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          Testing.suite(
            "Ordering by 3 Fields",
            async (): Promise<void> => {

              type Sample = Readonly<{
                ID: number;
                latinCharacter: string;
                arabicNumber: number;
                greeceCharacter?: string;
              }>;


              /* ┅┅┅ < Expected Output ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
              function getExpectedOutput(): Array<Sample> {
                return [

                  /* ╍╍╍ "A" Group ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
                  /* ─── 1st subgroup ─────────────────────────────────────────────────────────────────────────────── */
                  /* ┄┄┄ α subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 1,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 2,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "α"
                  },

                  /* ┄┄┄ β subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 4,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 5,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "β"
                  },

                  /* ┄┄┄ γ subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 6,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 7,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "γ"
                  },

                  /* ┄┄┄ Subsubgroup without Greek Letter ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 8,
                    latinCharacter: "A",
                    arabicNumber: 1
                  },
                  {
                    ID: 9,
                    latinCharacter: "A",
                    arabicNumber: 1
                  },


                  /* ─── 2nd subgroup ─────────────────────────────────────────────────────────────────────────────── */
                  /* ┄┄┄ α subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 10,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 11,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "α"
                  },

                  /* ┄┄┄ β subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 12,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 13,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "β"
                  },

                  /* ┄┄┄ γ subsubgroup ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 14,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 15,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "γ"
                  },

                  /* ┄┄┄ Subsubgroup without Greek Letter ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
                  {
                    ID: 16,
                    latinCharacter: "A",
                    arabicNumber: 2
                  },
                  {
                    ID: 17,
                    latinCharacter: "A",
                    arabicNumber: 2
                  }

                ];
              }

              /* ┅┅┅ Expected Output > ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */

              function getConstantSample(): Array<Sample> {
                return [
                  {
                    ID: 1,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 2,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 4,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 5,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 6,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 7,
                    latinCharacter: "A",
                    arabicNumber: 1,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 8,
                    latinCharacter: "A",
                    arabicNumber: 1
                  },
                  {
                    ID: 9,
                    latinCharacter: "A",
                    arabicNumber: 1
                  },
                  {
                    ID: 10,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 11,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "α"
                  },
                  {
                    ID: 12,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 13,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "β"
                  },
                  {
                    ID: 14,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 15,
                    latinCharacter: "A",
                    arabicNumber: 2,
                    greeceCharacter: "γ"
                  },
                  {
                    ID: 16,
                    latinCharacter: "A",
                    arabicNumber: 2
                  },
                  {
                    ID: 17,
                    latinCharacter: "A",
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

                    },

                    (firstElement: Sample, secondElement: Sample):
                        ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer.Result =>
                    {

                      if (isUndefined(firstElement.greeceCharacter)) {

                        if (isUndefined(secondElement.greeceCharacter)) {
                          return { elementsAreEquals: true };
                        }


                        return { firstElementIsStrictlyGreater: true };

                      }


                      if (isUndefined(secondElement.greeceCharacter)) {
                        return { firstElementIsStrictlySmaller: true };
                      }


                      if (firstElement.greeceCharacter > secondElement.greeceCharacter) {
                        return { firstElementIsStrictlyGreater: true };
                      } else if (firstElement.greeceCharacter < secondElement.greeceCharacter) {
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

                Testing.suite(
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

                Testing.suite(
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

      }
    ).

    catch(Logger.logPromiseError);

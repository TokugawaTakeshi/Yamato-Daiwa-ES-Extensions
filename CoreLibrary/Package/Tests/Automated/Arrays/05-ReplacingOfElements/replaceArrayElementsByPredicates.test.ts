import { replaceArrayElementsByPredicates, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


function getConstantSample(): Array<string> {
  return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];
}


Testing.suite(
  replaceArrayElementsByPredicates.name,
  async (): Promise<void> => {

    await Promise.all([

      Testing.suite(
        "One Replacement",
        async (): Promise<void> => {

          await Promise.all([

            Testing.suite(
              "Mutably",
              async (): Promise<void> => {

                const experimentalSample: Array<string> = getConstantSample();

                replaceArrayElementsByPredicates({
                  targetArray: experimentalSample,
                  predicate: (element: string): boolean => element.includes("O"),
                  newValue: "OOO!",
                  mutably: true
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
                    }
                  ),

                  Testing.test(
                    "Initial Array has Mutated",
                    (): void => {
                      Assert.notDeepStrictEqual(experimentalSample, getConstantSample());
                    }
                  )

                ]);

              }
            ),

            Testing.suite(
              "Immutably",
              async (): Promise<void> => {

              const experimentalSample: Array<string> = getConstantSample();

                const updatedExperimentalSampleClone: Array<string> = replaceArrayElementsByPredicates({
                  targetArray: experimentalSample,
                  predicate: (element: string): boolean => element.includes("O"),
                  newValue: "OOO!",
                  mutably: false
                }).updatedArray;

                await Promise.all([

                  Testing.test(
                    "Updated Array Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(updatedExperimentalSampleClone, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
                    }
                  ),

                  Testing.test(
                    "Initial Array has not Mutated",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, getConstantSample());
                    }
                  )

                ]);

              }
            )

          ]);

        }
      ),

      Testing.suite(
        "Multiple Replacements",
        async (): Promise<void> => {

          await Promise.all([

            Testing.suite(
              "Mutably",
              async (): Promise<void> => {

                const experimentalSample: Array<string> = getConstantSample();

                replaceArrayElementsByPredicates({
                  targetArray: experimentalSample,
                  replacements: [
                    {
                      predicate: (element: string): boolean => element.includes("O"),
                      newValue: "OOO!"
                    },
                    {
                      predicate: (element: string): boolean => element.includes("I"),
                      replacer: (currentValueOfElement: string): string => `${ currentValueOfElement.replace("I", "III") }!!!`
                    }
                  ],
                  mutably: true
                });

                await Promise.all([

                  Testing.test(
                    "Updated Array Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]);
                    }
                  ),

                  Testing.test(
                    "Initial array has been mutated", (): void => {
                      Assert.notDeepStrictEqual(experimentalSample, getConstantSample());
                    }
                  )

                ]);

              }
            ),

            Testing.suite(
              "Immutably",
              async (): Promise<void> => {

                const experimentalSample: Array<string> = getConstantSample();

                const updatedExperimentalSampleClone: Array<string> = replaceArrayElementsByPredicates({
                  targetArray: experimentalSample,
                  replacements: [
                    {
                      predicate: (element: string): boolean => element.includes("O"),
                      newValue: "OOO!"
                    },
                    {
                      predicate: (element: string): boolean => element.includes("I"),
                      replacer: (currentValueOfElement: string): string => `${ currentValueOfElement.replace("I", "III") }!!!`
                    }
                  ],
                  mutably: false
                }).updatedArray;

                await Promise.all([

                  Testing.test(
                    "Updated Array Matching with Expected One",
                    (): void => {
                      Assert.deepStrictEqual(
                        updatedExperimentalSampleClone,
                        [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]
                      );
                    }
                  ),

                  Testing.test(
                    "Initial Array has not Mutated",
                    (): void => {
                      Assert.deepStrictEqual(experimentalSample, getConstantSample());
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
).catch(Logger.logPromiseError);

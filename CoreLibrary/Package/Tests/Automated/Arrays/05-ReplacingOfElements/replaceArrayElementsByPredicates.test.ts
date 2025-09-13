import { Logger, replaceArrayElementsByPredicates } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


function getConstantSample(): Array<string> {
  return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];
}


Promise.all([

  suite(
    "One Replacement",
    async (): Promise<void> => {

      await Promise.all([

        suite(
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

              test(
                "Updated Array Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
                }
              ),

              test(
                "Initial Array has Mutated",
                (): void => {
                  Assert.notDeepStrictEqual(experimentalSample, getConstantSample());
                }
              )

            ]);

          }
        ),

        suite(
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

              test(
                "Updated Array Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(updatedExperimentalSampleClone, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
                }
              ),

              test(
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

  suite(
    "Multiple Replacements",
    async (): Promise<void> => {

      await Promise.all([

        suite(
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

              test(
                "Updated Array Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]);
                }
              ),

              test(
                "Initial array has been mutated", (): void => {
                  Assert.notDeepStrictEqual(experimentalSample, getConstantSample());
                }
              )

            ]);

          }
        ),

        suite(
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

              test(
                "Updated Array Matching with Expected One",
                (): void => {
                  Assert.deepStrictEqual(updatedExperimentalSampleClone, [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]);
                }
              ),

              test(
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

]).catch(Logger.logPromiseError);

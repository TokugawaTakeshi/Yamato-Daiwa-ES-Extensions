import {
  removeArrayElementsByPredicates,
  type RemovingOfArrayElementsByPredicates,
  Logger
} from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "One predicate",
    async (): Promise<void> => {

      function getSampleArray(): Array<string> {
        return [ "a", "aa", "aaa", "aaaa", "aaaaa" ];
      }

      function predicate(arrayElement: string): boolean {
        return arrayElement.length > 3;
      }

      await Promise.all([

        Testing.suite(
          "Mutable removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();
            const removingArrayElementsByPredicatesOperationResult:
                RemovingOfArrayElementsByPredicates.Result<string> =
                    removeArrayElementsByPredicates({
                      targetArray: experimentalSample,
                      predicate,
                      mutably: true
                    });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.updatedArray, [ "a", "aa", "aaa" ]);
                }
              ),

              Testing.test(
                "Removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.removedElements, [ "aaaa", "aaaaa" ]);
                }
              ),

              Testing.test(
                "Indexed of removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 3, 4 ]);
                }
              )

            ]);

          }
        ),

        Testing.suite(
          "Immutable removing",
          async (): Promise<void> => {

            const experimentalSample: ReadonlyArray<string> = getSampleArray();
            const removingArrayElementsByPredicatesOperationResult:
                RemovingOfArrayElementsByPredicates.Result<string> =
                    removeArrayElementsByPredicates({
                      targetArray: experimentalSample,
                      predicate,
                      mutably: false
                    });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.updatedArray, [ "a", "aa", "aaa" ]);
                }
              ),

              Testing.test(
                "Removed element is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.removedElements, [ "aaaa", "aaaaa" ]);
                }
              ),

              Testing.test(
                "Indexed of removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 3, 4 ]);
                }
              ),

              Testing.test(
                "Initial array has not been mutated",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, getSampleArray());
                }
              )

            ]);

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "Multiple predicates",
    async (): Promise<void> => {

      function getSampleArray(): Array<string> {
        return [ "alt", "ctrl", "alpha", "bravo", "alps", "himalayas", "atsugi", "yokosuka" ];
      }

      const predicates: Array<(arrayElement: string) => boolean> = [
        (arrayElement: string): boolean => arrayElement.startsWith("a"),
        (arrayElement: string): boolean => arrayElement.length < 5
      ];

      await Promise.all([

        Testing.suite(
          "Mutable removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();
            const removingArrayElementsByPredicatesOperationResult:
                RemovingOfArrayElementsByPredicates.Result<string> =
                    removeArrayElementsByPredicates({
                      targetArray: experimentalSample,
                      predicates,
                      mutably: true
                    });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.updatedArray,
                    [ "bravo", "himalayas", "yokosuka" ]
                  );
                }
              ),

              Testing.test(
                "Removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.removedElements,
                    [ "alt", "ctrl", "alpha", "alps", "atsugi" ]
                  );
                }
              ),

              Testing.test(
                "Indexed of removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements,
                    [ 0, 1, 2, 4, 6 ]
                  );
                }
              )

            ]);

          }
        ),

        Testing.suite(
          "Immutable removing",
          async (): Promise<void> => {

            const experimentalSample: ReadonlyArray<string> = getSampleArray();
            const removingArrayElementsByPredicatesOperationResult: RemovingOfArrayElementsByPredicates.Result<string> =
                removeArrayElementsByPredicates({
                  targetArray: experimentalSample,
                  predicates,
                  mutably: false
                });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.updatedArray,
                    [ "bravo", "himalayas", "yokosuka" ]
                  );
                }
              ),

              Testing.test(
                "Removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.removedElements,
                    [ "alt", "ctrl", "alpha", "alps", "atsugi" ]
                  );
                }
              ),

              Testing.test(
                "Indexed of removed elements are matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements,
                    [ 0, 1, 2, 4, 6 ]
                  );
                }
              ),

              Testing.test(
                "Initial array has not been mutated",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, getSampleArray());
                }
              )

            ]);

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

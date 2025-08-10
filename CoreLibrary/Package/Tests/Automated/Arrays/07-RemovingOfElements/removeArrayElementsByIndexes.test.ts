import { removeArrayElementsByIndexes, type RemovingArrayElementsByIndexesOperation, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Removing of one element",
    async (): Promise<void> => {

      function getSampleArray(): Array<string> {
        return [ "alpha", "bravo", "charlie", "delta", "echo" ];
      }

      const indexOfArrayElementWhichWillBeRemoved: number = 2;

      await Promise.all([

        Testing.suite(
          "Mutable Removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();

            const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
                removeArrayElementsByIndexes({
                  targetArray: experimentalSample,
                  indexes: indexOfArrayElementWhichWillBeRemoved,
                  mutably: true
                });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                Assert.deepStrictEqual(
                  removingArrayElementsByIndexesOperationResult.updatedArray,
                  [ "alpha", "bravo", "delta", "echo" ]
                );
                }
              ),

              Testing.test(
                "Removed element is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "charlie" ]);
                }
              )

            ]);

          }
        ),

        Testing.suite(
          "Immutable removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();
            const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
                removeArrayElementsByIndexes({
                  targetArray: experimentalSample,
                  indexes: indexOfArrayElementWhichWillBeRemoved,
                  mutably: false
                });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByIndexesOperationResult.updatedArray,
                    [ "alpha", "bravo", "delta", "echo" ]
                  );
                }
              ),

              Testing.test(
                "Removed element is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "charlie" ]);
                }
              ),

              Testing.test(
                "Initial array has not mutated",
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
    "Removing of multiple elements",
    async (): Promise<void> => {

      function getSampleArray(): Array<string> {
        return [ "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf" ];
      }

      const indexesOfArrayElementsWhichWIllBeRemoved: Array<number> = [ 1, 3, 5 ];

      await Promise.all([

        Testing.suite(
          "Mutable removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();

            const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
                removeArrayElementsByIndexes<string>({
                  targetArray: experimentalSample,
                  indexes: indexesOfArrayElementsWhichWIllBeRemoved,
                  mutably: true
                });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByIndexesOperationResult.updatedArray,
                    [ "alpha", "charlie", "echo", "golf" ]
                  );
                }
              ),

              Testing.test(
                "Removed element is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByIndexesOperationResult.removedElements,
                    [ "bravo", "delta", "foxtrot" ]
                  );
                }
              ),

              Testing.test(
                "Initial array has mutated",
                (): void => {
                  Assert.deepStrictEqual(experimentalSample, [ "alpha", "charlie", "echo", "golf" ]);
                }
              )

            ]);

          }
        ),

        Testing.suite(
          "Immutable removing",
          async (): Promise<void> => {

            const experimentalSample: Array<string> = getSampleArray();

            const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
                removeArrayElementsByIndexes<string>({
                  targetArray: experimentalSample,
                  indexes: indexesOfArrayElementsWhichWIllBeRemoved,
                  mutably: false
                });

            await Promise.all([

              Testing.test(
                "Updated array is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByIndexesOperationResult.updatedArray,
                    [ "alpha", "charlie", "echo", "golf" ]
                  );
                }
              ),

              Testing.test(
                "Removed element is matching with expected",
                (): void => {
                  Assert.deepStrictEqual(
                    removingArrayElementsByIndexesOperationResult.removedElements, [ "bravo", "delta", "foxtrot" ]
                  );
                }
              ),

              Testing.test(
                "Initial array has not mutated",
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

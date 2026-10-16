import { removeElementsFromSet, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "node:assert";


Testing.

    suite(
      removeElementsFromSet.name,
      async (): Promise<void> => {

        function getConstantSample(): Set<string> {
          return new Set([
            "Alpha",
            "Axel",
            "Bravo",
            "Bingo",
            "Charlie",
            "Checkpoint",
            "Delta",
            "Dynamo"
          ]);
        }

        function getExpectedResultSet(): Set<string> {
          return new Set([
            "Alpha",
            "Bravo",
            "Charlie",
            "Delta"
          ]);
        }

        await Promise.all([

          Testing.suite(
            "Mutable Removing",
            (): void => {

              const experimentalSet: Set<string> = getConstantSample();

              removeElementsFromSet({
                targetSet: experimentalSet,
                elementsToDelete: [ "Axel", "Bingo", "Checkpoint", "Dynamo" ],
                mutably: true
              });

              Assert.deepStrictEqual(experimentalSet, getExpectedResultSet());

            }
          ),

          Testing.test(
            "Immutable Removing",
            async (): Promise<void> => {

              const experimentalSet: Set<string> = getConstantSample();

              const newSet: Set<string> =
                  removeElementsFromSet({
                    targetSet: experimentalSet,
                    elementsToDelete: [ "Axel", "Bingo", "Checkpoint", "Dynamo" ],
                    mutably: false
                  });

              await Promise.all([

                Testing.test(
                  "Experimental set has not changed",
                  (): void => {
                    Assert.deepStrictEqual(experimentalSet, getConstantSample());
                  }
                ),

                Testing.test(
                  "New set is matching with expected one",
                  (): void => {
                    Assert.deepStrictEqual(newSet, getExpectedResultSet());
                  }
                )

              ]);

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

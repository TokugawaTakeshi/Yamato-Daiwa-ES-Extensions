import {
  removeThenGetSpecificNumberOfSetElements,
  Logger,
  type RemovingAndGettingOfSpecificNumberElementsFromSet
} from "../../../Source";
import Testing from "node:test";
import Assert from "node:assert";
import UnexpectedEventError from "../../../Source/Errors/UnexpectedEvent/UnexpectedEventError";


Testing.

    suite(
      removeThenGetSpecificNumberOfSetElements.name,
      async (): Promise<void> => {

        function getConstantSample(): Set<string> {
          return new Set([
            "Alpha",
            "Bravo",
            "Charlie",
            "Delta",
            "Echo",
            "Golf"
          ]);
        }

        await Promise.all([

          Testing.suite(
            "Mutable Removing",
            async (): Promise<void> => {

              const experimentalSet: Set<string> = getConstantSample();

              const { removedElements }: RemovingAndGettingOfSpecificNumberElementsFromSet.Result<string> =
                  removeThenGetSpecificNumberOfSetElements({
                    targetSet: experimentalSet,
                    elementsCount: 2,
                    mustThrowErrorIfSetHasLessElementsThanSpecified: false,
                    mutably: true
                  });

              await Promise.all([

                Testing.test(
                  "Initial Set Changed",
                  (): void => {
                    Assert.notDeepEqual(experimentalSet, getConstantSample());
                  }
                ),

                Testing.test(
                  "Actually Removed Elements Count is Matching with Specified",
                  (): void => {
                    Assert.strictEqual(removedElements.length, 2);
                  }
                ),

                Testing.test(
                  "Remain Elements Count is Matching with Expected",
                  (): void => {
                    Assert.strictEqual(experimentalSet.size, 4);
                  }
                )

              ]);

            }
          ),

          Testing.suite(
            "Immutable Removing",
            async (): Promise<void> => {

              const experimentalSet: Set<string> = getConstantSample();

              const {
                removedElements,
                updatedSet
              }: RemovingAndGettingOfSpecificNumberElementsFromSet.Result<string> =
                  removeThenGetSpecificNumberOfSetElements({
                    targetSet: experimentalSet,
                    elementsCount: 2,
                    mustThrowErrorIfSetHasLessElementsThanSpecified: false,
                    mutably: false
                  });

              await Promise.all([

                Testing.test(
                  "Initial Set has not Changed",
                  (): void => {
                    Assert.deepEqual(experimentalSet, getConstantSample());
                  }
                ),

                Testing.test(
                  "Actually Removed Elements Count is Matching with Specified",
                  (): void => {
                    Assert.strictEqual(removedElements.length, 2);
                  }
                ),

                Testing.test(
                  "Remain Elements Count is Matching with Expected",
                  (): void => {
                    Assert.strictEqual(updatedSet.size, 4);
                  }
                )

              ]);

            }
          ),

            Testing.suite(
              "Handling of Requested Elements Number Larger than Actual Elements Count",
              async (): Promise<void> => {

                await Promise.all([

                  Testing.test(
                    "Throwing of Error",
                    (): void => {
                      Assert.throws(
                        (): void => {
                          removeThenGetSpecificNumberOfSetElements({
                            targetSet: getConstantSample(),
                            elementsCount: 7,
                            mustThrowErrorIfSetHasLessElementsThanSpecified: true,
                            mutably: true
                          });
                        },
                        UnexpectedEventError
                      );
                    }
                  ),

                  Testing.suite(
                    "Removing of All Elements",
                    (): void => {

                      const experimentalSet: Set<string> = getConstantSample();

                      const { removedElements }: RemovingAndGettingOfSpecificNumberElementsFromSet.Result<string> =
                          removeThenGetSpecificNumberOfSetElements({
                            targetSet: experimentalSet,
                            elementsCount: 7,
                            mustThrowErrorIfSetHasLessElementsThanSpecified: false,
                            mutably: true
                          });

                      Assert.strictEqual(experimentalSet.size, 0);
                      Assert.strictEqual(removedElements.length, getConstantSample().size);

                    }
                  )

                ]);

              }
            )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

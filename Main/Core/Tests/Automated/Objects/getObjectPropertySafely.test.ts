import { getObjectPropertySafely, isUndefined, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.

    suite(
      "getObjectPropertySafely",
      async (): Promise<void> => {

        await Promise.all([

          Testing.suite(
            "Plain Object",
            async (): Promise<void> => {

              const sampleObject: unknown = {
                alpha1: {
                  alpha1_1: "ALPHA",
                  alpha1_2: null
                },
                bravo1: null
              };

              await Promise.all([

                Testing.test(
                  "Non-empty value retrieved correctly",
                  (): void => {

                    /* eslint-disable @typescript-eslint/no-unsafe-member-access --
                     * We need to check does target function work as native optional chaining - it is valid JavaScript
                     *   but not TypeScript. */
                    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
                    Assert.strictEqual(sampleObject?.alpha1?.alpha1_1, "ALPHA");
                    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

                    Assert.strictEqual(getObjectPropertySafely(sampleObject, "alpha1.alpha1_1"), "ALPHA");
                    Assert.strictEqual(getObjectPropertySafely(sampleObject, [ "alpha1", "alpha1_1" ]), "ALPHA");

                  }
                ),

                Testing.test(
                  "Accessed to child property of not existing one processed correctly",
                  (): void => {

                  /* eslint-disable @typescript-eslint/no-unsafe-member-access --
                   * We need to check does target function work as native optional chaining - it is valid JavaScript
                   *   but not TypeScript. */
                  // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
                  Assert.strictEqual(isUndefined(sampleObject?.bravo1?.bravo1_1), true);
                  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
                  Assert.strictEqual(isUndefined(getObjectPropertySafely(sampleObject, "bravo1.bravo1_1")), true);
                  Assert.strictEqual(isUndefined(getObjectPropertySafely(sampleObject, [ "bravo1", "bravo1_1" ])), true);

                  }
                ),

                Testing.test(
                  "Non-objects has been processed correctly",
                  (): void => {
                    Assert.strictEqual(isUndefined(getObjectPropertySafely("TEST", "bravo1.bravo1_1")), true);
                    Assert.strictEqual(isUndefined(getObjectPropertySafely("TEST", [ "bravo1", "bravo1_1" ])), true);
                  }
                )

              ]);

            }
          ),

          Testing.suite(
            "Indexed Array",
            async (): Promise<void> => {

              const sampleArray: unknown = [ "foo", { alpha: "bar", bravo: [ 1, 2 ] } ];

              await Promise.all([

                Testing.test(
                  "First retrieved element is matching with the expected one",
                  (): void => {

                    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
                    Assert.strictEqual(sampleArray[0], "foo");

                    Assert.strictEqual(getObjectPropertySafely(sampleArray, "0"), "foo");
                    Assert.strictEqual(getObjectPropertySafely(sampleArray, 0), "foo");
                    Assert.strictEqual(getObjectPropertySafely(sampleArray, [ "0" ]), "foo");
                    Assert.strictEqual(getObjectPropertySafely(sampleArray, [ 0 ]), "foo");

                  }
                ),

                Testing.test(
                  "The \"alpha\" property of first object-type element is matching with the expected one",
                  (): void => {

                    /* eslint-disable @typescript-eslint/no-unsafe-member-access --
                     * We need to check does target function work as native optional chaining - it is valid JavaScript
                     *   but not TypeScript. */
                    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
                    Assert.strictEqual(sampleArray[1].alpha, "bar");
                  /* eslint-enable @typescript-eslint/no-unsafe-member-access */

                    Assert.strictEqual(getObjectPropertySafely(sampleArray, "1.alpha"), "bar");
                    Assert.strictEqual(getObjectPropertySafely(sampleArray, [ "1", "alpha" ]), "bar");

                  }
                ),

                Testing.test(
                  "The \"alpha\" property of first object-type element is matching with the expected one",
                  (): void => {

                    /* eslint-disable @typescript-eslint/no-unsafe-member-access --
                     * We need to check does target function work as native optional chaining - it is valid JavaScript
                     *   but not TypeScript. */
                    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
                    Assert.strictEqual(sampleArray[1].bravo[0], 1);
                  /* eslint-enable @typescript-eslint/no-unsafe-member-access */

                    Assert.strictEqual(getObjectPropertySafely(sampleArray, "1.bravo.0"), 1);
                    Assert.strictEqual(getObjectPropertySafely(sampleArray, [ "1", "bravo", "0" ]), 1);

                  }
                )

              ]);

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

import { Logger } from "../../Source";
import ValuesDeepCopier from "../../Source/ValuesDeepCopier";
import { test, suite } from "node:test";
import { deepStrictEqual, notDeepStrictEqual } from "assert";


suite(
  "deeplyCloneObjectLikeValueAsPossible",
  async (): Promise<void> => {

    await Promise.all([

      test(
        "JSON-compatible Object",
        async (): Promise<void> => {

          type Sample = {
            alpha: string;
            bravo: number;
            charlie: boolean;
            delta: {
              echo: string;
              foxtrot: number;
            };
            golf: Array<{ hotel: string; india: number; }>;
            juliette: null;
            kilo: undefined;
          };

          function generateConstantSample(): Sample {
            return {
              alpha: "FOO",
              bravo: 1,
              charlie: true,
              delta: {
                echo: "BAR",
                foxtrot: 2
              },
              golf: [
                {
                  hotel: "BAZ",
                  india: 3
                }
              ],
              juliette: null,
              /* eslint-disable-next-line no-undefined -- テスト専用 */
              kilo: undefined
            };
          }

          const initialSample: Sample = generateConstantSample();

          const deepCopy: Sample = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.alpha = "AMBER";
                initialSample.bravo = 100;
                initialSample.charlie = false;
                initialSample.delta.echo = "RUBY";
                initialSample.delta.foxtrot = 200;
                initialSample.golf[0] = { hotel: "EMERLAND", india: 300 };

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "Date",
        async (): Promise<void> => {

          type Sample = { staredAt: Date; };

          function generateConstantSample(): Sample {
            return { staredAt: new Date(2025, 7, 15) };
          }

          const initialSample: Sample = generateConstantSample();

          const deepCopy: Sample = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.staredAt.setDate(2026);

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "BigInt",
        async (): Promise<void> => {

          type Sample = { manyOfSomething: bigint; };

          function generateConstantSample(): Sample {
            return { manyOfSomething: BigInt("9007199254740991") };
          }

          const initialSample: Sample = generateConstantSample();

          const deepCopy: Sample = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.manyOfSomething = BigInt("8007199254740992");

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "Sets with Nested Ones",
        async (): Promise<void> => {

          type Sample = Set<Set<string> | number>;

          function generateConstantSample(): Sample {
            return new Set([
              new Set([ "Alpha", "Bravo", "Charlie" ]),
              1,
              new Set([ "Delta", "Echo", "Golf" ]),
              2
            ]);
          }

          const initialSample: Sample = generateConstantSample();

          const deepCopy: Sample = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.add(10);

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "Maps with Nested Ones as Keys and Values",
        async (): Promise<void> => {

          type NestedMap = Map<string, string>;
          type Sample = Map<NestedMap | number, NestedMap | number>;

          function generateConstantSample(): Sample {

            const key1: NestedMap = new Map([
              [ "k1", "v1" ],
              [ "k2", "v2" ]
            ]);
            const value1: NestedMap = new Map([
              [ "v1k", "v1v" ],
              [ "v2k", "v2v" ]
            ]);

            const key2: NestedMap = new Map([
              [ "k3", "v3" ],
              [ "k4", "v4" ]
            ]);
            const value2: NestedMap = new Map([
              [ "v3k", "v3v" ],
              [ "v4k", "v4v" ]
            ]);

            return new Map<NestedMap | number, NestedMap | number>([
              [ key1, value1 ],
              [ 1, value2 ],
              [ key2, 2 ],
              [ 2, 3 ]
            ]);

          }

          const initialSample: Sample = generateConstantSample();

          const deepCopy: Sample = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                const newNestedKey: NestedMap = new Map([
                  [ "newKey", "newValue" ]
                ]);

                const newNestedValue: NestedMap = new Map([
                  [ "newValKey", "newVal" ]
                ]);

                initialSample.set(newNestedKey, newNestedValue);

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "Non-enumerable Properties",
        async (): Promise<void> => {

          type InnerObject = {
            delta: string;
            echo?: string;
          };

          type OuterObject = {
            alpha: string;
            bravo?: number;
            charlie?: InnerObject;
          };

          function generateConstantSample(): OuterObject {

            const outerObject: OuterObject = {
              alpha: "FOO"
            };

            Object.defineProperty(
              outerObject,
              "bravo",
              {
                value: 1,
                enumerable: false,
                configurable: false,
                writable: false
              }
            );

            const innerObject: InnerObject = {
              delta: "BAR"
            };

            Object.defineProperty(
              innerObject,
              "echo",
              {
                value: "BAZ",
                enumerable: false,
                configurable: false,
                writable: false
              }
            );

            outerObject.charlie = innerObject;

            return outerObject;

          }

          const initialSample: OuterObject = generateConstantSample();

          const deepCopy: OuterObject = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {

                deepStrictEqual(initialSample, deepCopy);

                /* [ Theory ]
                * Non-enumerable properties will not be compared by `deepStrictEqual` thus it is required to compare
                *   the values of these properties separately. */
                deepStrictEqual(initialSample.bravo, deepCopy.bravo);
                deepStrictEqual(initialSample.charlie?.delta, deepCopy.charlie?.delta);
                deepStrictEqual(initialSample.charlie?.echo, deepCopy.charlie?.echo);

              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.alpha = "RUBY";
                initialSample.bravo = 100;
                initialSample.charlie = {
                  delta: "AMBER",
                  echo: "EMERLAND"
                };

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      ),

      suite(
        "Native Constructors",
        async (): Promise<void> => {

          type OuterObject = {
            alpha: StringConstructor | NumberConstructor;
            bravo: NumberConstructor | BooleanConstructor;
          };

          function generateConstantSample(): OuterObject {
            return {
              alpha: String,
              bravo: Number
            };
          }

          const initialSample: OuterObject = generateConstantSample();

          const deepCopy: OuterObject = ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(initialSample);

          await Promise.all([

            test(
              "Initial Sample Deeply Equals to its Deep Copy",
              (): void => {
                deepStrictEqual(initialSample, deepCopy);
              }
            ),

            test(
              "Mutating of Initial Sample has not Affected to Deep Copy",
              (): void => {

                initialSample.alpha = Number;
                initialSample.bravo = Boolean;

                notDeepStrictEqual(initialSample, deepCopy);
                deepStrictEqual(deepCopy, generateConstantSample());

              }
            )

          ]);

        }
      )

    ]);

  }
).catch(Logger.logPromiseError);

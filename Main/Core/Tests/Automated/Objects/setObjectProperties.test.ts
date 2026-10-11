import Testing from "node:test";
import Assert from "assert";
import setObjectProperties from "../../../Source/Objects/setObjectProperties";
import { Logger } from "../../../Source";


Testing.

    suite(
      "setObjectProperties",
      async (): Promise<void> => {

        await Promise.all([

          Testing.suite(
            "Plain Object",
            async (): Promise<void> => {

              await Promise.all([

                Testing.test(
                  "With creating of an inner object",
                  (): void => {

                    const sampleObject: object = {};

                    setObjectProperties(
                      sampleObject,
                      {
                        alpha: { value: 1 },
                        "bravo.hoge": {
                          value: 2,
                          mustCreateParentsObjectsIfNotPresent: true
                        }
                      }
                    );

                    Assert.deepEqual(
                      sampleObject,
                      {
                        alpha: 1,
                        bravo: {
                          hoge: 2
                        }
                      }
                    );

                  }
                ),

                Testing.test(
                  "Without creating of an inner object",
                  (): void => {

                   const sampleObject: object = {};

                    setObjectProperties(
                      sampleObject,
                      {
                        alpha: { value: 1 },
                        "bravo.hoge": { value: 2 }
                      }
                    );

                    Assert.deepEqual(sampleObject, { alpha: 1 });

                  }
                )

              ]);

            }
          ),

          Testing.suite(
            "One-level Indexed Array",
            async (): Promise<void> => {

              const sampleArray: Array<string> = [ "foo", "bar" ];

              setObjectProperties(
                sampleArray,
                {
                  2: { value: "baz" }
                }
              );


              await Testing.test(
                "Third element has been added at correct position as expected.",
                (): void => {

                  Assert.strictEqual(sampleArray[2], "baz");
                  Assert.strictEqual(sampleArray.length, 3);

                }
              );

            }
          ),

          Testing.suite(
            "Nested Indexed Array",
            async (): Promise<void> => {

              const sampleArray: Array<unknown> =
                  [
                    "foo",
                    {
                      bar: [ "baz" ]
                    }
                  ];

              setObjectProperties(
                sampleArray,
                {
                  "1.bar.1": { value: "hoge" }
                }
              );


              await Testing.test(
                "Third element has been added at correct position as expected.",
                (): void => {

                  /* @ts-ignore: TS2571 If the actual type does not match with expected, the tests will fail with error. */
                  const secondElement__expectedToBeAnArray: Array<string> = sampleArray[1].bar;

                  Assert.strictEqual(Array.isArray(secondElement__expectedToBeAnArray), true);
                  Assert.strictEqual(secondElement__expectedToBeAnArray[1], "hoge");
                  Assert.strictEqual(secondElement__expectedToBeAnArray.length, 2);

                }
              );

            }
          ),

          Testing.suite(
            "Creating of Nested Indexed Array",
            async (): Promise<void> => {

              const sampleArray: Array<unknown> = [ "foo", {} ];

              setObjectProperties(
                sampleArray,
                {
                  "1.bar.0": {
                    value: "hoge",
                    mustCreateParentsObjectsIfNotPresent: true
                  }
                }
              );

              await Testing.test(
                "Third element has been added at correct position as expected.",
                (): void => {

                  /* @ts-ignore: TS2571 If the actual type does not match with expected, the tests will fail with error. */
                  const secondElement__expectedToBeAnArray: Array<string> = sampleArray[1].bar;

                  Assert.strictEqual(Array.isArray(secondElement__expectedToBeAnArray), true);
                  Assert.strictEqual(secondElement__expectedToBeAnArray[0], "hoge");
                  Assert.strictEqual(secondElement__expectedToBeAnArray.length, 1);

                }
              );

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

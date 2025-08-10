import { twoDimensionalizeArray, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


await Promise.all([

  Testing.suite(
    "3 elements per nested array, full nested arrays",
    async (): Promise<void> => {

      const sampleFlatArray: ReadonlyArray<string> = [
        "MUST_BE_FIRST_IN_NESTED_ARRAY",
        "",
        "MUST_BE_LAST_IN_NESTED_ARRAY",
        "MUST_BE_FIRST_IN_NESTED_ARRAY",
        "",
        "MUST_BE_LAST_IN_NESTED_ARRAY"
      ];

      const twoDimensionalArray: Array<Array<string>> = twoDimensionalizeArray({
        targetFlatArray: sampleFlatArray,
        elementsCountPerNestedArray: 3
      });

      await Promise.all([

        Testing.test(
          "2 nested arrays",
          (): void => {
            Assert.strictEqual(twoDimensionalArray.length, 2);
          }
        ),

        Testing.test(
          "3 elements per nested array",
          (): void => {
            Assert.strictEqual(twoDimensionalArray[0].length, 3);
            Assert.strictEqual(twoDimensionalArray[1].length, 3);
          }
        ),

        Testing.test(
          "Nested arrays are matching with expected ones",
          (): void => {

            Assert.deepStrictEqual(
              twoDimensionalArray[0],
              [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
            );

            Assert.deepStrictEqual(
              twoDimensionalArray[1],
              [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
            );

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "3 elements per nested array, incomplete last nested array",
    async (): Promise<void> => {

      const sampleFlatArray: ReadonlyArray<string> = [
        "MUST_BE_FIRST_IN_NESTED_ARRAY",
        "",
        "MUST_BE_LAST_IN_NESTED_ARRAY",
        "MUST_BE_FIRST_IN_NESTED_ARRAY",
        "MUST_BE_LAST_IN_NESTED_ARRAY"
      ];

      const twoDimensionalArray: Array<Array<string>> = twoDimensionalizeArray({
        targetFlatArray: sampleFlatArray,
        elementsCountPerNestedArray: 3
      });

      await Promise.all([

        Testing.test(
          "2 nested arrays",
          (): void => {
            Assert.strictEqual(twoDimensionalArray.length, 2);
          }
        ),

        Testing.test(
          "Elements count per nested arrays are matching with expected",
          (): void => {
            Assert.strictEqual(twoDimensionalArray[0].length, 3);
            Assert.strictEqual(twoDimensionalArray[1].length, 2);
          }
        ),

        Testing.test(
          "Nested arrays are matching with expected ones",
          (): void => {

            Assert.deepStrictEqual(
              twoDimensionalArray[0],
              [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
            );

            Assert.deepStrictEqual(
              twoDimensionalArray[1],
              [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);


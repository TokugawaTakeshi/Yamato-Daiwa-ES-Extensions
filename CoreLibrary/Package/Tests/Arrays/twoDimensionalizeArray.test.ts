import { strictEqual, deepStrictEqual } from "assert";
import { twoDimensionalizeArray } from "../../Source";


describe("twoDimensionalizeArray", (): void => {

  describe("3 elements per nested array, full nested arrays", (): void => {

    const sampleFlatArray: Array<string> = [
      "MUST_BE_FIRST_IN_NESTED_ARRAY",
      "",
      "MUST_BE_LAST_IN_NESTED_ARRAY",
      "MUST_BE_FIRST_IN_NESTED_ARRAY",
      "",
      "MUST_BE_LAST_IN_NESTED_ARRAY"
    ];

    const twoDimensionalArray: Array<Array<string>> = twoDimensionalizeArray({
      targetFlatArray: sampleFlatArray,
      elementsPerNestedArray: 3
    });

    it("2 nested arrays", (): void => {
      strictEqual(twoDimensionalArray.length, 2);
    });

    it("3 elements per nested array", (): void => {
      strictEqual(twoDimensionalArray[0].length, 3);
      strictEqual(twoDimensionalArray[1].length, 3);
    });

    it("Nested arrays are matching with expected ones", (): void => {
      deepStrictEqual(
        twoDimensionalArray[0],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
      deepStrictEqual(
        twoDimensionalArray[1],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
    });
  });

  describe("3 elements per nested array, incomplete last nested array", (): void => {

    const sampleFlatArray: Array<string> = [
      "MUST_BE_FIRST_IN_NESTED_ARRAY",
      "",
      "MUST_BE_LAST_IN_NESTED_ARRAY",
      "MUST_BE_FIRST_IN_NESTED_ARRAY",
      "MUST_BE_LAST_IN_NESTED_ARRAY"
    ];

    const twoDimensionalArray: Array<Array<string>> = twoDimensionalizeArray({
      targetFlatArray: sampleFlatArray,
      elementsPerNestedArray: 3
    });

    it("2 nested arrays", (): void => {
      strictEqual(twoDimensionalArray.length, 2);
    });

    it("Elements count per nested arrays are matching with expected", (): void => {
      strictEqual(twoDimensionalArray[0].length, 3);
      strictEqual(twoDimensionalArray[1].length, 2);
    });

    it("Nested arrays are matching with expected ones", (): void => {
      deepStrictEqual(
        twoDimensionalArray[0],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
      deepStrictEqual(
        twoDimensionalArray[1],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
    });
  });
});

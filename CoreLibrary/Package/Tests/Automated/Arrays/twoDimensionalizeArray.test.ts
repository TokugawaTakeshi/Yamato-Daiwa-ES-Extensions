import { twoDimensionalizeArray } from "../../../Source";
import Assert from "assert";


describe("twoDimensionalizeArray", (): void => {

  describe("3 elements per nested array, full nested arrays", (): void => {

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

    it("2 nested arrays", (): void => {
      Assert.strictEqual(twoDimensionalArray.length, 2);
    });

    it("3 elements per nested array", (): void => {
      Assert.strictEqual(twoDimensionalArray[0].length, 3);
      Assert.strictEqual(twoDimensionalArray[1].length, 3);
    });

    it("Nested arrays are matching with expected ones", (): void => {
      Assert.deepStrictEqual(
        twoDimensionalArray[0],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
      Assert.deepStrictEqual(
        twoDimensionalArray[1],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
    });

  });

  describe("3 elements per nested array, incomplete last nested array", (): void => {

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

    it("2 nested arrays", (): void => {
      Assert.strictEqual(twoDimensionalArray.length, 2);
    });

    it("Elements count per nested arrays are matching with expected", (): void => {
      Assert.strictEqual(twoDimensionalArray[0].length, 3);
      Assert.strictEqual(twoDimensionalArray[1].length, 2);
    });

    it("Nested arrays are matching with expected ones", (): void => {
      Assert.deepStrictEqual(
        twoDimensionalArray[0],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
      Assert.deepStrictEqual(
        twoDimensionalArray[1],
        [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
      );
    });

  });

});

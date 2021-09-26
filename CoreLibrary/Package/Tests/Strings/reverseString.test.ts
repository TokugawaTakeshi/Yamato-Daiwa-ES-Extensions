import reverseString from "../../Source/Strings/reverseString";
import { deepStrictEqual } from "assert";


describe("reverseString", (): void => {

  it("Basic functionality", (): void => {
    deepStrictEqual("ABC", reverseString("CBA"));
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual("𝟙𝟚𝟛", reverseString("𝟛𝟚𝟙"));
  });
});

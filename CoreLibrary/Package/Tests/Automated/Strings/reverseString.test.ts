import { reverseString } from "../../../Source";
import Assert from "assert";


describe("reverseString", (): void => {

  it("Basic functionality", (): void => {
    Assert.deepStrictEqual("ABC", reverseString("CBA"));
  });

  it("Surrogate pairs support", (): void => {
    Assert.deepStrictEqual("𝟙𝟚𝟛", reverseString("𝟛𝟚𝟙"));
  });

});

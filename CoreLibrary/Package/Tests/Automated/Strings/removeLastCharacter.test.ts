import Assert from "assert";
import { removeLastCharacter } from "../../../Source";


describe("removeLastCharacter", (): void => {

  it("Simple case", (): void => {
    Assert.strictEqual(removeLastCharacter("cats"), "cat");
  });

  it("Surrogate pairs support", (): void => {
    Assert.strictEqual(removeLastCharacter("aあ🙂😒"), "aあ🙂");
  });

});

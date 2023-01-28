import { strictEqual } from "assert";
import { removeLastCharacter } from "../../../Source";


describe("removeLastCharacter", (): void => {

  it("Simple case", (): void => {
    strictEqual(removeLastCharacter("cats"), "cat");
  });

  it("Surrogate pairs support", (): void => {
    strictEqual(removeLastCharacter("aあ🙂😒"), "aあ🙂");
  });
});

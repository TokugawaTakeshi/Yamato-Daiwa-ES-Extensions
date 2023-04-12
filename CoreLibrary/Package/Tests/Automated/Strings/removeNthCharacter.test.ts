import { removeNthCharacter } from "../../../Source";
import Assert from "assert";


describe("removeNthCharacter", (): void => {

  it("String without surrogate pairs", (): void => {

    Assert.strictEqual(
      removeNthCharacter("abcde", { numerationFrom: 0, targetCharacterNumber: 1 }),
      "acde"
    );

    Assert.strictEqual(
      removeNthCharacter("abcde", { numerationFrom: 1, targetCharacterNumber: 1 }),
      "bcde"
    );

  });

  it("String with surrogate pairs", (): void => {
    Assert.strictEqual(
      removeNthCharacter("aあ😒🙂", { numerationFrom: 1, targetCharacterNumber: 3 }), "" +
      "aあ🙂"
    );
  });

});

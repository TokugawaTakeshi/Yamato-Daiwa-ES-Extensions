import { removeNthCharacter, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "String without surrogate pairs",
    (): void => {

      Assert.strictEqual(
        removeNthCharacter("abcde", { numerationFrom: 0, targetCharacterNumber: 1 }),
        "acde"
      );

      Assert.strictEqual(
        removeNthCharacter("abcde", { numerationFrom: 1, targetCharacterNumber: 1 }),
        "bcde"
      );

    }
  ),

  Testing.test(
    "String with surrogate pairs",
    (): void => {
      Assert.strictEqual(
        removeNthCharacter("aあ😒🙂", { numerationFrom: 1, targetCharacterNumber: 3 }),
        "aあ🙂"
      );
    }
  )

]).catch(Logger.logPromiseError);


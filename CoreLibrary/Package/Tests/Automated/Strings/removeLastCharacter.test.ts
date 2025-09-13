import { removeLastCharacter, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Simple case",
    (): void => {
      Assert.strictEqual(removeLastCharacter("cats"), "cat");
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.strictEqual(removeLastCharacter("aあ🙂😒"), "aあ🙂");
    }
  )

]).catch(Logger.logPromiseError);

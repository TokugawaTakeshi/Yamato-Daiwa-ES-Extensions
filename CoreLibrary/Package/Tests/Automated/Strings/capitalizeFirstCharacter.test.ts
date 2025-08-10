import { capitalizeFirstCharacter, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Basic scenario",
    (): void => {
      Assert.deepStrictEqual(capitalizeFirstCharacter("abc"), "Abc");
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.deepStrictEqual(capitalizeFirstCharacter("a𝟚𝟛"), "A𝟚𝟛");
      Assert.deepStrictEqual(capitalizeFirstCharacter("𝟙𝟚𝟛"), "𝟙𝟚𝟛");
    }
  )

]).catch(Logger.logPromiseError);

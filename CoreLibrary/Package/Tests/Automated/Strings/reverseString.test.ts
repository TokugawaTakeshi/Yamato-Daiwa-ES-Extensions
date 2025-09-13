import { reverseString, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Basic functionality",
    (): void => {
      Assert.deepStrictEqual("ABC", reverseString("CBA"));
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.deepStrictEqual("𝟙𝟚𝟛", reverseString("𝟛𝟚𝟙"));
    }
  )

]).catch(Logger.logPromiseError);

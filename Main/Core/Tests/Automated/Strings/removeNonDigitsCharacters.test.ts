import { removeNonDigitsCharacters, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Basic case",
    (): void => {
      Assert.deepStrictEqual(removeNonDigitsCharacters("AB1 CD2E3"), "123");
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.deepStrictEqual(removeNonDigitsCharacters("😆A1B😀CD2😀E3😆"), "123");
    }
  )

]).catch(Logger.logPromiseError);

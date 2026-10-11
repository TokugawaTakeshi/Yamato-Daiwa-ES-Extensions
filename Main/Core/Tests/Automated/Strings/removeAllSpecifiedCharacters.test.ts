import { Logger, removeAllSpecifiedCharacters } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Basic case",
    (): void => {
      Assert.deepStrictEqual(removeAllSpecifiedCharacters("AB*CD*E", "*"), "ABCDE");
      Assert.deepStrictEqual(removeAllSpecifiedCharacters("A#B*CD*E#", "*#"), "ABCDE");
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.deepStrictEqual(removeAllSpecifiedCharacters("😆AB😀CD😀E😆", "😀😆"), "ABCDE");
    }
  )

]).catch(Logger.logPromiseError);

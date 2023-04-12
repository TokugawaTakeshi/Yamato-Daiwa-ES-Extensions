import { removeAllSpecifiedCharacters } from "../../../Source";
import Assert from "assert";


describe("removeAllSpecifiedCharacters", (): void => {

  it("Basic case", (): void => {
    Assert.deepStrictEqual(removeAllSpecifiedCharacters("AB*CD*E", "*"), "ABCDE");
    Assert.deepStrictEqual(removeAllSpecifiedCharacters("A#B*CD*E#", "*#"), "ABCDE");
  });

  it("Surrogate pairs support", (): void => {
    Assert.deepStrictEqual(removeAllSpecifiedCharacters("😆AB😀CD😀E😆", "😀😆"), "ABCDE");
  });

});

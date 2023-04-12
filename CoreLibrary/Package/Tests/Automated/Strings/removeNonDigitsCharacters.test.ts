import { removeNonDigitsCharacters } from "../../../Source";
import Assert from "assert";


describe("removeNonDigitsCharacters", (): void => {

  it("Basic case", (): void => {
    Assert.deepStrictEqual(removeNonDigitsCharacters("AB1 CD2E3"), "123");
  });

  it("Surrogate pairs support", (): void => {
    Assert.deepStrictEqual(removeNonDigitsCharacters("😆A1B😀CD2😀E3😆"), "123");
  });

});

import { removeNonDigitsCharacters } from "../../Source";
import { deepStrictEqual } from "assert";


describe("removeNonDigitsCharacters", (): void => {

  it("Basic case", (): void => {
    deepStrictEqual(removeNonDigitsCharacters("AB1 CD2E3"), "123");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(removeNonDigitsCharacters("😆A1B😀CD2😀E3😆"), "123");
  });
});

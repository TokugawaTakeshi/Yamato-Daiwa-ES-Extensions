import { removeNonDigitsCharacters } from "../../Source";
import { deepStrictEqual } from "assert";


describe("removeNonDigitsCharacters", (): void => {

  it("Basic case", (): void => {
    deepStrictEqual(removeNonDigitsCharacters("AB1 CD2E3"), "123");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(removeNonDigitsCharacters("ðA1BðCD2ðE3ð"), "123");
  });
});

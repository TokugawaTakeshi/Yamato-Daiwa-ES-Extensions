import { removeAllSpecifiedCharacters } from "../../Source";
import { deepStrictEqual } from "assert";


describe("removeAllSpecifiedCharacters", (): void => {

  it("Basic case", (): void => {
    deepStrictEqual(removeAllSpecifiedCharacters("AB*CD*E", "*"), "ABCDE");
    deepStrictEqual(removeAllSpecifiedCharacters("A#B*CD*E#", "*#"), "ABCDE");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(removeAllSpecifiedCharacters("ðABðCDðEð", "ðð"), "ABCDE");
  });
});

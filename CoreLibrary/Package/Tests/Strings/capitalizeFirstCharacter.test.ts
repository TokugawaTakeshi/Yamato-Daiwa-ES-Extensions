import { capitalizeFirstCharacter } from "../../Source";
import { deepStrictEqual } from "assert";


describe("capitalizeFirstCharacter", (): void => {

  it("Basic scenario", (): void => {
    deepStrictEqual(capitalizeFirstCharacter("abc"), "Abc");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(capitalizeFirstCharacter("ağğ"), "Ağğ");
    deepStrictEqual(capitalizeFirstCharacter("ğğğ"), "ğğğ");
  });
});

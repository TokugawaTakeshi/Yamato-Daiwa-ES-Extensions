import { capitalizeFirstCharacter } from "../../Source";
import { deepStrictEqual } from "assert";


describe("capitalizeFirstCharacter", (): void => {

  it("Basic scenario", (): void => {
    deepStrictEqual(capitalizeFirstCharacter("abc"), "Abc");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(capitalizeFirstCharacter("a𝟚𝟛"), "A𝟚𝟛");
    deepStrictEqual(capitalizeFirstCharacter("𝟙𝟚𝟛"), "𝟙𝟚𝟛");
  });
});

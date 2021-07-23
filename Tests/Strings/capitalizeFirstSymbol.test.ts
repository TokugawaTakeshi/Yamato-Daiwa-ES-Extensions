import { capitalizeFirstSymbol } from "../../Source";
import { deepStrictEqual } from "assert";


describe("capitalizeFirstSymbol", (): void => {

  it("Basic scenario", (): void => {
    deepStrictEqual(capitalizeFirstSymbol("abc"), "Abc");
  });

  it("Surrogate pairs support", (): void => {
    deepStrictEqual(capitalizeFirstSymbol("a𝟚𝟛"), "A𝟚𝟛");
    deepStrictEqual(capitalizeFirstSymbol("𝟙𝟚𝟛"), "𝟙𝟚𝟛");
  });
});

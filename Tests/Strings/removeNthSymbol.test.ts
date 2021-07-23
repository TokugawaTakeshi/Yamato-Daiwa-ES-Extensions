import removeNthSymbol from "../../Source/Strings/removeNthSymbol";
import { strictEqual } from "assert";


describe("removeNthSymbol", (): void => {

  it("String without surrogate pairs", (): void => {

    strictEqual(removeNthSymbol("abcde", {
      numerationFrom: 0,
      targetSymbolNumber: 1
    }), "acde");

    strictEqual(removeNthSymbol("abcde", {
      numerationFrom: 1,
      targetSymbolNumber: 1
    }), "bcde");
  });

  it("String with surrogate pairs", (): void => {
    strictEqual(removeNthSymbol("aあ😒🙂", {
      numerationFrom: 1,
      targetSymbolNumber: 3
    }), "aあ🙂");
  });
});

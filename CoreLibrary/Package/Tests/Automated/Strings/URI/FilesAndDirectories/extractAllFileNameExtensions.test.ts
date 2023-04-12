import { extractAllFileNameExtensions } from "../../../../../Source";
import Assert from "assert";


describe("extractAllFileNameExtensions", (): void => {

  describe("Partial cases", (): void => {

    it("Empty path has been processed correctly", (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: "", withLeadingDots: true }), []);
    });

    it("Root-only path has been processed correctly", (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: "/", withLeadingDots: true }), []);
    });

    it("Dot-only path has been processed correctly", (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: ".", withLeadingDots: true }), []);
    });

  });

});

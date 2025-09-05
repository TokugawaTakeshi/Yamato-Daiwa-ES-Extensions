import { extractAllFileNameExtensions, Logger } from "../../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Empty path has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: "", withLeadingDots: true }), []);
    }
  ),

  Testing.test(
    "Root-only path has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: "/", withLeadingDots: true }), []);
    }
  ),

  Testing.test(
    "Dot-only path has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(extractAllFileNameExtensions({ targetPath: ".", withLeadingDots: true }), []);
    }
  )

]).catch(Logger.logPromiseError);

import { hasStringOnlySpecificCharacters, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Digits only",
    (): void => {
      const sample: string = "1234567890";
      Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true }), true);
    }
  ),

  Testing.test(
    "Digits and dot",
    (): void => {
      const sample: string = "1234567890.";
      Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, other: "." }), true);
    }
  ),

  Testing.test(
    "Digits and latin uppercase",
    (): void => {
      const sample: string = "1234567890ABC";
      Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, latinUppercase: true }), true);
    }
  )

]).catch(Logger.logPromiseError);

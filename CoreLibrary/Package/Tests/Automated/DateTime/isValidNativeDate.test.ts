import { isValidNativeDate, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Valid Samples has been Identified Correctly",
    async (): Promise<void> => {

      const validSamples: ReadonlyArray<Date> = [
        new Date()
      ];

      await Promise.all(
        validSamples.map(
          async (validSample: Date): Promise<void> =>
            Testing.test(
              validSample.toString(),
              (): void => {
                Assert.strictEqual(isValidNativeDate(validSample), true);
              }
            )
        )
      );

    }
  ),

  Testing.suite(
    "Invalid Samples has been Identified Correctly",
    async (): Promise<void> => {

      const invalidSamples: ReadonlyArray<Date> = [
        new Date("---"),
        new Date("SD-XD-SE")
      ];

      await Promise.all(
        invalidSamples.map(
          async (invalidSample: Date): Promise<void> =>
            Testing.test(
              invalidSample.toString(),
              (): void => {
                Assert.strictEqual(isValidNativeDate(invalidSample), false);
              }
            )
        )
      );

    }
  )

]).catch(Logger.logPromiseError);

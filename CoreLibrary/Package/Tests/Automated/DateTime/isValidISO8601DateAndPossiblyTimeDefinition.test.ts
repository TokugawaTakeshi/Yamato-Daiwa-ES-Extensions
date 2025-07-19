import { isValidISO8601DateAndPossiblyTimeDefinition, Logger } from "../../../Source";
import Assert from "assert";
import Testing from "node:test";


Promise.all([

  Testing.suite(
    "Valid samples has been identified as valid",
    async (): Promise<void> => {

      await Promise.all(
        [
          "1970",
          "1970-01",
          "1970-01-01",
          "2014-10-10T04",
          "2014-10-10T04:50",
          "2014-10-10T04:50:40",
          "2014-10-10T04:50:40Z",
          "2014-10-10T13:50:40+09:00"
        ].map(
          async (validSample: string): Promise<void> => Testing.test(
            validSample,
            (): void => {
              Assert.strictEqual(isValidISO8601DateAndPossiblyTimeDefinition(validSample), true);
            }
          )
        )
      );

    }
  ),

  Testing.suite(
    "Invalid samples has been identified as invalid",
    async (): Promise<void> => {

      await Promise.all(
        [
          "1970-1-01",
          "1970-01-101",
          "2014-10-1004:50:40Z",
          "2014-10-10T13:50:40+09:00T"
        ].map(
        async (invalidSample: string): Promise<void> => Testing.test(
          invalidSample,
          (): void => {
            Assert.strictEqual(isValidISO8601DateAndPossiblyTimeDefinition(invalidSample), false);
          }
        )
      )
      );

    }
  )

]).catch(Logger.logPromiseError);

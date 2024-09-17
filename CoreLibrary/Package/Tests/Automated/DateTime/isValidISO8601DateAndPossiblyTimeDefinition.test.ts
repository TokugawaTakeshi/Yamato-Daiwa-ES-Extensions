import Assert from "assert";
import { isValidISO8601DateAndPossiblyTimeDefinition } from "../../../Source";


describe("isValidISO8601DateAndPossiblyTimeDefinition", (): void => {

  describe("Valid samples has been identified correctly", (): void => {

    const validSamples: Array<string> = [
      "1970",
      "1970-01",
      "1970-01-01",
      "2014-10-10T04",
      "2014-10-10T04:50",
      "2014-10-10T04:50:40",
      "2014-10-10T04:50:40Z",
      "2014-10-10T13:50:40+09:00"
    ];

    for (const validSample of validSamples) {
      it(`Sample '${ validSample }' is valid`, (): void => {
        Assert.strictEqual(isValidISO8601DateAndPossiblyTimeDefinition(validSample), true);
      });
    }

  });

  describe("Invalid samples has been identified correctly", (): void => {

    const invalidSamples: Array<string> = [
      "1970-1-01",
      "1970-01-101",
      "2014-10-1004:50:40Z",
      "2014-10-10T13:50:40+09:00T"
    ];

    for (const invalidSample of invalidSamples) {
      it(`Sample '${ invalidSample }' is invalid`, (): void => {
        Assert.strictEqual(isValidISO8601DateAndPossiblyTimeDefinition(invalidSample), false);
      });
    }

  });

});

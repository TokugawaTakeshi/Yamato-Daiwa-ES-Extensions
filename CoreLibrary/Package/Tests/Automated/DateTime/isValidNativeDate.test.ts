import { isValidNativeDate } from "../../../Source";
import Assert from "assert";


describe("isValidNativeDate", (): void => {

  describe("Valid samples has been identified correctly", (): void => {

    const validSamples: ReadonlyArray<Date> = [
      new Date()
    ];

    for (const validSample of validSamples) {
      it(`Sample "${ validSample.toString() }" is valid`, (): void => {
        Assert.strictEqual(isValidNativeDate(validSample), true);
      });
    }

  });

  describe("Invalid samples has been identified correctly", (): void => {

    const invalidSamples: ReadonlyArray<Date> = [
      new Date("---"),
      new Date("SD-XD-SE")
    ];

    for (const invalidSample of invalidSamples) {
      it(`Sample "${ invalidSample.toString() }" is invalid`, (): void => {
        Assert.strictEqual(isValidNativeDate(invalidSample), false);
      });
    }

  });

});

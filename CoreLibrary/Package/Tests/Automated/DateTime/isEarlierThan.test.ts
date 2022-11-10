import Assert from "assert";
import { isEarlierThan } from "../../../Source";


describe("isEarlierThan", (): void => {

  const targetDate: Date = new Date("05 October 2011 14:00 UTC");

  describe("Earlier than reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 15:00 UTC",
          mustIgnoreTime: false
        }),
        true
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 15:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

  describe("Even with reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 14:00 UTC",
          mustIgnoreTime: false
        }),
        false
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 14:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

  describe("Later than reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 11:00 UTC",
          mustIgnoreTime: false
        }),
        false
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isEarlierThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 11:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

});

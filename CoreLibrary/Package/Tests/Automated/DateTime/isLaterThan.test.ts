import Assert from "assert";
import { isLaterThan } from "../../../Source";


describe("isLaterThan", (): void => {

  const targetDate: Date = new Date("05 October 2011 14:00 UTC");

  describe("Later than reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 13:00 UTC",
          mustIgnoreTime: false
        }),
        true
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 13:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

  describe("Even with reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 14:00 UTC",
          mustIgnoreTime: false
        }),
        false
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 14:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

  describe("Earlier than reference one", (): void => {

    it("Respecting time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 13:00 UTC",
          mustIgnoreTime: false
        }),
        false
      );

    });

    it("Ignoring time", (): void => {

      Assert.strictEqual(
        isLaterThan({
          targetDateTime: targetDate,
          referenceDateTime: "05 October 2011 13:00 UTC",
          mustIgnoreTime: true
        }),
        false
      );

    });

  });

});

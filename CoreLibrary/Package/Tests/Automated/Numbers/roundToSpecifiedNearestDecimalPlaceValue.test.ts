import { roundToSpecifiedNearestDecimalPlaceValue, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "To tens",
    (): void => {

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.11, digitsCountAfterDecimalPoint: 1 }),
        1.1
      );

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.15, digitsCountAfterDecimalPoint: 1 }),
        1.2
      );

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.19, digitsCountAfterDecimalPoint: 1 }),
        1.2
      );

    }
  ),

  Testing.test(
    "To thousands",
      (): void => {

        Assert.strictEqual(
          roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.111, digitsCountAfterDecimalPoint: 2 }),
          1.11
        );

        Assert.strictEqual(
          roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.115, digitsCountAfterDecimalPoint: 2 }),
          1.12
        );

        Assert.strictEqual(
          roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.119, digitsCountAfterDecimalPoint: 2 }),
          1.12
        );

    }
  ),

  Testing.test(
    "To integer",
    (): void => {

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.1, digitsCountAfterDecimalPoint: 0 }), 1
      );

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.5, digitsCountAfterDecimalPoint: 0 }), 2
      );

      Assert.strictEqual(
        roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.9, digitsCountAfterDecimalPoint: 0 }), 2
      );

    }
  )

]).catch(Logger.logPromiseError);

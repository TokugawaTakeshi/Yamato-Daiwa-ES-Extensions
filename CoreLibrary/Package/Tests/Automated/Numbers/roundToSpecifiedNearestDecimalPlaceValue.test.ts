import { strictEqual } from "assert";
import { roundToSpecifiedNearestDecimalPlaceValue } from "../../../Source";


describe("roundToSpecifiedNearestDecimalPlaceValue", (): void => {

  it("To tens", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.11, digitsAfterDecimalPoint: 1 }
    ), 1.1);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.15, digitsAfterDecimalPoint: 1 }
    ), 1.2);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.19, digitsAfterDecimalPoint: 1 }
    ), 1.2);
  });

  it("To thousands", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.111, digitsAfterDecimalPoint: 2 }
    ), 1.11);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.115, digitsAfterDecimalPoint: 2 }
    ), 1.12);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.119, digitsAfterDecimalPoint: 2 }
    ), 1.12);
  });

  it("To integer", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.1, digitsAfterDecimalPoint: 0 }
    ), 1);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.5, digitsAfterDecimalPoint: 0 }
    ), 2);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.9, digitsAfterDecimalPoint: 0 }
    ), 2);
  });
});

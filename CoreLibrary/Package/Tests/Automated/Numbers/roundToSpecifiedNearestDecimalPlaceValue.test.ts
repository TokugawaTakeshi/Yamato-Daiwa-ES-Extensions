import { strictEqual } from "assert";
import { roundToSpecifiedNearestDecimalPlaceValue } from "../../../Source";


describe("roundToSpecifiedNearestDecimalPlaceValue", (): void => {

  it("To tens", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.11, digitsCountAfterDecimalPoint: 1 }
    ), 1.1);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.15, digitsCountAfterDecimalPoint: 1 }
    ), 1.2);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.19, digitsCountAfterDecimalPoint: 1 }
    ), 1.2);
  });

  it("To thousands", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.111, digitsCountAfterDecimalPoint: 2 }
    ), 1.11);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.115, digitsCountAfterDecimalPoint: 2 }
    ), 1.12);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.119, digitsCountAfterDecimalPoint: 2 }
    ), 1.12);
  });

  it("To integer", (): void => {

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.1, digitsCountAfterDecimalPoint: 0 }
    ), 1);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.5, digitsCountAfterDecimalPoint: 0 }
    ), 2);

    strictEqual(roundToSpecifiedNearestDecimalPlaceValue(
      { targetNumber: 1.9, digitsCountAfterDecimalPoint: 0 }
    ), 2);
  });
});

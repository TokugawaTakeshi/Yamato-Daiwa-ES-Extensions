import { roundToSpecificNearestIntegerPlaceValue } from "../../../Source";
import Assert from "assert";


describe("roundToSpecificNearestIntegerPlaceValue", (): void => {

  const experimentalSample: number = 15836;

  it("To tens", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 1
      }),
      15840
    );
  });

  it("To hundreds", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 2
      }),
      15800
    );
  });

  it("To thousands", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 3
      }),
      16000
    );
  });

  it("To ten thousands", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 4
      }),
      20000
    );
  });

  it("To hundred thousands", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 5
      }),
      20000
    );
  });

  it("The fractional number has been processed correctly", (): void => {
    Assert.strictEqual(
      roundToSpecificNearestIntegerPlaceValue({
        targetNumber: Number.parseFloat(`${ experimentalSample }.4567`),
        trailingZerosCount: 4
      }),
      20000
    );
  });

});

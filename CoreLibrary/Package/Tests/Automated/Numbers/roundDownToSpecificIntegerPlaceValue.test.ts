import { roundDownToSpecificIntegerPlaceValue } from "../../../Source";
import Assert from "assert";


describe("roundDownToSpecificIntegerPlaceValue", (): void => {

  const experimentalSample: number = 15836;

  it("To tens", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 1
      }),
      15830
    );
  });

  it("To hundreds", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 2
      }),
      15800
    );
  });

  it("To thousands", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 3
      }),
      15000
    );
  });

  it("To ten thousands", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 4
      }),
      10000
    );
  });

  it("To hundred thousands", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: experimentalSample,
        trailingZerosCount: 5
      }),
      10000
    );
  });

  it("The fractional number has been processed correctly", (): void => {
    Assert.strictEqual(
      roundDownToSpecificIntegerPlaceValue({
        targetNumber: Number.parseFloat(`${ experimentalSample }.4567`),
        trailingZerosCount: 4
      }),
      10000
    );
  });

});

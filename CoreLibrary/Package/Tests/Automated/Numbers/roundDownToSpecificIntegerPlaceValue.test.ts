import { roundDownToSpecificIntegerPlaceValue, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


const experimentalSample: number = 15836;

Promise.all([

  Testing.test(
    "Rounded Down to Tens Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 1
        }),
        15830
      );
    }
  ),

  Testing.test(
    "Rounded Down to Hundreds Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 2
        }),
        15800
      );
    }
  ),

  Testing.test(
    "Rounded Down to Thousands Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 3
        }),
        15000
      );
    }
  ),

  Testing.test(
    "Rounded Down to Ten Thousands Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 4
        }),
        10000
      );
    }
  ),

  Testing.test(
    "Rounded Down to To Hundred Thousands Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 5
        }),
        10000
      );
    }
  ),

  Testing.test(
    "The Fractional Number has been Processed Correctly",
    (): void => {
      Assert.strictEqual(
        roundDownToSpecificIntegerPlaceValue({
          targetNumber: Number.parseFloat(`${ experimentalSample }.4567`),
          trailingZerosCount: 4
        }),
        10000
      );
    }
  )

]).catch(Logger.logPromiseError);

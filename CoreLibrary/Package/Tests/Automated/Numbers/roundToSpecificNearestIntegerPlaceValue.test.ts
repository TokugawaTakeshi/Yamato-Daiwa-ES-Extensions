import { roundToSpecificNearestIntegerPlaceValue, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


const experimentalSample: number = 15836;

Promise.all([

  Testing.suite(
    "To tens",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 1
        }),
        15840
      );
    }
  ),

  Testing.suite(
    "To hundreds",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 2
        }),
        15800
      );
    }
  ),

  Testing.suite(
    "To thousands",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 3
        }),
        16000
      );
    }
  ),

  Testing.suite(
    "To ten thousands",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 4
        }),
        20000
      );
    }
  ),

  Testing.suite(
    "To hundred thousands",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 5
        }),
        20000
      );
    }
  ),

  Testing.suite(
    "The fractional number has been processed correctly",
    (): void => {
      Assert.strictEqual(
        roundToSpecificNearestIntegerPlaceValue({
          targetNumber: Number.parseFloat(`${ experimentalSample }.4567`),
          trailingZerosCount: 4
        }),
        20000
      );
    }
  )

]).catch(Logger.logPromiseError);

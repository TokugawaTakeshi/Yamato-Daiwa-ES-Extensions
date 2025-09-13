import { roundUpToSpecificIntegerPlaceValue, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


const experimentalSample: number = 15836;


Promise.all([

  Testing.test(
    "To tens",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 1
        }),
        15840
      );
    }
  ),

  Testing.test(
    "To hundreds",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 2
        }),
        15900
      );
    }
  ),

  Testing.test(
    "To thousands",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 3
        }),
        16000
      );
    }
  ),

  Testing.test(
    "To ten thousands",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 4
        }),
        20000
      );
    }
  ),

  Testing.test(
    "To hundred thousands",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: experimentalSample,
          trailingZerosCount: 5
        }),
        20000
      );
    }
  ),

  Testing.test(
    "The fractional number has been processed correctly",
    (): void => {
      Assert.strictEqual(
        roundUpToSpecificIntegerPlaceValue({
          targetNumber: Number.parseFloat(`${ experimentalSample }.4567`),
          trailingZerosCount: 4
        }),
        20000
      );
    }
  )

]).catch(Logger.logPromiseError);

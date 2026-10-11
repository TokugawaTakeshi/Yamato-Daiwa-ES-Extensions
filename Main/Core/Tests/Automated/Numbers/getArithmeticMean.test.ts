import { getArithmeticMean, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "The Arithmetic Mean of 0 Numbers has Been Computed Correctly",
    (): void => {
      Assert.strictEqual(getArithmeticMean(), 0);
    }
  ),

  Testing.test(
    "The Arithmetic Mean of 2 Numbers has Been Computed Correctly",
    (): void => {
      Assert.strictEqual(getArithmeticMean(4, 3), 3.5);
    }
  ),

  Testing.test(
    "The Arithmetic Mean of 3 Numbers has Been Computed Correctly",
    (): void => {
      Assert.strictEqual(getArithmeticMean(2, 4, 6), 4);
    }
  )

]).catch(Logger.logPromiseError);

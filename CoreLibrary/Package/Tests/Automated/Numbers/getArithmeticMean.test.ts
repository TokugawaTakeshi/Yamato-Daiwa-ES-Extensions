import { getArithmeticMean } from "../../../Source";
import Assert from "assert";


describe("getArithmeticMean", (): void => {

  it("The arithmetic mean of 2 numbers has been computed correctly", (): void => {
    Assert.strictEqual(getArithmeticMean(4, 3), 3.5);
  });

  it("The arithmetic mean of 3 numbers has been computed correctly", (): void => {
    Assert.strictEqual(getArithmeticMean(2, 4, 6), 4);
  });

});

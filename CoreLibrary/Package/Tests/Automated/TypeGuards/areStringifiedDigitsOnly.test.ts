import { areStringifiedDigitsOnly } from "../../../Source";
import Assert from "assert";


describe("areStringifiedDigitsOnly", (): void => {

  it("Must return true for a string with only digits", (): void => {
    Assert.strictEqual(areStringifiedDigitsOnly("123"), true);
  });

  it("Must return true for a string with leading zero digits", (): void => {
    Assert.strictEqual(areStringifiedDigitsOnly("032"), true);
  });

  it("Must return false for a non-string input (number)", (): void => {
    Assert.strictEqual(areStringifiedDigitsOnly(123), false);
  });

  it("Must return false for a string with scientific notation", (): void => {
    Assert.strictEqual(areStringifiedDigitsOnly("03e"), false);
  });

  it("Must return false for a string with non-digit characters", (): void => {
    Assert.strictEqual(areStringifiedDigitsOnly("ab1"), false);
  });

});

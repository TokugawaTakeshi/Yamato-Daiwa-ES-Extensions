import { hasStringOnlySpecificCharacters } from "../../../Source";
import Assert from "assert";


describe("hasStringOnlySpecificCharacters", (): void => {

  it("Digits only", (): void => {
    const sample: string = "1234567890";
    Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true }), true);
  });

  it("Digits and dot", (): void => {
    const sample: string = "1234567890.";
    Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, other: "." }), true);
  });


  it("Digits and latin uppercase", (): void => {
    const sample: string = "1234567890ABC";
    Assert.strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, latinUppercase: true }), true);
  });

});

import { strictEqual } from "assert";
import { hasStringOnlySpecificCharacters } from "../../../Source";


describe("hasStringOnlySpecificCharacters", (): void => {

  it("Digits only", (): void => {

    const sample: string = "1234567890";

    strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true }), true);
  });

  it("Digits and dot", (): void => {

    const sample: string = "1234567890.";

    strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, other: "." }), true);
  });


  it("Digits and latin uppercase", (): void => {

    const sample: string = "1234567890ABC";

    strictEqual(hasStringOnlySpecificCharacters(sample, { digits: true, latinUppercase: true }), true);
  });

});

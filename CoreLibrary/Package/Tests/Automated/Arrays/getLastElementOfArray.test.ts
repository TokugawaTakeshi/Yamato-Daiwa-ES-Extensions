import { getLastElementOfArray, UnexpectedEventError } from "../../../Source";
import Assert from "assert";


describe("getLastElementOfArray", (): void => {

  it("Normal scenario", (): void => {
    Assert.strictEqual(getLastElementOfArray([ "alpha", "bravo", "charlie" ]), "charlie");
  });

  describe("Empty array handling", (): void => {

    it("Returning of null", (): void => {
      Assert.strictEqual(getLastElementOfArray([]), null);
    });

    it("Errored scenario", (): void => {
      Assert.throws(
        (): void => { getLastElementOfArray([], { mustThrowErrorIfArrayIsEmpty: true }); },
        UnexpectedEventError
      );
    });

  });


});

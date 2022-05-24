import { getLastElementOfNonEmptyArray, UnexpectedEventError } from "../../Source";
import { strictEqual, throws } from "assert";


describe("getLastElementOfNonEmptyArray", (): void => {

  it("Normal scenario", (): void => {
    strictEqual(getLastElementOfNonEmptyArray([ "alpha", "bravo", "charlie" ]), "charlie");
  });

  it("Errored scenario", (): void => {
    throws(
      (): void => { getLastElementOfNonEmptyArray([]); },
      UnexpectedEventError
    );
  });
});

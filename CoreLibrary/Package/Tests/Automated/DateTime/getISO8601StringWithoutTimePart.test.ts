import { getISO8601StringWithoutTimePart, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("getISO8601StringWithoutTimePart", (): void => {

  it("Normal operationing", (): void => {

    Assert.strictEqual(getISO8601StringWithoutTimePart("2013-03-10T02:00:00Z"), "2013-03-10");
    Assert.strictEqual(getISO8601StringWithoutTimePart("2013-03-10"), "2013-03-10");
    Assert.strictEqual(getISO8601StringWithoutTimePart("2013-03"), "2013-03");

  });

  it("Invalid date handling", (): void => {

    Assert.throws(
      (): void => { getISO8601StringWithoutTimePart("2013-033-103T02:00:00Z"); },
      InvalidParameterValueError
    );

  });

});

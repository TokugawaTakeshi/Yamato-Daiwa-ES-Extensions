import { getISO8601StringWithoutTimePart } from "../../../Source";
import Assert from "assert";


describe("getISO8601StringWithoutTimePart", (): void => {

  describe("ISO8601", (): void => {

    it("With explicitly defined local time", (): void => {

      const experimentalSample: string = "2013-03-10T00:00:00";

      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: false,
          mustAssociateOutputWithLocalDate: true
        }),
        "2013-03-10"
      );

      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: false,
          mustAssociateOutputWithLocalDate: false
        }),
        "2013-03-09"
      );

    });

    it("Without explicitly defined local time", (): void => {

      const experimentalSample: string = "2023-01-13";

      /* Specified "2023-01-13" for UTC +00:00 and required the ISO8601 output for the same +00:00.
      *  In this case, input is even with output. */
      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: false,
          mustAssociateOutputWithLocalDate: false
        }),
        "2023-01-13"
      );

      /* Specified "2023-01-13" for UTC +00:00 and required the output for the +09:00.
      *  If some date has come at UTC +00:00, it automatically has come at UTC with positive offset. */
      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: false,
          mustAssociateOutputWithLocalDate: true
        }),
        "2023-01-13"
      );

      /* Specified "2023-01-13" (it means 00:00:00) for UTC +09:00 and required the ISO8601 output for the +00:00.
       * For the UTC +00:00, "2023-01-13" has not come yet. */
      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: true,
          mustAssociateOutputWithLocalDate: false
        }),
        "2023-01-12"
      );

      /* Specified "2023-01-13" (it means 00:00:00) for UTC +09:00 and required the ISO8601 output for the same +09:00.
       * The output will be even with input. */
      Assert.strictEqual(
        getISO8601StringWithoutTimePart({
          ISO8601Definition: experimentalSample,
          mustConsiderAsLocalIfTimeNotSpecified: true,
          mustAssociateOutputWithLocalDate: true
        }),
        "2023-01-13"
      );

    });

  });

});

import { getURI_Fragment, UnexpectedEventError } from "../../../../Source";
import Assert from "assert";


describe("getURI_Fragment", (): void => {

  describe("Presenting fragment case", (): void => {

    const sampleURI: string = "path/to/file.html#intro";

    it("Fragment with leading hash has been retrieved correctly", (): void => {

      Assert.strictEqual(
        getURI_Fragment({
          targetURI: sampleURI,
          withLeadingHash: true
        }),
        "#intro"
      );

    });

    it("Fragment without leading hash has been retrieved correctly", (): void => {

      Assert.strictEqual(
        getURI_Fragment({
          targetURI: sampleURI,
          withLeadingHash: false
        }),
        "intro"
      );

    });


  });

  describe("Missing fragment case", (): void => {

    const sampleURI: string = "path/to/file.html";

    it("Null value", (): void => {

      Assert.strictEqual(
        getURI_Fragment({
          targetURI: sampleURI,
          withLeadingHash: true
        }),
        null
      );

    });

    it("Error throwing", (): void => {

      Assert.throws(
        (): void => {
          getURI_Fragment({
           targetURI: sampleURI,
           withLeadingHash: true,
            mustThrowErrorIfNoFragmentPresents: true
          });
        },
        UnexpectedEventError
      );

    });

  });

});

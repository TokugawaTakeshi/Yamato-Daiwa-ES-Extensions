import { replace2OrMoreSpacesTo1 } from "../../../Source";
import Assert from "assert";


describe("replace2OrMoreSpacesTo1", (): void => {

  it("Works as intended", (): void => {

    Assert.strictEqual(
      replace2OrMoreSpacesTo1(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      ),
      /* eslint-disable-next-line @stylistic/max-len -- To make all spaces clearly visible. */
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

  });

});

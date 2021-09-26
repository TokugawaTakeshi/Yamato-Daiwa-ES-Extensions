import replace2OrMoreSpacesTo1 from "../../Source/Strings/replace2OrMoreSpacesTo1";
import { strictEqual } from "assert";


describe("replace2OrMoreSpacesTo1", (): void => {

  it("Works as intended", (): void => {

    strictEqual(
      replace2OrMoreSpacesTo1(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      ),
        // eslint-disable-next-line max-len
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  });
});

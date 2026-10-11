import { replace2_OrMoreSpacesTo1, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.test(
  "Works as intended",
  (): void => {

    Assert.strictEqual(
      replace2_OrMoreSpacesTo1(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      ),
      /* eslint-disable-next-line @stylistic/max-len -- To make all spaces clearly visible. */
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

  }
).catch(Logger.logPromiseError);

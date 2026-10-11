import { replaceDoubleBackslashesWithForwardSlashes, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test("All escaped backslashes has been replaced", (): void => {
    Assert.strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:\\PhpStorm\\InHouseDevelopment\\@yamato-daiwa\\es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  }),

  Testing.test("String has not been modified because all backslashes in the sample are not escaped", (): void => {
    Assert.strictEqual(
      /* eslint-disable-next-line no-useless-escape -- For testing purposes. */
      replaceDoubleBackslashesWithForwardSlashes("D:\PhpStorm\InHouseDevelopment\@yamato-daiwa\es-extensions\NodeJS"),
      "D:PhpStormInHouseDevelopment@yamato-daiwaes-extensionsNodeJS"
    );
  }),

  Testing.test("String has not been modified because because no backslashes in the sample", (): void => {
    Assert.strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  })

]).catch(Logger.logPromiseError);

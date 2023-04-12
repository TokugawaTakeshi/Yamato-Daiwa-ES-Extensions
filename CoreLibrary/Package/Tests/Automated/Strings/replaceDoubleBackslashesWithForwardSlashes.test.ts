import { replaceDoubleBackslashesWithForwardSlashes } from "../../../Source";
import Assert from "assert";


describe("replaceDoubleBackslashesWithForwardSlashes", (): void => {

  it("All escaped backslashes has been replaced", (): void => {
    Assert.strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:\\PhpStorm\\InHouseDevelopment\\@yamato-daiwa\\es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  });

  it("String has not been modified because all backslashes in the sample are not escaped", (): void => {
    Assert.strictEqual(
      /* eslint-disable-next-line no-useless-escape -- For testing purposes. */
      replaceDoubleBackslashesWithForwardSlashes("D:\PhpStorm\InHouseDevelopment\@yamato-daiwa\es-extensions\NodeJS"),
      "D:PhpStormInHouseDevelopment@yamato-daiwaes-extensionsNodeJS"
    );
  });

  it("String has not been modified because because no backslashes in the sample", (): void => {
    Assert.strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  });

});

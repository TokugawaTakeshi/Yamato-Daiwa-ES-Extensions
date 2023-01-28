import { replaceDoubleBackslashesWithForwardSlashes } from "../../../Source";
import { strictEqual } from "assert";


describe("replaceDoubleBackslashesWithForwardSlashes", (): void => {

  it("All escaped backslashes has been replaced", (): void => {
    strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:\\PhpStorm\\InHouseDevelopment\\@yamato-daiwa\\es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  });

  it("String has not been modified because all backslashes in the sample are not escaped", (): void => {
    strictEqual(
      // eslint-disable-next-line no-useless-escape
      replaceDoubleBackslashesWithForwardSlashes("D:\PhpStorm\InHouseDevelopment\@yamato-daiwa\es-extensions\NodeJS"),
      "D:PhpStormInHouseDevelopment@yamato-daiwaes-extensionsNodeJS"
    );
  });

  it("String has not been modified because because no backslashes in the sample", (): void => {
    strictEqual(
      replaceDoubleBackslashesWithForwardSlashes("D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"),
      "D:/PhpStorm/InHouseDevelopment/@yamato-daiwa/es-extensions"
    );
  });
});

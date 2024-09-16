import Assert from "assert";
import { removeSpecificSegmentsFromURI_Path } from "../../../../Source";


describe("removeSpecificSegmentsFromURI_Path", (): void => {

  it("Normal path with forward slashes path separators", (): void => {

    const samplePath: string = "foo/bar/baz/hoge/fuga/sample.txt";

    Assert.strictEqual(
      removeSpecificSegmentsFromURI_Path({
        targetPath: samplePath,
        targetSegments: [ "bar" ],
        mustOutputAlwaysWithForwardSlashesPathSeparators: true
      }),
      "foo/baz/hoge/fuga/sample.txt"
    );

    Assert.strictEqual(
      removeSpecificSegmentsFromURI_Path({
        targetPath: samplePath,
        targetSegments: [ "bar", "baz" ],
        mustOutputAlwaysWithForwardSlashesPathSeparators: true
      }),
      "foo/hoge/fuga/sample.txt"
    );

  });

});

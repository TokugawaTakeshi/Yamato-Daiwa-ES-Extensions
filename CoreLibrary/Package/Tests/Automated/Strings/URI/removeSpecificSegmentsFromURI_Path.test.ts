import { Logger, removeSpecificSegmentsFromURI_Path } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Normal path with forward slashes path separators",
    (): void => {

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

    }
  )

]).catch(Logger.logPromiseError);


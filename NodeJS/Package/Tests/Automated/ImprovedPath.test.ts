import Path from "path";
import Assert from "assert";

import ImprovedPath from "../../Source/ImprovedPath/ImprovedPath";
import { UnexpectedEventError } from "@yamato-daiwa/es-extensions";


describe("ImprovedPath", (): void => {

  describe("joinPathSegments", (): void => {

    const pathSegments: ReadonlyArray<string> = [ "/foo", "bar", "baz/asdf", "quux", ".." ];

    it("As default works as native 'Path.join'", (): void => {
      Assert.strictEqual(Path.join(...pathSegments), ImprovedPath.joinPathSegments(pathSegments));
    });

    it("With 'alwaysForwardSlashSeparators' option using forward slashes", (): void => {
      Assert.strictEqual(
        ImprovedPath.joinPathSegments(pathSegments, { alwaysForwardSlashSeparators: true }), "/foo/bar/baz/asdf"
      );
    });

  });


  describe("buildAbsolutePath", (): void => {

    const pathSegments: Array<string> = [ "foo/bar", "./baz" ];

    it("As native 'Path.resolve', computes the absolute path from current working directory", (): void => {
      Assert.strictEqual(Path.resolve(...pathSegments), ImprovedPath.buildAbsolutePathFromCurrentWorkingDirectory(pathSegments));
    });

  });

  describe("computeRelativePath", (): void => {

    it("UNIX-like relative path has being computed correctly", (): void => {
      Assert.strictEqual(
        ImprovedPath.computeRelativePath({
          basePath: "/data/orandea/test/aaa",
          comparedPath: "/data/orandea/impl/bbb"
        }),
        process.platform === "win32" ? "..\\..\\impl\\bbb" : "../../impl/bbb"
      );
    });

    it("Windows-like relative path has being computed correctly", (): void => {

      Assert.strictEqual(
        ImprovedPath.computeRelativePath({
          basePath: "C:\\orandea\\test\\aaa",
          comparedPath: "C:\\orandea\\impl\\bbb"
        }),
        process.platform === "win32" ? "..\\..\\impl\\bbb" : "../../impl/bbb"
      );

      Assert.strictEqual(
        ImprovedPath.computeRelativePath({
          basePath: "C:\\orandea\\test\\aaa",
          comparedPath: "C:\\orandea\\impl\\bbb",
          alwaysForwardSlashSeparators: true
        }),
        "../../impl/bbb"
      );

    });

  });

  describe("ImprovedPath.parse", (): void => {

    const unixLikeSampleAbsolutePath: string = "/home/user/dir/file.txt";
    const windowsLikeSampleAbsolutePath: string = "C:\\path\\dir\\file.txt";
    const unixLikeSampleRelativePath: string = "home/user/dir/file.txt";
    const windowsLikeSampleRelativePath: string = "path\\dir\\file.txt";

    describe("Root", (): void => {

      it("Root of UNIX-like absolute path recognized correctly", (): void => {

        Assert.strictEqual(ImprovedPath.parsePath(unixLikeSampleAbsolutePath).root, "/");
        Assert.strictEqual(
          Path.parse(unixLikeSampleAbsolutePath).root,
          ImprovedPath.parsePath(unixLikeSampleAbsolutePath).root
        );

      });

      it("Root of Windows-like absolute path recognized correctly", (): void => {

        const parsedWindowsLikeSampleAbsolutePath: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(windowsLikeSampleAbsolutePath);

        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.root, "C:\\");
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.root, ImprovedPath.parsePath(windowsLikeSampleAbsolutePath).root);
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.root__forwardSlashesSeparators, "C:/");

      });

      it("Root absence in UNIX-like absolute path recognized correctly", (): void => {

        const parsedUnixLikeSampleRelativePath: ImprovedPath.ParsingResult = ImprovedPath.parsePath(unixLikeSampleRelativePath);

        Assert.strictEqual(Path.parse(unixLikeSampleRelativePath).root, "");
        Assert.strictEqual(parsedUnixLikeSampleRelativePath.root, null);
        Assert.throws(
          (): void => { parsedUnixLikeSampleRelativePath.getRootExpectedToExist(); },
          { name: UnexpectedEventError.NAME }
        );

      });

      it("Root absence in UNIX-like absolute path recognized correctly", (): void => {

        const parsedWindowsLikeSampleRelativePath: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(windowsLikeSampleRelativePath);

        Assert.strictEqual(Path.parse(windowsLikeSampleRelativePath).root, "");
        Assert.strictEqual(parsedWindowsLikeSampleRelativePath.root, null);
        Assert.throws(
          (): void => { parsedWindowsLikeSampleRelativePath.getRootExpectedToExist(); },
          { name: UnexpectedEventError.NAME }
        );

      });

    });

    describe("Directory", (): void => {

      const unixLikeSampleAbsolutePathWithoutDirectory: string = "/file.txt";
      const unixLikeSampleRelativePathWithoutDirectory: string = "file.txt";
      const windowsLikeSampleAbsolutePathWithoutSubdirectory: string = "C:\\file.txt";

      it("Directory of UNIX-like absolute path recognized correctly", (): void => {

        const parsedUnixLikeSampleAbsolutePath: ImprovedPath.ParsingResult = ImprovedPath.parsePath(unixLikeSampleAbsolutePath);

        Assert.strictEqual(Path.parse(unixLikeSampleAbsolutePath).dir, "/home/user/dir");
        Assert.strictEqual(parsedUnixLikeSampleAbsolutePath.directory, "/home/user/dir");
        Assert.deepStrictEqual(
          parsedUnixLikeSampleAbsolutePath.directoryExplodedToPathSegments,
          [ "/", "home", "user", "dir" ]
        );

      });

      it("Directory even with root in UNIX-like absolute path recognized correctly", (): void => {

        const parsedUnixLikeSampleAbsolutePathWithoutDirectory: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(unixLikeSampleAbsolutePathWithoutDirectory);

        Assert.strictEqual(Path.parse(unixLikeSampleAbsolutePathWithoutDirectory).dir, "/");
        Assert.strictEqual(parsedUnixLikeSampleAbsolutePathWithoutDirectory.directory, "/");
        Assert.deepStrictEqual(
          parsedUnixLikeSampleAbsolutePathWithoutDirectory.directoryExplodedToPathSegments, [ "/" ]
        );

      });

      it("Directory absence in UNIX-like relative path recognized correctly", (): void => {

        const parsedUnixLikeSampleRelativePathWithoutDirectory: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(unixLikeSampleRelativePathWithoutDirectory);

        Assert.strictEqual(Path.parse(unixLikeSampleRelativePathWithoutDirectory).dir, "");
        Assert.strictEqual(parsedUnixLikeSampleRelativePathWithoutDirectory.directory, null);
        Assert.throws(
          (): void => { parsedUnixLikeSampleRelativePathWithoutDirectory.getDirectoryExpectedToExist(); },
          { name: UnexpectedEventError.NAME }
        );
        Assert.deepStrictEqual(
          parsedUnixLikeSampleRelativePathWithoutDirectory.directoryExplodedToPathSegments, []
        );

      });

      it("Directory of Windows-like absolute path recognized correctly", (): void => {

        const parsedWindowsLikeSampleAbsolutePath: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(windowsLikeSampleAbsolutePath);

        Assert.strictEqual(Path.parse(windowsLikeSampleAbsolutePath).dir, "C:\\path\\dir");
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.directory, "C:\\path\\dir");
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.directory__forwardSlashesSeparators, "C:/path/dir");
        Assert.deepStrictEqual(
          parsedWindowsLikeSampleAbsolutePath.directoryExplodedToPathSegments,
          [ "C:", "path", "dir" ]
        );

      });

      it("Directory even with root in Windows-like absolute path recognized correctly", (): void => {

        const parsedWindowsLikeSampleAbsolutePathWithoutDirectory: ImprovedPath.ParsingResult = ImprovedPath.
            parsePath(windowsLikeSampleAbsolutePathWithoutSubdirectory);

        Assert.strictEqual(Path.parse(windowsLikeSampleAbsolutePathWithoutSubdirectory).dir, "C:\\");
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directory, "C:\\");
        Assert.strictEqual(parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directory__forwardSlashesSeparators, "C:/");
        Assert.deepStrictEqual(
          parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directoryExplodedToPathSegments, [ "C:" ]
        );

      });
    });
  });

  describe("explodePathToSegments", (): void => {

    it("Directory of UNIX-like absolute path recognized correctly", (): void => {

      Assert.deepStrictEqual(
        ImprovedPath.explodePathToSegments("/home/user/dir/file.txt"),
        [ "/", "home", "user", "dir", "file.txt" ]
      );

      Assert.deepStrictEqual(ImprovedPath.explodePathToSegments("/file.txt"), [ "/", "file.txt" ]);

      Assert.deepStrictEqual(ImprovedPath.explodePathToSegments("file.txt"), [ "file.txt" ]);

      Assert.deepStrictEqual(ImprovedPath.explodePathToSegments("C:\\path\\dir\\file.txt"), [ "C:", "path", "dir", "file.txt" ]);

      Assert.deepStrictEqual(ImprovedPath.explodePathToSegments("C:\\file.txt"), [ "C:", "file.txt" ]);

    });

  });

  describe("doesPathEndWithFileNameExtension", (): void => {

    it("The path with file name extension has been processed correctly", (): void => {

      const samplePath: string = "/home/user/dir/file.txt";

      Assert.strictEqual(Path.extname(samplePath), ".txt");
      Assert.strictEqual(Path.parse(samplePath).ext, ".txt");
      Assert.strictEqual(ImprovedPath.doesPathEndWithFileNameExtension({
        targetPath: samplePath,
        mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: true
      }), true);

    });


    it("The path without file name extension has been processed correctly", (): void => {

      const samplePath: string = "/home/user/dir/file";

      Assert.strictEqual(Path.extname(samplePath), "");
      Assert.strictEqual(Path.parse(samplePath).ext, "");
      Assert.strictEqual(ImprovedPath.doesPathEndWithFileNameExtension({
        targetPath: samplePath,
        mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: true
      }), false);

    });

    it("The path with last segment without file name has been processed correctly", (): void => {

      const samplePath: string = "/home/user/dir/.env";

      Assert.strictEqual(Path.extname(samplePath), "");
      Assert.strictEqual(Path.parse(samplePath).ext, "");
      Assert.strictEqual(Path.basename(samplePath), ".env");

      Assert.strictEqual(ImprovedPath.doesPathEndWithFileNameExtension({
        targetPath: samplePath,
        mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: true
      }), true);

      Assert.strictEqual(ImprovedPath.doesPathEndWithFileNameExtension({
        targetPath: samplePath,
        mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: false
      }), false);

    });

    it("The path with multiple filename extensions has been processed correctly", (): void => {

      const samplePath: string = "/home/user/dir/Component.pug.vue";

      Assert.strictEqual(Path.extname(samplePath), ".vue");
      Assert.strictEqual(Path.parse(samplePath).ext, ".vue");
      Assert.strictEqual(ImprovedPath.doesPathEndWithFileNameExtension({
        targetPath: samplePath,
        mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: true
      }), true);

    });

  });


  describe("extractFileNameWithExtensionFromPath", (): void => {

    const tests: ReadonlyArray<{ title: string; experimentalSample: string; expectedOutput: string; }> = [
      {
        title: "Extension without file name and directory has been recognized correctly",
        experimentalSample: ".env",
        expectedOutput: ".env"
      },
      {
        title: "Double extension without file name and directory has been recognized correctly",
        experimentalSample: ".env.local",
        expectedOutput: ".env.local"
      },
      {
        title: "File name with extension but without directory has been recognized correctly",
        experimentalSample: "fileName.env.local",
        expectedOutput: "fileName.env.local"
      },
      {
        title: "Extension without file name but with directory has been recognized correctly",
        experimentalSample: "directory/.env",
        expectedOutput: "directory/.env"
      },
      {
        title: "Double extension without file name but with directory has been recognized correctly",
        experimentalSample: "directory/.env.local",
        expectedOutput: "directory/.env.local"
      },
      {
        title: "File name with double extension and directory has been recognized correctly",
        experimentalSample: "directory/fileName.env.local",
        expectedOutput: "directory/fileName.env.local"
      }
    ];


    for (const test of tests) {

      it(test.title, (): void => {
        Assert.strictEqual(
          ImprovedPath.extractFileNameWithExtensionFromPath({
            targetPath: test.experimentalSample,
            mustThrowErrorIfLastPathSegmentHasNoDots: false
          }),
          test.expectedOutput
        );
      });

    }

    it("Last path segment without dots is being processed correctly", (): void => {

      const experimentalSample: string = "segment1/segment2";

      Assert.strictEqual(
        ImprovedPath.extractFileNameWithExtensionFromPath({
          targetPath: experimentalSample,
          mustThrowErrorIfLastPathSegmentHasNoDots: false
        }),
        null
      );

      Assert.throws(
        (): void => {
          ImprovedPath.extractFileNameWithExtensionFromPath({
            targetPath: experimentalSample,
            mustThrowErrorIfLastPathSegmentHasNoDots: false
          });
        },
        UnexpectedEventError
      );

    });

  });


  describe("extractFileNameWithoutExtensionFromPath", (): void => {

    const tests: ReadonlyArray<{ title: string; experimentalSample: string; expectedOutput: string | null; }> = [
      {
        title: "Extension without file name and directory has been recognized correctly",
        experimentalSample: ".env",
        expectedOutput: null
      },
      {
        title: "Double extension without file name and directory has been recognized correctly",
        experimentalSample: ".env.local",
        expectedOutput: null
      },
      {
        title: "File name with extension but without directory has been recognized correctly",
        experimentalSample: "fileName.env.local",
        expectedOutput: "fileName"
      },
      {
        title: "Extension without file name but with directory has been recognized correctly",
        experimentalSample: "directory/.env",
        expectedOutput: null
      },
      {
        title: "Double extension without file name but with directory has been recognized correctly",
        experimentalSample: "directory/.env.local",
        expectedOutput: null
      },
      {
        title: "File name with double extension and directory has been recognized correctly",
        experimentalSample: "directory/fileName.env.local",
        expectedOutput: "fileName"
      }
    ];

    for (const test of tests) {

      it(test.title, (): void => {
        Assert.strictEqual(
            ImprovedPath.extractFileNameWithExtensionFromPath({
              targetPath: test.experimentalSample,
              mustThrowErrorIfLastPathSegmentHasNoDots: false
            }),
            test.expectedOutput
        );
      });

    }

  });

});

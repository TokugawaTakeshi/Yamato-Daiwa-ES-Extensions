import { ImprovedPath } from "../../Source";
import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";

import Testing from "node:test";
import Assert from "assert";
import Path from "path";


Promise.all([

  Testing.suite(
    "joinPathSegments",
    async (): Promise<void> => {

      const pathSegments: ReadonlyArray<string> = [ "/foo", "bar", "baz/asdf", "quux", ".." ];

      await Promise.all([

        Testing.test(
          "As default works as native `Path.join`",
          (): void => {
            Assert.strictEqual(Path.join(...pathSegments), ImprovedPath.joinPathSegments(pathSegments));
          }
        ),

        Testing.test(
          "With `alwaysForwardSlashSeparators` option using forward slashes",
            (): void => {
            Assert.strictEqual(
              ImprovedPath.joinPathSegments(pathSegments, { alwaysForwardSlashSeparators: true }), "/foo/bar/baz/asdf"
            );
          }
        )

      ]);

    }
  ),

  Testing.suite(
    "buildAbsolutePath",
    async (): Promise<void> =>
        Testing.test(
          "As native 'Path.resolve', computes the absolute path from current working directory",
          (): void => {

            const pathSegments: Array<string> = [ "foo/bar", "./baz" ];

            Assert.strictEqual(
              Path.resolve(...pathSegments),
              ImprovedPath.buildAbsolutePathFromCurrentWorkingDirectory(pathSegments)
            );

          }
        )
  ),

  Testing.suite(
    "computeRelativePath",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "UNIX-like relative path has being computed correctly",
          (): void => {
            Assert.strictEqual(
              ImprovedPath.computeRelativePath({
                basePath: "/data/orandea/test/aaa",
                comparedPath: "/data/orandea/impl/bbb"
              }),
              process.platform === "win32" ? "..\\..\\impl\\bbb" : "../../impl/bbb"
            );
          }
        ),

        Testing.test(
          "Windows-like relative path has being computed correctly",
          (): void => {

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

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "parsePath",
    async (): Promise<void> => {

      const unixLikeSampleAbsolutePath: string = "/home/user/dir/file.txt";
      const windowsLikeSampleAbsolutePath: string = "C:\\path\\dir\\file.txt";
      const unixLikeSampleRelativePath: string = "home/user/dir/file.txt";
      const windowsLikeSampleRelativePath: string = "path\\dir\\file.txt";

      await Promise.all([

        Testing.suite(
          "Root",
          async (): Promise<void> => {

            await Promise.all([

              Testing.test(
                "Root of UNIX-like absolute path recognized correctly",
                (): void => {

                  Assert.strictEqual(ImprovedPath.parsePath(unixLikeSampleAbsolutePath).root, "/");
                  Assert.strictEqual(
                    Path.parse(unixLikeSampleAbsolutePath).root,
                    ImprovedPath.parsePath(unixLikeSampleAbsolutePath).root
                  );

                }
              ),

              Testing.test(
                "Root of Windows-like absolute path recognized correctly",
                  (): void => {

                    const parsedWindowsLikeSampleAbsolutePath: ImprovedPath.ParsingResult = ImprovedPath.
                    parsePath(windowsLikeSampleAbsolutePath);

                    Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.root, "C:\\");
                    Assert.strictEqual(
                      parsedWindowsLikeSampleAbsolutePath.root,
                      ImprovedPath.parsePath(windowsLikeSampleAbsolutePath).root
                    );
                    Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.root__forwardSlashesSeparators, "C:/");

                }
              ),

              Testing.test(
                "Root absence in UNIX-like absolute path recognized correctly",
                (): void => {

                  const parsedUnixLikeSampleRelativePath: ImprovedPath.ParsingResult =
                      ImprovedPath.parsePath(unixLikeSampleRelativePath);

                  Assert.strictEqual(Path.parse(unixLikeSampleRelativePath).root, "");
                  Assert.strictEqual(parsedUnixLikeSampleRelativePath.root, null);
                  Assert.throws(
                    (): void => { parsedUnixLikeSampleRelativePath.getRootExpectedToExist(); },
                    { name: UnexpectedEventError.NAME }
                  );

                }
              ),

              Testing.test(
                "Root absence in UNIX-like absolute path recognized correctly",
                (): void => {

                  const parsedWindowsLikeSampleRelativePath: ImprovedPath.ParsingResult = ImprovedPath.
                  parsePath(windowsLikeSampleRelativePath);

                  Assert.strictEqual(Path.parse(windowsLikeSampleRelativePath).root, "");
                  Assert.strictEqual(parsedWindowsLikeSampleRelativePath.root, null);
                  Assert.throws(
                    (): void => { parsedWindowsLikeSampleRelativePath.getRootExpectedToExist(); },
                    { name: UnexpectedEventError.NAME }
                  );
                }
              )

            ]);

          }
        ),

        Testing.suite(
          "Directory",
          async (): Promise<void> => {

            const unixLikeSampleAbsolutePathWithoutDirectory: string = "/file.txt";
            const unixLikeSampleRelativePathWithoutDirectory: string = "file.txt";
            const windowsLikeSampleAbsolutePathWithoutSubdirectory: string = "C:\\file.txt";

            await Promise.all([

              Testing.test(
                "Directory of UNIX-like absolute path recognized correctly",
                  (): void => {

                  const parsedUnixLikeSampleAbsolutePath: ImprovedPath.ParsingResult =
                      ImprovedPath.parsePath(unixLikeSampleAbsolutePath);

                  Assert.strictEqual(Path.parse(unixLikeSampleAbsolutePath).dir, "/home/user/dir");
                  Assert.strictEqual(parsedUnixLikeSampleAbsolutePath.directory, "/home/user/dir");
                  Assert.deepStrictEqual(
                    parsedUnixLikeSampleAbsolutePath.directoryExplodedToPathSegments,
                    [ "/", "home", "user", "dir" ]
                  );

                }
              ),

              Testing.test(
                "Directory even with root in UNIX-like absolute path recognized correctly",
                  (): void => {

                    const parsedUnixLikeSampleAbsolutePathWithoutDirectory: ImprovedPath.ParsingResult =
                        ImprovedPath.parsePath(unixLikeSampleAbsolutePathWithoutDirectory);

                    Assert.strictEqual(Path.parse(unixLikeSampleAbsolutePathWithoutDirectory).dir, "/");
                    Assert.strictEqual(parsedUnixLikeSampleAbsolutePathWithoutDirectory.directory, "/");
                    Assert.deepStrictEqual(
                      parsedUnixLikeSampleAbsolutePathWithoutDirectory.directoryExplodedToPathSegments, [ "/" ]
                    );

                }
              ),

              Testing.test(
                "Directory absence in UNIX-like relative path recognized correctly",
                (): void => {

                  const parsedUnixLikeSampleRelativePathWithoutDirectory: ImprovedPath.ParsingResult =
                      ImprovedPath.parsePath(unixLikeSampleRelativePathWithoutDirectory);

                  Assert.strictEqual(Path.parse(unixLikeSampleRelativePathWithoutDirectory).dir, "");
                  Assert.strictEqual(parsedUnixLikeSampleRelativePathWithoutDirectory.directory, null);
                  Assert.throws(
                    (): void => { parsedUnixLikeSampleRelativePathWithoutDirectory.getDirectoryExpectedToExist(); },
                    UnexpectedEventError
                  );
                  Assert.deepStrictEqual(
                    parsedUnixLikeSampleRelativePathWithoutDirectory.directoryExplodedToPathSegments, []
                  );

                }
              ),

              Testing.test(
                "Directory of Windows-like absolute path recognized correctly",
                (): void => {

                  const parsedWindowsLikeSampleAbsolutePath: ImprovedPath.ParsingResult =
                      ImprovedPath.parsePath(windowsLikeSampleAbsolutePath);

                  Assert.strictEqual(Path.parse(windowsLikeSampleAbsolutePath).dir, "C:\\path\\dir");
                  Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.directory, "C:\\path\\dir");
                  Assert.strictEqual(parsedWindowsLikeSampleAbsolutePath.directory__forwardSlashesSeparators, "C:/path/dir");
                  Assert.deepStrictEqual(
                    parsedWindowsLikeSampleAbsolutePath.directoryExplodedToPathSegments,
                    [ "C:", "path", "dir" ]
                  );

                }
              ),

              Testing.test(
                "Directory even with root in Windows-like absolute path recognized correctly",
                (): void => {

                  const parsedWindowsLikeSampleAbsolutePathWithoutDirectory: ImprovedPath.ParsingResult = ImprovedPath.
                  parsePath(windowsLikeSampleAbsolutePathWithoutSubdirectory);

                  Assert.strictEqual(Path.parse(windowsLikeSampleAbsolutePathWithoutSubdirectory).dir, "C:\\");
                  Assert.strictEqual(parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directory, "C:\\");
                  Assert.strictEqual(
                    parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directory__forwardSlashesSeparators,
                    "C:/"
                  );
                  Assert.deepStrictEqual(
                    parsedWindowsLikeSampleAbsolutePathWithoutDirectory.directoryExplodedToPathSegments, [ "C:" ]
                  );

                }
              )

            ]);

          }
        )

      ]);
    }
  ),

  Testing.suite(
    "explodePathToSegments",
    async (): Promise<void> =>
        Testing.test(
        "Directory of UNIX-like absolute path recognized correctly",
        (): void => {

          Assert.deepStrictEqual(
            ImprovedPath.explodePathToSegments("/home/user/dir/file.txt"),
            [ "/", "home", "user", "dir", "file.txt" ]
          );

          Assert.deepStrictEqual(
            ImprovedPath.explodePathToSegments("/file.txt"), [ "/", "file.txt" ]
          );

          Assert.deepStrictEqual(
            ImprovedPath.explodePathToSegments("file.txt"), [ "file.txt" ]
          );

          Assert.deepStrictEqual(
            ImprovedPath.explodePathToSegments("C:\\path\\dir\\file.txt"), [ "C:", "path", "dir", "file.txt" ]
          );

          Assert.deepStrictEqual(
            ImprovedPath.explodePathToSegments("C:\\file.txt"), [ "C:", "file.txt" ]
          );

        }
      )
  ),

  Testing.suite(
    "extractFileNameWithoutExtensionFromPath",
    async (): Promise<void> => {

      type Test = Readonly<{ title: string; experimentalSample: string; expectedOutput: string | null; }>;

      const tests: ReadonlyArray<Test> = [
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
        },
        {
          title: "Empty path",
          experimentalSample: "",
          expectedOutput: null
        }
      ];

      await Promise.all([
        tests.map(
          async (test: Test): Promise<void> =>
              Testing.test(
                test.title,
                (): void => {
                  Assert.strictEqual(
                      ImprovedPath.extractFileNameWithoutExtensionFromPath({
                        targetPath: test.experimentalSample,
                        mustThrowErrorIfLastPathSegmentHasNoDots: false
                      }),
                      test.expectedOutput
                  );
                }
              )
        )
      ]);

    }
  ),

  Testing.suite(
    "extractDirectoryFromFilePath",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "Root only path has been recognized correctly",
          (): void => {

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: "/",
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "/"
            );

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: "C:\\",
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "C:/"
            );

          }
        ),

        Testing.test(
          "Path with leading dot at last segment has been processed correctly",
          (): void => {

            const samplePath: string = "path/to/file/.env";

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: true,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to/file/.env"
            );

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to/file"
            );

          }
        ),

        Testing.test(
          "Path with non-leading dot at last segment has been processed correctly",
          (): void => {

            const samplePath: string = "path/to/file/sample.ts";

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to/file"
            );

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: true,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to/file/sample.ts"
            );

          }
        ),

        Testing.test(
          "Path without dot at last segment has been processed correctly",
          (): void => {

            const samplePath: string = "path/to/Dockerfile";

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: true
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to"
            );

            Assert.strictEqual(
              ImprovedPath.extractDirectoryFromFilePath({
                targetPath: samplePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: false
                },
                alwaysForwardSlashSeparators: true
              }),
              "path/to/Dockerfile"
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

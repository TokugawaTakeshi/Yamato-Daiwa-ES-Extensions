import { ImprovedGlob } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";
import { Logger, replaceDoubleBackslashesWithForwardSlashes } from "@yamato-daiwa/es-extensions";
import Path from "path";


Testing.

    suite(
      ImprovedGlob.name,
      async (): Promise<void> => {

        await Promise.all([

          Testing.todo(
            ImprovedGlob.getFilesAbsolutePathsSynchronously.name
          ),

          Testing.test(
            ImprovedGlob.isFilePathMatchingWithGlobSelector.name,
            (): void => {

              const globSelector: string = "dirA/dirB/**.md";

              const experimentalSamples: ReadonlyMap<string, boolean> = new Map([
                [ "dirA/dirB/sample.md", true ]
              ]);

              for (const [ filePath, mustMatch ] of experimentalSamples.entries()) {
                Assert.strictEqual(
                  ImprovedGlob.isFilePathMatchingWithGlobSelector({ filePath, globSelector }),
                  mustMatch
                );
              }

            }
          ),

          Testing.todo(
            ImprovedGlob.isFilePathMatchingWithAllGlobSelectors.name
          ),

          Testing.todo(
            ImprovedGlob.isExcludingGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.buildAllFilesInCurrentDirectoryButNotBelowGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector.name,
            async (): Promise<void> => {

              const SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE: string = "SampleFiles/folder1/folder1-1";

              const TARGET_FILE_NAME_POSTFIXES: Set<string> = new Set([ "foo", "bar" ]);
              const TARGET_FILE_NAMES_EXTENSIONS: Set<string> = new Set([ "pug" ]);

              /* [ Approach ]
               * Intentionally add both variants with the leading dot and without it because ImprovedGlob must support
               *    all of them. */
              const TARGET_PENULTIMATE_FILE_NAMES_EXTENSIONS: Set<string> = new Set([ "hoge", ".fuga" ]);

              await Promise.all([

                Testing.test(
                  "Capturing of Files With Specific Names Postfixes Works",
                  (): void => {

                    Assert.strictEqual(
                      ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                        basicDirectoryPath: SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE,
                        fileNamesPostfixes: TARGET_FILE_NAME_POSTFIXES,
                        fileNamesExtensions: TARGET_FILE_NAMES_EXTENSIONS
                      }),
                      "SampleFiles/folder1/folder1-1/**/*@(foo|bar).@(pug)"
                    );

                    const absolutePathsOfCapturedFiles: ReadonlyArray<string> = ImprovedGlob.getFilesAbsolutePathsSynchronously(
                      [
                        ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                          basicDirectoryPath:
                              Path.join(__dirname, SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE),
                          fileNamesPostfixes: TARGET_FILE_NAME_POSTFIXES,
                          fileNamesExtensions: TARGET_FILE_NAMES_EXTENSIONS
                        })
                      ],
                      { alwaysForwardSlashSeparators: true }
                    );

                    Assert.strictEqual(absolutePathsOfCapturedFiles.length, 2);

                    const capturedFilesPathsRelativeToDirectoryOfCurrentFile: ReadonlyArray<string> =
                        absolutePathsOfCapturedFiles.
                            map(
                              (absolutePathOfCapturedFile: string): string =>
                                  replaceDoubleBackslashesWithForwardSlashes(
                                    Path.relative(__dirname, absolutePathOfCapturedFile)
                                  )
                            );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1.foo.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1.bar.pug"),
                      true
                    );

                  }
                ),

                Testing.test(
                  "Capturing of Files With Specific Penultimate Filename Extensions Works",
                  (): void => {

                    Assert.strictEqual(
                      ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                        basicDirectoryPath: SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE,
                        penultimateFileNamesExtensions: TARGET_PENULTIMATE_FILE_NAMES_EXTENSIONS,
                        fileNamesExtensions: TARGET_FILE_NAMES_EXTENSIONS
                      }),
                      "SampleFiles/folder1/folder1-1/**/*.@(hoge|fuga).@(pug)"
                    );

                    const absolutePathsOfCapturedFiles: ReadonlyArray<string> = ImprovedGlob.getFilesAbsolutePathsSynchronously(
                      [
                        ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                          basicDirectoryPath:
                              Path.join(__dirname, SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE),
                          penultimateFileNamesExtensions: TARGET_PENULTIMATE_FILE_NAMES_EXTENSIONS,
                          fileNamesExtensions: TARGET_FILE_NAMES_EXTENSIONS
                        })
                      ],
                      { alwaysForwardSlashSeparators: true }
                    );

                    Assert.strictEqual(absolutePathsOfCapturedFiles.length, 8);

                    const capturedFilesPathsRelativeToDirectoryOfCurrentFile: ReadonlyArray<string> =
                        absolutePathsOfCapturedFiles.
                            map(
                              (absolutePathOfCapturedFile: string): string =>
                                  replaceDoubleBackslashesWithForwardSlashes(
                                    Path.relative(__dirname, absolutePathOfCapturedFile)
                                  )
                            );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__foo.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__bar.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__baz.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__quux.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__foo.fuga.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__bar.fuga.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__baz.fuga.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__quux.fuga.pug"),
                      true
                    );

                  }
                ),

                Testing.test(
                  "Capturing of Files With Specific Names Postfixes and Penultimate Filename Extensions Works",
                  (): void => {

                    Assert.strictEqual(
                      ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                        basicDirectoryPath: SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE,
                        fileNamesPostfixes: [ "foo", "bar" ],
                        penultimateFileNamesExtensions: [ "hoge", ".fuga" ],
                        fileNamesExtensions: [ "pug" ]
                      }),
                      "SampleFiles/folder1/folder1-1/**/*@(foo|bar).@(hoge|fuga).@(pug)"
                    );

                    const absolutePathsOfCapturedFiles: ReadonlyArray<string> = ImprovedGlob.getFilesAbsolutePathsSynchronously(
                      [
                        ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
                          basicDirectoryPath:
                              Path.join(__dirname, SAMPLE_FILES_DIRECTORY_PATH_RELATIVE_TO_DIRECTORY_OF_CURRENT_FILE),
                          fileNamesPostfixes: [ "foo", "bar" ],
                          penultimateFileNamesExtensions: [ "hoge", ".fuga" ],
                          fileNamesExtensions: [ "pug" ]
                        })
                      ],
                      { alwaysForwardSlashSeparators: true }
                    );

                    Assert.strictEqual(absolutePathsOfCapturedFiles.length, 4);

                    const capturedFilesPathsRelativeToDirectoryOfCurrentFile: ReadonlyArray<string> =
                        absolutePathsOfCapturedFiles.
                            map(
                              (absolutePathOfCapturedFile: string): string =>
                                  replaceDoubleBackslashesWithForwardSlashes(
                                    Path.relative(__dirname, absolutePathOfCapturedFile)
                                  )
                            );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__foo.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__bar.hoge.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__foo.fuga.pug"),
                      true
                    );

                    Assert.strictEqual(
                      capturedFilesPathsRelativeToDirectoryOfCurrentFile.
                          includes("SampleFiles/folder1/folder1-1/sample1__bar.fuga.pug"),
                      true
                    );

                  }
                )

              ]);

            }
          ),

          Testing.todo(
            ImprovedGlob.buildExcludingOfDirectoryWithSubdirectoriesGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.buildExcludingOfFilesWithSpecificPrefixesGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.buildExcludingOfFilesInSubdirectoriesWithSpecificPrefixesGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.buildExcludingOfFilesInSpecificSubdirectoriesGlobSelector.name
          ),

          Testing.todo(
            ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix.name
          ),

          Testing.todo(
            ImprovedGlob.buildAbsolutePathBasedGlob.name
          ),

          Testing.todo(
            ImprovedGlob.includingGlobSelectorToExcludingOne.name
          ),

          Testing.todo(
            ImprovedGlob.includingGlobSelectorsToExcludingOnes.name
          )

        ]);

      }
    ).

    catch(Logger.throwErrorWithFormattedMessage);

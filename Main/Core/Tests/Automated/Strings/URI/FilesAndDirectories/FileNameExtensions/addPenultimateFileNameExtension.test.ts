import { addPenultimateFileNameExtension, Logger } from "../../../../../../Source";
import Testing from "node:test";
import Assert from "node:assert";


Testing.

    suite(
      addPenultimateFileNameExtension.name,
      async (): Promise<void> => {

        await Promise.all([

          Testing.test(
            "Basic Scenario",
            (): void => {

              Assert.strictEqual(
                addPenultimateFileNameExtension({
                  targetPath: "directory1/directory2/file.md",
                  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                }),
                "directory1/directory2/file.ja.md"
              );

            }
          ),

          Testing.test(
            "Respecting of hash",
            (): void => {

              Assert.strictEqual(
                addPenultimateFileNameExtension({
                  targetPath: "directory1/directory2/file.md#section-1",
                  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                }),
                "directory1/directory2/file.ja.md#section-1"
              );

            }
          ),

          Testing.suite(
            "Duplicates Handling",
            async (): Promise<void> => {

              await Promise.all([

                Testing.test(
                  "Appending of Duplicates",
                  (): void => {

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file.ja.md",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: true,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file.ja.ja.md"
                    );

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file.ja.md#section-1",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: true,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file.ja.ja.md#section-1"
                    );

                  }
                ),

                Testing.test(
                  "Skipping of Duplicates",
                  (): void => {

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file.ja.md",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file.ja.md"
                    );

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file.ja.md#section-1",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file.ja.md#section-1"
                    );

                  }
                )

              ]);

            }
          ),

          Testing.suite(
            "Main File Name Extension Absence Handling",
            async (): Promise<void> => {

              await Promise.all([

                Testing.test(
                  "Appending of Specified Extension as Main One",
                  (): void => {

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: true
                      }),
                      "directory1/directory2/file.ja"
                    );

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file#section-1",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: true
                      }),
                      "directory1/directory2/file.ja#section-1"
                    );

                  }
                ),

                Testing.test(
                  "Skipping of Paths without Main File Name Extension",
                  (): void => {

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file"
                    );

                    Assert.strictEqual(
                      addPenultimateFileNameExtension({
                        targetPath: "directory1/directory2/file#section-1",
                        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
                        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
                        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
                      }),
                      "directory1/directory2/file#section-1"
                    );

                  }
                )

              ]);

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

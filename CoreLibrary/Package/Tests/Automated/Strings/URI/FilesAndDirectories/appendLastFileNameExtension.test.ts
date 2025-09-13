import { appendLastFileNameExtension, Logger } from "../../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Case with path without filename extension",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "File name extension has been appended",
          (): void => {

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file",
                targetFileNameExtensionWithOrWithoutLeadingDot: "md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.md"
            );

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file",
                targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.md"
            );

          }
        ),

        Testing.test(
          "File name extension has been appended herewith the fragment has been kept",
          (): void => {

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file#description",
                targetFileNameExtensionWithOrWithoutLeadingDot: "md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.md#description"
            );

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file#description",
                targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.md#description"
            );

          }
        ),

        Testing.test(
          "Path with fragment and surrogate pairs has been processed correctly",
          (): void => {

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file🙂#😃description",
                targetFileNameExtensionWithOrWithoutLeadingDot: "md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file🙂.md#😃description"
            );

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file🙂#😃description",
                targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file🙂.md#😃description"
            );

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "Case with path including filename extension",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "One more file name extension has been appended",
          (): void => {

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file.php",
                targetFileNameExtensionWithOrWithoutLeadingDot: "blade",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.php.blade"
            );

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file.php",
                targetFileNameExtensionWithOrWithoutLeadingDot: ".blade",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.php.blade"
            );

          }
        ),

        Testing.test(
          "One more file name extension has been appended herewith the fragment has been kept",
          (): void => {

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file.php#section",
                targetFileNameExtensionWithOrWithoutLeadingDot: "blade",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.php.blade#section"
            );

            Assert.strictEqual(
              appendLastFileNameExtension({
                targetPath: "path/to/some/file.php#section",
                targetFileNameExtensionWithOrWithoutLeadingDot: ".blade",
                mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
              }),
              "path/to/some/file.php.blade#section"
            );

          }
        )

      ]).catch(Logger.logPromiseError);

    }
  ),

  Testing.test(
    "Duplicating of filename extension has been processed correctly depending on options",
    (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php",
          targetFileNameExtensionWithOrWithoutLeadingDot: "php",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.php"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".php",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: true
        }),
        "path/to/some/file.php.php"
      );

    }
  )

]).catch(Logger.logPromiseError);

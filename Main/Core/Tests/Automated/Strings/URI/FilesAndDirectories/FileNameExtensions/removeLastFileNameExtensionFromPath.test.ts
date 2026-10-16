import { removeLastFileNameExtensionFromPath, Logger } from "../../../../../../Source";
import Testing from "node:test";
import Assert from "node:assert";


Testing.

    suite(
      removeLastFileNameExtensionFromPath.name,
      async (): Promise<void> => {

        await Promise.all([

          Testing.test(
            "Basic Scenario",
            (): void => {

              Assert.strictEqual(
                removeLastFileNameExtensionFromPath("directory1/directory2/file.razor.pug"),
                "directory1/directory2/file.razor"
              );

              Assert.strictEqual(
                removeLastFileNameExtensionFromPath("directory1/directory2/file.pug"),
                "directory1/directory2/file"
              );

            }
          ),

          Testing.test(
            "Keeping as is Paths not Including File Name Extensions ",
            (): void => {

              Assert.strictEqual(
                removeLastFileNameExtensionFromPath("directory1/directory2/file"),
                "directory1/directory2/file"
              );

              Assert.strictEqual(
                removeLastFileNameExtensionFromPath("directory1/sub.directory2/file"),
                "directory1/sub.directory2/file"
              );

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

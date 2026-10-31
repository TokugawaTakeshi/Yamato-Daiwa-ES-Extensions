import Testing from "node:test";
import Assert from "node:assert";
import Path from "node:path";
import { ImprovedPath } from "../../../Source";
import { Logger } from "@yamato-daiwa/es-extensions";


Testing.

    suite(
      `${ ImprovedPath.name }.${ ImprovedPath.joinPathSegments.name }`,
      async (): Promise<void> => {

        const pathSegments: ReadonlyArray<string> = [ "/foo", "bar", "baz\\asdf", "quux", ".." ];

        await Promise.all([

          Testing.test(
            "As default works as native `Path.join()`",
            (): void => {
              Assert.strictEqual(Path.join(...pathSegments), ImprovedPath.joinPathSegments(...pathSegments));
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
    ).

    catch(Logger.logPromiseError);

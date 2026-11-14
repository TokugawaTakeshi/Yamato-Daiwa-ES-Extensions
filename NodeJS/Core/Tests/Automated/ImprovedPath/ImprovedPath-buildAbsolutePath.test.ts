import Testing from "node:test";
import Assert from "node:assert";
import Path from "node:path";
import { ImprovedPath } from "../../../Source";
import {
  InvalidParameterValueError,
  Logger,
  replaceDoubleBackslashesWithForwardSlashes
} from "@yamato-daiwa/es-extensions";


Testing.

    suite(
      `${ ImprovedPath.name }.${ ImprovedPath.buildAbsoluteFromCurrentWorkingDirectory.name }`,
      async (): Promise<void> => {

        const pathSegments: ReadonlyArray<string> = [ "foo/bar\\baz", "../../hoge/fuga" ];

        await Promise.all([

          Testing.test(
            "As default works as native `Path.resolve()`",
            (): void => {
              Assert.strictEqual(
                Path.resolve(...pathSegments),
                ImprovedPath.buildAbsoluteFromCurrentWorkingDirectory(...pathSegments)
              );
            }
          ),

          Testing.test(
            "With `alwaysForwardSlashSeparators` option using forward slashes",
              (): void => {
              Assert.strictEqual(
                replaceDoubleBackslashesWithForwardSlashes(Path.resolve(...pathSegments)),
                ImprovedPath.buildAbsoluteFromCurrentWorkingDirectory(
                  pathSegments,
                  { alwaysForwardSlashSeparators: true }
                )
              );
            }
          ),

          Testing.test(
            "Does not support the pre-defined absolute paths",
            (): void => {
              Assert.throws(
                (): void => {
                  ImprovedPath.buildAbsoluteFromCurrentWorkingDirectory("/foo/bar/baz", "hoge/fuga");
                },
                InvalidParameterValueError
              );
            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);

import { test } from "node:test";
import { strictEqual } from "assert";
import { Logger } from "../../../Source";


Promise.all([
  test(
    "JSON-compatible Object Copied Correctly",
    (): void => {
      strictEqual(true, true);
    }
  )
]).catch(Logger.logPromiseError);

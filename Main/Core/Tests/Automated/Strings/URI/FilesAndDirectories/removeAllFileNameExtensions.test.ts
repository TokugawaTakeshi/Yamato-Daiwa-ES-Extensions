import { removeAllFileNameExtensions, Logger } from "../../../../../Source";
import Testing from "node:test";
import Assert from "assert";


const samplePath: string = "01-Source\\Implementation\\Elements\\Client\\SharedAssets\\Markup\\ExportsForPug.ts";


Testing.test(
  "Basic example",
  (): void => {
    Assert.strictEqual(
      removeAllFileNameExtensions(samplePath),
      "01-Source/Implementation/Elements/Client/SharedAssets/Markup/ExportsForPug"
    );
  }
).catch(Logger.logPromiseError);

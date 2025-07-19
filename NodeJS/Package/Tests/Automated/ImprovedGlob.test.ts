import Testing from "node:test";
import Assert from "assert";
import { ImprovedGlob } from "../../Source";
import { Logger } from "@yamato-daiwa/es-extensions";


Promise.all([

  Testing.test(
    "isFilePathMatchingWithGlobSelector",
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
  )

]).catch(Logger.throwErrorAndLog);

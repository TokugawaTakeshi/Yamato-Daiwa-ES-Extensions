import Assert from "assert";

import { ImprovedGlob } from "../../Source";


describe("ImprovedGlob", (): void => {

  it("isFilePathMatchingWithGlobSelector", (): void => {

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

  });

});

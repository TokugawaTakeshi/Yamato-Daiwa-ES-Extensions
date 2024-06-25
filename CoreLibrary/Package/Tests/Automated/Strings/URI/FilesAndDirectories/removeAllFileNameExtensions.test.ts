import Assert from "assert";
import { removeAllFileNameExtensions } from "../../../../../Source";


describe("removeAllFileNameExtensions", (): void => {

  const samplePath: string = "01-Source\\Implementation\\Elements\\Client\\SharedAssets\\Markup\\ExportsForPug.ts";

  it("Basic example", (): void => {
    Assert.strictEqual(
      removeAllFileNameExtensions(samplePath),
      "01-Source/Implementation/Elements/Client/SharedAssets/Markup/ExportsForPug"
    );
  });

});

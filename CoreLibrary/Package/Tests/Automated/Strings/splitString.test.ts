import { splitString } from "../../../Source";
import Assert from "assert";


describe("splitString", (): void => {

  it("Surrogate pairs support works", (): void => {

    const sample: string = "😀😃😁😆";

    Assert.deepStrictEqual(splitString(sample, ""), [ "😀", "😃", "😁", "😆" ]);

    Assert.notDeepStrictEqual(splitString(sample, ""), sample.split(""));

  });

});

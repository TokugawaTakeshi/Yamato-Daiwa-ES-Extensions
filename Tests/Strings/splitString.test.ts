import splitString from "../../Source/Strings/splitString";
import { deepStrictEqual, notDeepStrictEqual } from "assert";


describe("splitString", (): void => {

  it("Surrogate pairs support works", (): void => {

    const sample: string = "😀😃😁😆";

    deepStrictEqual(splitString(sample, ""), [ "😀", "😃", "😁", "😆" ]);

    notDeepStrictEqual(splitString(sample, ""), sample.split(""));
  });
});

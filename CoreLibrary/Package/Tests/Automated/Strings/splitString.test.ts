import { splitString, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.test(
  "Surrogate pairs support works",
  (): void => {

    const sample: string = "😀😃😁😆";

    Assert.deepStrictEqual(splitString(sample, ""), [ "😀", "😃", "😁", "😆" ]);

    Assert.notDeepStrictEqual(splitString(sample, ""), sample.split(""));

  }
).catch(Logger.logPromiseError);

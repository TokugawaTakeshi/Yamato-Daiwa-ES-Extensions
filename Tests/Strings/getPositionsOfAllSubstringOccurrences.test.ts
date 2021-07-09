import getPositionsOfAllSubstringOccurrences from "../../Source/Strings/getPositionsOfAllSubstringOccurrences";

import { strictEqual, deepStrictEqual } from "assert";


describe("getPositionsOfAllSubstringOccurrences", (): void => {

  it("No matches", (): void => {

    const sample: string = "The quick brown fox jumps over the lazy cat.";

    deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), []);
  });

  it("One match", (): void => {

    const sample: string = "The quick brown fox jumps over the lazy dog.";

    strictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40 ]);
  });

  it("Two matches", (): void => {

    const sample: string = "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?";

    strictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40, 52 ]);
  });
});

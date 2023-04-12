import { getPositionsOfAllSubstringOccurrences } from "../../../Source";
import Assert from "assert";


describe("getPositionsOfAllSubstringOccurrences", (): void => {

  it("No matches", (): void => {
    const sample: string = "The quick brown fox jumps over the lazy cat.";
    Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), []);
  });

  it("One match", (): void => {
    const sample: string = "The quick brown fox jumps over the lazy dog.";
    Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40 ]);
  });

  it("Two matches", (): void => {
    const sample: string = "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?";
    Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40, 52 ]);
  });

  it("Surrogate pairs support", (): void => {
    const sample: string = "The q😀ick b😀rown fox jumps over the lazy dog";
    Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "😀"), [ 5, 12 ]);
  });

});

import { getPositionsOfAllSubstringOccurrences, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "No matches",
    (): void => {
      const sample: string = "The quick brown fox jumps over the lazy cat.";
      Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), []);
    }
  ),

  Testing.test(
    "One match",
    (): void => {
      const sample: string = "The quick brown fox jumps over the lazy dog.";
      Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40 ]);
    }
  ),

  Testing.test(
    "Two matches",
    (): void => {
      const sample: string = "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?";
      Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "dog"), [ 40, 52 ]);
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      const sample: string = "The q😀ick b😀rown fox jumps over the lazy dog";
      Assert.deepStrictEqual(getPositionsOfAllSubstringOccurrences(sample, "😀"), [ 5, 12 ]);
    }
  )

]).catch(Logger.logPromiseError);

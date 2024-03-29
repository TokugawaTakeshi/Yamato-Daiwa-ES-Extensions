import { replaceArrayElementsByPredicates } from "../../../Source";
import Assert from "assert";


describe("replaceArrayElementsByPredicates", (): void => {

  function getInitialSampleArray(): Array<string> {
    return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];
  }

  describe("One replacement", (): void => {

    describe("Mutably", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      replaceArrayElementsByPredicates({
        targetArray: experimentalSample,
        predicate: (element: string): boolean => element.includes("O"),
        newValue: "OOO!",
        mutably: true
      });

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
      });

      it("Initial array has been mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutably", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedExperimentalSampleClone: Array<string> = replaceArrayElementsByPredicates({
        targetArray: experimentalSample,
        predicate: (element: string): boolean => element.includes("O"),
        newValue: "OOO!",
        mutably: false
      }).updatedArray;

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(updatedExperimentalSampleClone, [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]);
      });

      it("Initial array has not been mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Multiple replacements", (): void => {

    describe("Mutably", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      replaceArrayElementsByPredicates({
        targetArray: experimentalSample,
        replacements: [
          {
            predicate: (element: string): boolean => element.includes("O"),
            newValue: "OOO!"
          },
          {
            predicate: (element: string): boolean => element.includes("I"),
            replacer: (currentValueOfElement: string): string => `${ currentValueOfElement.replace("I", "III") }!!!`
          }
        ],
        mutably: true
      });

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]);
      });

      it("Initial array has been mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutably", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedExperimentalSampleClone: Array<string> = replaceArrayElementsByPredicates({
        targetArray: experimentalSample,
        replacements: [
          {
            predicate: (element: string): boolean => element.includes("O"),
            newValue: "OOO!"
          },
          {
            predicate: (element: string): boolean => element.includes("I"),
            replacer: (currentValueOfElement: string): string => `${ currentValueOfElement.replace("I", "III") }!!!`
          }
        ],
        mutably: false
      }).updatedArray;

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(updatedExperimentalSampleClone, [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]);
      });

      it("Initial array has not been mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

});

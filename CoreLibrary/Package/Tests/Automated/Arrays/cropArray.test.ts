import Assert from "assert";
import cropArray from "../../../Source/Arrays/cropArray";


describe("cropArray", (): void => {

  function generateExperimentalSample(): Array<string> {
    return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ];
  }


  describe("With \"endingElementNumber__numerationFrom0\" option", (): void => {

    const endingElementNumber__numerationFrom0: number = 3;

    describe("With \"startingElementNumber__numerationFrom0\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    describe("With \"startingElementNumber__numerationFrom1\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    describe("With \"fromStart\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        it("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

  });

});

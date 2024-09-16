import { cropArray, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


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

  describe("With \"endingElementNumber__numerationFrom1\" option", (): void => {

    const endingElementNumber__numerationFrom1: number = 4;

    describe("With \"startingElementNumber__numerationFrom0\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom1,
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
          endingElementNumber__numerationFrom1,
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
          endingElementNumber__numerationFrom1,
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
          endingElementNumber__numerationFrom1,
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
          endingElementNumber__numerationFrom1,
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
          endingElementNumber__numerationFrom1,
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

  describe("With \"elementsCount\" option", (): void => {

    const elementsCount: number = 3;

    describe("With \"startingElementNumber__numerationFrom0\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          elementsCount,
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
          elementsCount,
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
          elementsCount,
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
          elementsCount,
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
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
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
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
        });

        it("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

  });

  describe("With \"untilEnd\" option", (): void => {

    describe("With \"startingElementNumber__numerationFrom0\" option", (): void => {

      describe("Mutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 2,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        it("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 2,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
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
          startingElementNumber__numerationFrom1: 3,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        it("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 3,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
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
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
        });

      });

      describe("Immutably", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        it("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
        });

      });

    });

  });

  describe("Behaviour in out of range case", (): void => {

    it("Has been cropped until last element of array", (): void => {

      const experimentalSample: Array<string> = generateExperimentalSample();

      cropArray({
        targetArray: generateExperimentalSample(),
        startingElementNumber__numerationFrom0: 1,
        endingElementNumber__numerationFrom0: experimentalSample.length,
        mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
      });

    });

    it("Error has been thrown", (): void => {

      it("Updated array is matching with expected", (): void => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        Assert.throws(
          (): void => {
            cropArray({
              targetArray: generateExperimentalSample(),
              startingElementNumber__numerationFrom0: 1,
              endingElementNumber__numerationFrom0: experimentalSample.length,
              mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
              mutably: true
            });
          },
          InvalidParameterValueError
        );

      });

    });

  });

});

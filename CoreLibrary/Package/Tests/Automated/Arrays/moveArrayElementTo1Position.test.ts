import { moveArrayElementTo1Position, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("moveArrayElementTo1Position", (): void => {

  function getInitialSampleArray(): Array<number> {
    return [ 1, 2, 3, 4, 5 ];
  }

  describe("Move to the left", (): void => {

    describe("Mutable moving", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      moveArrayElementTo1Position({
        mutably: true,
        targetArray: experimentalSample,
        targetElementNumber__numerationFrom1: 3,
        toLeft: true,
        errorMustBeThrownIf: { elementsCountIsLessThan2: true, targetElementNumberIsOutOfRange: true }
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ 1, 3, 2, 4, 5 ]);
      });

      it("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable moving", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementTo1Position({
        mutably: false,
        targetArray: experimentalSample,
        targetElementNumber__numerationFrom1: 3,
        toLeft: true,
        errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 3, 2, 4, 5 ]);
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Move to the right", (): void => {

    describe("Mutable moving", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      moveArrayElementTo1Position({
        mutably: true,
        targetArray: experimentalSample,
        targetElementNumber__numerationFrom1: 3,
        toLeft: false,
        errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ 1, 2, 4, 3, 5 ]);
      });

      it("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable moving", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<number> = moveArrayElementTo1Position({
        mutably: false,
        targetArray: experimentalSample,
        targetElementNumber__numerationFrom1: 3,
        toLeft: false,
        errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ 1, 2, 4, 3, 5 ]);
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Error scenarios", (): void => {

    it("Throws error when array has less than 2 elements", (): void => {

      const experimentalSample: Array<number> = [ 1 ];

      Assert.throws(
        (): void => {
          moveArrayElementTo1Position({
            mutably: true,
            targetArray: experimentalSample,
            targetElementNumber__numerationFrom1: 1,
            toLeft: true,
            errorMustBeThrownIf: { elementsCountIsLessThan2: true, targetElementNumberIsOutOfRange: true }
          });
        },
        InvalidParameterValueError
      );

    });

    it("Does not throw error when array has less than 2 elements (errorMustBeThrownIf is false)", (): void => {

      const experimentalSample: Array<number> = [ 1 ];

      Assert.doesNotThrow((): void => {
        moveArrayElementTo1Position({
          mutably: true,
          targetArray: experimentalSample,
          targetElementNumber__numerationFrom1: 1,
          toLeft: true,
          errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: true }
        });
      });

    });

    it("Throws error when target element number is out of range", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      Assert.throws(
        (): void => {
          moveArrayElementTo1Position({
            mutably: true,
            targetArray: experimentalSample,
            targetElementNumber__numerationFrom1: experimentalSample.length + 2,
            toLeft: true,
            errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: true }
          });
        },
        InvalidParameterValueError
      );

    });

    it("Does not throw error when target element number is out of range (errorMustBeThrownIf is false)", (): void => {

      const experimentalSample: Array<number> = getInitialSampleArray();

      Assert.doesNotThrow((): void => {
        moveArrayElementTo1Position({
          mutably: true,
          targetArray: experimentalSample,
          targetElementNumber__numerationFrom1: experimentalSample.length + 2,
          toLeft: true,
          errorMustBeThrownIf: { elementsCountIsLessThan2: false, targetElementNumberIsOutOfRange: false }
        });
      });

    });

  });

});

import { addElementsToArray } from "../../../Source";
import Assert from "assert";


describe("addElementsToArray", (): void => {

  function getInitialSampleArray(): Array<string> {
    return [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];
  }

  describe("One to start", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toStart: true,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toStart: true,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("One to end", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toEnd: true,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toEnd: true,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("One to position numerated from 0", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom0: 1,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom0: 1,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("One to position numerated from 1", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom1: 2,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });
    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom1: 2,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });


  describe("Multiple to start", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toStart: true,
        mutably: true
      });

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toStart: true,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Multiple to end", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toEnd: true,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });
    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toEnd: true,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Multiple to position numerated from 0", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom0: 1,
        mutably: true
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom0: 1,
        mutably: false
      });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  describe("Multiple to position numerated from 1", (): void => {

    describe("Mutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom1: 2,
        mutably: true
      });

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    describe("Immutable adding", (): void => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom1: 2,
        mutably: false
      });

      it("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

});

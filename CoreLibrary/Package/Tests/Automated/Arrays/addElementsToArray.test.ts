import { addElementsToArray, Logger } from "../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


suite("addElementsToArray", async (): Promise<void> => {

  function getInitialSampleArray(): Array<string> {
    return [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];
  }

  await suite("One to start", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toStart: true,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toStart: true,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("One to end", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toEnd: true,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toEnd: true,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("One to position numerated from 0", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom0: 1,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom0: 1,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("One to position numerated from 1", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom1: 2,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });
    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1" ],
        toPosition__numerationFrom1: 2,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });


  await suite("Multiple to start", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toStart: true,
        mutably: true
      });

      await test("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toStart: true,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("Multiple to end", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toEnd: true,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });
    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toEnd: true,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1", "NEW_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("Multiple to position numerated from 0", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom0: 1,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom0: 1,
        mutably: false
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

  await suite("Multiple to position numerated from 1", async (): Promise<void> => {

    await suite("Mutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom1: 2,
        mutably: true
      });

      await test("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          experimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Array has mutated", (): void => {
        Assert.notDeepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

    await suite("Immutable adding", async (): Promise<void> => {

      const experimentalSample: Array<string> = getInitialSampleArray();

      const updatedCopyOfExperimentalSample: Array<string> = addElementsToArray({
        targetArray: experimentalSample,
        newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
        toPosition__numerationFrom1: 2,
        mutably: false
      });

      await test("Updated array matching with expected", (): void => {
        Assert.deepStrictEqual(
          updatedCopyOfExperimentalSample,
          [ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ]
        );
      });

      await test("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getInitialSampleArray());
      });

    });

  });

}).catch(Logger.logPromiseError);

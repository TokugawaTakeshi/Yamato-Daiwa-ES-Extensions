import { cropArray, InvalidParameterValueError, Logger } from "../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


suite("cropArray", async (): Promise<void> => {

  function generateExperimentalSample(): Array<string> {
    return [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ];
  }


  await suite("With \"endingElementNumber__numerationFrom0\" option", async (): Promise<void> => {

    const endingElementNumber__numerationFrom0: number = 3;

    await suite("With \"startingElementNumber__numerationFrom0\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"startingElementNumber__numerationFrom1\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"fromStart\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom0,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

  });

  await suite("With \"endingElementNumber__numerationFrom1\" option", async (): Promise<void> => {

    const endingElementNumber__numerationFrom1: number = 4;

    await suite("With \"startingElementNumber__numerationFrom0\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"startingElementNumber__numerationFrom1\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"fromStart\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          endingElementNumber__numerationFrom1,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

  });

  await suite("With \"elementsCount\" option", async (): Promise<void> => {

    const elementsCount: number = 3;

    await suite("With \"startingElementNumber__numerationFrom0\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 1,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"startingElementNumber__numerationFrom1\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 2,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "BRAVO", "CHARLIE", "DELTA" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"fromStart\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          elementsCount,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

  });

  await suite("With \"untilEnd\" option", async (): Promise<void> => {

    await suite("With \"startingElementNumber__numerationFrom0\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 2,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom0: 2,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"startingElementNumber__numerationFrom1\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 3,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        await test("Initial array has mutated", (): void => {
          Assert.notDeepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          startingElementNumber__numerationFrom1: 3,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "CHARLIE", "DELTA", "GOLF" ]);
        });

        await test("Initial array has not mutated", (): void => {
          Assert.deepStrictEqual(experimentalSample, generateExperimentalSample());
        });

      });

    });

    await suite("With \"fromStart\" option", async (): Promise<void> => {

      await suite("Mutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: true
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(experimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
        });

      });

      await suite("Immutably", async (): Promise<void> => {

        const experimentalSample: Array<string> = generateExperimentalSample();

        const updatedCopyOfExperimentalSample: Array<string> = cropArray({
          targetArray: experimentalSample,
          fromStart: true,
          untilEnd: true,
          mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
          mutably: false
        });

        await test("Updated array is matching with expected", (): void => {
          Assert.deepStrictEqual(updatedCopyOfExperimentalSample, [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
        });

      });

    });

  });

  await suite("Behaviour in out of range case", async (): Promise<void> => {

    await test("Has been cropped until last element of array", async (): Promise<void> => {

      const experimentalSample: Array<string> = generateExperimentalSample();

      cropArray({
        targetArray: experimentalSample,
        startingElementNumber__numerationFrom0: 1,
        endingElementNumber__numerationFrom0: experimentalSample.length,
        mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
        mutably: true
      });

      await test("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ "BRAVO", "CHARLIE", "DELTA", "GOLF" ]);
      });

    });

    await test("Error has been thrown", (): void => {

      const experimentalSample: Array<string> = generateExperimentalSample();

      Assert.throws(
        (): void => {
          cropArray({
            targetArray: experimentalSample,
            startingElementNumber__numerationFrom0: 1,
            endingElementNumber__numerationFrom0: experimentalSample.length,
            mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
            mutably: true
          });
        },
        InvalidParameterValueError
      );

    });

  });

}).catch(Logger.logPromiseError);

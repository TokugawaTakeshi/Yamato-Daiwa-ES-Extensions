import { removeArrayElementsByIndexes, type RemovingArrayElementsByIndexesOperation } from "../../../Source";

import Assert from "assert";


describe("removeArrayElementsByIndexes", (): void => {

  describe("Removing of one element", (): void => {

    function getSampleArray(): Array<string> {
      return [ "alpha", "bravo", "charlie", "delta", "echo" ];
    }
    const indexOfArrayElementWhichWillBeRemoved: number = 2;


    describe("Mutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();

      const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
          removeArrayElementsByIndexes({
            targetArray: experimentalSample,
            indexes: indexOfArrayElementWhichWillBeRemoved,
            mutably: true
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.updatedArray, [ "alpha", "bravo", "delta", "echo" ]);
      });

      it("Removed element is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "charlie" ]);
      });

    });

    describe("Immutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();
      const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
          removeArrayElementsByIndexes({
            targetArray: experimentalSample,
            indexes: indexOfArrayElementWhichWillBeRemoved,
            mutably: false
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.updatedArray, [ "alpha", "bravo", "delta", "echo" ]);
      });

      it("Removed element is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "charlie" ]);
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getSampleArray());
      });

    });

  });


  describe("Removing of multiple elements", (): void => {

    function getSampleArray(): Array<string> {
      return [ "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf" ];
    }
    const indexesOfArrayElementsWhichWIllBeRemoved: Array<number> = [ 1, 3, 5 ];


    describe("Mutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();

      const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
          removeArrayElementsByIndexes<string>({
            targetArray: experimentalSample,
            indexes: indexesOfArrayElementsWhichWIllBeRemoved,
            mutably: true
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          removingArrayElementsByIndexesOperationResult.updatedArray,
          [ "alpha", "charlie", "echo", "golf" ]
        );
      });

      it("Removed element is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "bravo", "delta", "foxtrot" ]);
      });

      it("Initial array has mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, [ "alpha", "charlie", "echo", "golf" ]);
      });

    });

    describe("Immutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();
      const removingArrayElementsByIndexesOperationResult: RemovingArrayElementsByIndexesOperation.Result<string> =
          removeArrayElementsByIndexes<string>({
            targetArray: experimentalSample,
            indexes: indexesOfArrayElementsWhichWIllBeRemoved,
            mutably: false
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          removingArrayElementsByIndexesOperationResult.updatedArray,
          [ "alpha", "charlie", "echo", "golf" ]
        );
      });

      it("Removed element is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByIndexesOperationResult.removedElements, [ "bravo", "delta", "foxtrot" ]);
      });

      it("Initial array has not mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getSampleArray());
      });

    });

  });

});

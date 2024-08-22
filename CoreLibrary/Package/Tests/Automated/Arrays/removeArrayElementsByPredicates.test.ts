import { removeArrayElementsByPredicates, type RemovingArrayElementsByPredicatesOperation } from "../../../Source";
import Assert from "assert";


describe("removeArrayElementsByPredicates", (): void => {

  describe("One predicate", (): void => {

    function getSampleArray(): Array<string> {
      return [ "a", "aa", "aaa", "aaaa", "aaaaa" ];
    }

    function predicate(arrayElement: string): boolean {
      return arrayElement.length > 3;
    }

    describe("Mutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();
      const removingArrayElementsByPredicatesOperationResult: RemovingArrayElementsByPredicatesOperation.Result<string> =
          removeArrayElementsByPredicates({
            targetArray: experimentalSample,
            predicate,
            mutably: true
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.updatedArray, [ "a", "aa", "aaa" ]);
      });

      it("Removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.removedElements, [ "aaaa", "aaaaa" ]);
      });

      it("Indexed of removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 3, 4 ]);
      });

    });

    describe("Immutable removing", (): void => {

      const experimentalSample: ReadonlyArray<string> = getSampleArray();
      const removingArrayElementsByPredicatesOperationResult: RemovingArrayElementsByPredicatesOperation.Result<string> =
          removeArrayElementsByPredicates({
            targetArray: experimentalSample,
            predicate,
            mutably: false
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.updatedArray, [ "a", "aa", "aaa" ]);
      });

      it("Removed element is matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.removedElements, [ "aaaa", "aaaaa" ]);
      });

      it("Indexed of removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 3, 4 ]);
      });

      it("Initial array has not been mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getSampleArray());
      });

    });

  });

  describe("Multiple predicates", (): void => {

    function getSampleArray(): Array<string> {
      return [ "alt", "ctrl", "alpha", "bravo", "alps", "himalayas", "atsugi", "yokosuka" ];
    }

    const predicates: Array<(arrayElement: string) => boolean> = [
      (arrayElement: string): boolean => arrayElement.startsWith("a"),
      (arrayElement: string): boolean => arrayElement.length < 5
    ];


    describe("Mutable removing", (): void => {

      const experimentalSample: Array<string> = getSampleArray();
      const removingArrayElementsByPredicatesOperationResult: RemovingArrayElementsByPredicatesOperation.Result<string> =
          removeArrayElementsByPredicates({
            targetArray: experimentalSample,
            predicates,
            mutably: true
          });


      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
          removingArrayElementsByPredicatesOperationResult.updatedArray,
          [ "bravo", "himalayas", "yokosuka" ]
        );
      });

      it("Removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(
          removingArrayElementsByPredicatesOperationResult.removedElements,
          [ "alt", "ctrl", "alpha", "alps", "atsugi" ]
        );
      });

      it("Indexed of removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 0, 1, 2, 4, 6 ]);
      });

    });

    describe("Immutable removing", (): void => {

      const experimentalSample: ReadonlyArray<string> = getSampleArray();
      const removingArrayElementsByPredicatesOperationResult: RemovingArrayElementsByPredicatesOperation.Result<string> =
          removeArrayElementsByPredicates({
            targetArray: experimentalSample,
            predicates,
            mutably: false
          });

      it("Updated array is matching with expected", (): void => {
        Assert.deepStrictEqual(
            removingArrayElementsByPredicatesOperationResult.updatedArray,
            [ "bravo", "himalayas", "yokosuka" ]
        );
      });

      it("Removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(
            removingArrayElementsByPredicatesOperationResult.removedElements,
            [ "alt", "ctrl", "alpha", "alps", "atsugi" ]
        );
      });

      it("Indexed of removed elements are matching with expected", (): void => {
        Assert.deepStrictEqual(removingArrayElementsByPredicatesOperationResult.indexesOfRemovedElements, [ 0, 1, 2, 4, 6 ]);
      });

      it("Initial array has not been mutated", (): void => {
        Assert.deepStrictEqual(experimentalSample, getSampleArray());
      });

    });

  });

});

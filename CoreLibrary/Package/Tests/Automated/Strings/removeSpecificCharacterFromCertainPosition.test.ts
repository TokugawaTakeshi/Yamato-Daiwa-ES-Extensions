import { removeSpecificCharacterFromCertainPosition, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "From first position",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "acapella",
          fromFirstPosition: true,
          targetCharacter: "a"
        }),
        "capella"
      );
    }
  ),

  Testing.test(
    "From last position",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "cats",
          fromLastPosition: true,
          targetCharacter: "s"
        }),
        "cat"
      );
    }
  ),

  Testing.test(
    "From specific position (numeration from 1)",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "ABZCD",
          fromPosition__numerationFrom1: 3,
          targetCharacter: "Z"
        }),
        "ABCD"
      );
    }
  ),

  Testing.test(
    "From specific position (numeration from 0)",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "ABZCD",
          fromPosition__numerationFrom0: 2,
          targetCharacter: "Z"
        }),
        "ABCD"
      );
    }
  ),

  Testing.test(
    "Surrogate pairs support",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "aあ😒🙂",
          fromPosition__numerationFrom1: 3,
          targetCharacter: "😒"
        }),
        "aあ🙂"
      );
    }
  ),

  Testing.test(
    "No target character at specific position",
    (): void => {
      Assert.strictEqual(
        removeSpecificCharacterFromCertainPosition({
          targetString: "cats",
          fromFirstPosition: true,
          targetCharacter: "z"
        }),
        "cats"
      );
    }
  )

]).catch(Logger.logPromiseError);

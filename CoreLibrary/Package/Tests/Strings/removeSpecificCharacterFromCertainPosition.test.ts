import { removeSpecificCharacterFromCertainPosition } from "../../Source";
import { strictEqual } from "assert";


describe("removeSpecificCharacterFromCertainPosition", (): void => {

  it("From first position", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "acapella",
      fromFirstPosition: true,
      targetCharacter: "a"
    }), "capella");
  });

  it("From last position", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "cats",
      fromLastPosition: true,
      targetCharacter: "s"
    }), "cat");
  });

  it("From specific position (numeration from 1)", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "ABZCD",
      fromPosition__numerationFrom1: 3,
      targetCharacter: "Z"
    }), "ABCD");
  });

  it("From specific position (numeration from 0)", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "ABZCD",
      fromPosition__numerationFrom0: 2,
      targetCharacter: "Z"
    }), "ABCD");
  });

  it("Surrogate pairs support", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "aあ😒🙂",
      fromPosition__numerationFrom1: 3,
      targetCharacter: "😒"
    }), "aあ🙂");
  });

  it("No target character at specific position", (): void => {
    strictEqual(removeSpecificCharacterFromCertainPosition({
      targetString: "cats",
      fromFirstPosition: true,
      targetCharacter: "z"
    }), "cats");
  });
});

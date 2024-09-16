import { trimSpaces, SpaceCharacters } from "../../../Source";
import Assert from "assert";


describe("trimSpaces", (): void => {

  const stringSampleWithNonSpaceCharactersOnly: string = "漢字LatinКириллица";
  const nonSpaceCharactersCountInSample: number = stringSampleWithNonSpaceCharactersOnly.length;

  it("Native 'trim' does not remove the zero-width space", (): void => {

    const testStringWithLeadingAndTrailingSpaces: string =
        `${ SpaceCharacters.zeroWidthSpace }${ stringSampleWithNonSpaceCharactersOnly }`;

    Assert.strictEqual(testStringWithLeadingAndTrailingSpaces.length, testStringWithLeadingAndTrailingSpaces.trim().length);

  });

  it("'trimSpaces' remove all leading and trailing spaces", (): void => {
    Object.entries(SpaceCharacters).forEach(([ , spaceCharacter ]: [ string, string ]): void => {

      const testStringWithLeadingAndTrailingSpaces: string =
          `${ spaceCharacter }${ spaceCharacter }${ stringSampleWithNonSpaceCharactersOnly }` +
          `${ spaceCharacter }${ spaceCharacter }`;

      Assert.strictEqual(trimSpaces(testStringWithLeadingAndTrailingSpaces).length, nonSpaceCharactersCountInSample);

    });
  });

  it("All leading and trailing spaces except ideographic one has been removed", (): void => {
    Object.entries(SpaceCharacters).forEach(([ , spaceCharacter ]: [ string, SpaceCharacters ]): void => {

      const testStringWithLeadingAndTrailingSpaces: string =
          `${ spaceCharacter }${ spaceCharacter }${ stringSampleWithNonSpaceCharactersOnly }` +
          `${ spaceCharacter }${ spaceCharacter }`;
      const trimmedString: string = trimSpaces(
          testStringWithLeadingAndTrailingSpaces,
          { excludeKinds: [ SpaceCharacters.ideographicSpace ] }
      );

      if (spaceCharacter === SpaceCharacters.ideographicSpace) {
        Assert.strictEqual(trimmedString.length, testStringWithLeadingAndTrailingSpaces.length);
      } else {
        Assert.strictEqual(trimmedString.length, nonSpaceCharactersCountInSample);
      }

    });

  });

});

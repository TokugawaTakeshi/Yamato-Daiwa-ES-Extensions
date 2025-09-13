import { trimSpaces, SpaceCharacters, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


const stringSampleWithNonSpaceCharactersOnly: string = "漢字LatinКириллица";
const nonSpaceCharactersCountInSample: number = stringSampleWithNonSpaceCharactersOnly.length;

Promise.all([

  Testing.test(
    "Native 'trim' does not remove the zero-width space",
    (): void => {

      const testStringWithLeadingAndTrailingSpaces: string =
          `${ SpaceCharacters.zeroWidthSpace }${ stringSampleWithNonSpaceCharactersOnly }`;

      Assert.strictEqual(testStringWithLeadingAndTrailingSpaces.length, testStringWithLeadingAndTrailingSpaces.trim().length);

    }
  ),

  Testing.suite(
    "'trimSpaces' removed all leading and trailing spaces",
    async (): Promise<void> => {
      await Promise.all(
        Object.entries(SpaceCharacters).map(
          async ([ spaceCharacterName, spaceCharacter ]: [ string, string ]): Promise<void> => {

            await Testing.test(
              spaceCharacterName,
              (): void => {

                const testStringWithLeadingAndTrailingSpaces: string =
                    `${ spaceCharacter }${ spaceCharacter }${ stringSampleWithNonSpaceCharactersOnly }` +
                    `${ spaceCharacter }${ spaceCharacter }`;

                Assert.strictEqual(
                  trimSpaces(testStringWithLeadingAndTrailingSpaces).length,
                  nonSpaceCharactersCountInSample
                );

              }
            );

          }
        )
      );

    }
  ),

  Testing.test(
    "All leading and trailing spaces except ideographic one has been removed",
    (): void => {

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

    }
  )

]).catch(Logger.logPromiseError);

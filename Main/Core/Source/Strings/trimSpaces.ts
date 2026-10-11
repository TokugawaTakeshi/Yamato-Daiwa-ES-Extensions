import SpaceCharacters from "./CharactersAssets/SpaceCharacters";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";


export default function trimSpaces(targetString: string, options: SpacesTrimming.Options = {}): string {

  const {
    skipLeadingOnes = false,
    skipTrailingOnes = false,
    targetSpacesKinds = Object.values(SpaceCharacters),
    excludeKinds = []
  }: SpacesTrimming.Options = options;

  if (skipTrailingOnes && skipLeadingOnes) {
    return targetString;
  }


  let charactersSetExpression: string = "";
  for (const spaceCharacter of targetSpacesKinds) {
    if (!excludeKinds.includes(spaceCharacter)) {

      const UTF16CodePoint: number | undefined = spaceCharacter.codePointAt(0);

      if (isUndefined(UTF16CodePoint)) {
        continue;
      }


      const UTF_16_CODE_POINT_RADIX: number = 16;
      const UTF_16_CODE_POINT_MAXIMAL_SYMBOLS_IN_REGULAR_EXPRESSION: number = 4;
      charactersSetExpression = `${ charactersSetExpression }\\u{${
        UTF16CodePoint.toString(UTF_16_CODE_POINT_RADIX).padStart(UTF_16_CODE_POINT_MAXIMAL_SYMBOLS_IN_REGULAR_EXPRESSION, "0")
      }}`;

    }
  }


  let mutatingResult: string = targetString;

  if (!skipLeadingOnes) {
    mutatingResult = mutatingResult.replace(new RegExp(`^[${ charactersSetExpression }]+`, "u"), "");
  }

  if (!skipTrailingOnes) {
    mutatingResult = mutatingResult.replace(new RegExp(`[${ charactersSetExpression }]+$`, "u"), "");
  }


  return mutatingResult;

}


export namespace SpacesTrimming {

  export type Options = Readonly<{
    skipLeadingOnes?: boolean;
    skipTrailingOnes?: boolean;
    targetSpacesKinds?: Array<SpaceCharacters>;
    excludeKinds?: Array<SpaceCharacters>;
  }>;

}

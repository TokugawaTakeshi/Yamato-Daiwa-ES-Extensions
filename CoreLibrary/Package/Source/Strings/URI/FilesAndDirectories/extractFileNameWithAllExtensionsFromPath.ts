import replaceDoubleBackslashesWithForwardSlashes from "../../replaceDoubleBackslashesWithForwardSlashes";
import splitString from "../../splitString";
import getLastElementOfArray from "../../../Arrays/getLastElementOfArray";
import isNull from "../../../TypeGuards/Nullables/isNull";
import Logger from "../../../Logging/Logger";
import UnexpectedEventError from "../../../Errors/UnexpectedEvent/UnexpectedEventError";


export default function extractFileNameWithAllExtensionsFromPath(
  compoundParameter: Readonly<{ targetPath: string; mustThrowErrorIfLastPathSegmentHasNoDots: boolean; }>
): string {

  const targetPath: string = compoundParameter.targetPath;

  const pathExplodedToSegments: Array<string> = splitString(
    replaceDoubleBackslashesWithForwardSlashes(targetPath), "/"
  );

  const lastPathSegment: string | null = getLastElementOfArray(pathExplodedToSegments);

  if (isNull(lastPathSegment) || !lastPathSegment.includes(".") || lastPathSegment === ".") {

    if (compoundParameter.mustThrowErrorIfLastPathSegmentHasNoDots) {

      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          `Contrary to expectations, the last segment of "${ targetPath }" path does not include the dots.`
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "extractFileNameWithAllExtensionsFromPath(compoundParameter)"
      });

    }

  }


  return lastPathSegment ?? "";

}

import splitString from "../../../splitString";
import replaceDoubleBackslashesWithForwardSlashes from "../../../replaceDoubleBackslashesWithForwardSlashes";
import getLastElementOfArray from "../../../../Arrays/01-RetrievingOfElements/getLastElementOfArray";
import {
  explodeURI_ToFragmentAndRemainPart,
  type ExplodingOfURI_ToFragmentAndRemainPart
} from "../../Fragment/explodeURI_ToFragmentAndRemainPart";
import isNotUndefined from "../../../../TypeGuards/EmptyTypes/isNotUndefined";
import isNull from "../../../../TypeGuards/EmptyTypes/isNull";


export default function removeLastFileNameExtensionFromPath(targetPath: string): string {

  const pathExplodedToSegments: ReadonlyArray<string> =
      splitString(
        replaceDoubleBackslashesWithForwardSlashes(targetPath), "/"
      );

  const lastPathSegment: string | null = getLastElementOfArray(pathExplodedToSegments);

  if (isNull(lastPathSegment) || !lastPathSegment.includes(".") || lastPathSegment === ".") {
    return targetPath;
  }


  const fileNameWithAllFileNameExtensions: ReadonlyArray<string> = splitString(lastPathSegment, ".");

  const { fragmentWithoutLeadingHash }: ExplodingOfURI_ToFragmentAndRemainPart.Result.OptionalFragment =
      explodeURI_ToFragmentAndRemainPart(lastPathSegment, { mustThrowErrorIfNoFragment: false });

  return [

    ...pathExplodedToSegments.length > 1 ? pathExplodedToSegments.slice(0, -1) : [],

    fileNameWithAllFileNameExtensions.
        slice(0, -1).
        join(".")

  ].
      join("/") +

      (isNotUndefined(fragmentWithoutLeadingHash) ? `#${ fragmentWithoutLeadingHash }` : "");

}

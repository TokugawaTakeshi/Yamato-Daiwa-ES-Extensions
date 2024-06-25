import replaceDoubleBackslashesWithForwardSlashes from "../../replaceDoubleBackslashesWithForwardSlashes";
import splitString from "../../splitString";
import getLastElementOfArray from "../../../Arrays/getLastElementOfArray";
import isNull from "../../../TypeGuards/Nullables/isNull";
import replaceArrayElementsByIndexesImmutably from "../../../Arrays/replaceArrayElementsByIndexesImmutably";


export default function removeAllFileNameExtensions(targetPath: string): string {

  const pathExplodedToSegments: Array<string> = splitString(
    replaceDoubleBackslashesWithForwardSlashes(targetPath), "/"
  );

  const lastPathSegment: string | null = getLastElementOfArray(pathExplodedToSegments);

  if (isNull(lastPathSegment) || !lastPathSegment.includes(".") || lastPathSegment === ".") {
    return targetPath;
  }


  return replaceArrayElementsByIndexesImmutably({
    targetArray: pathExplodedToSegments,
    index: pathExplodedToSegments.length - 1,
    newElement: splitString(lastPathSegment, ".")[0]
  }).join("/");

}

import replaceDoubleBackslashesWithForwardSlashes from "../../replaceDoubleBackslashesWithForwardSlashes";
import splitString from "../../splitString";
import getLastElementOfArray from "../../../Arrays/01-RetrievingOfElements/getLastElementOfArray";
import isNull from "../../../TypeGuards/EmptyTypes/isNull";
import replaceArrayElementsByIndexesImmutably from
    "../../../Arrays/05-ReplacingOfElements/replaceArrayElementsByIndexesImmutably";


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

import getLastElementOfArray from "../../../Arrays/getLastElementOfArray";
import explodeURI_PathToSegments from "../explodeURI_PathToSegments";
import isNull from "../../../TypeGuards/Nullables/isNull";


export default function extractFileNameWithoutLastExtension(targetPath: string): string {

  const lastPathSegment: string | null = getLastElementOfArray(
    explodeURI_PathToSegments(targetPath),
    { mustThrowErrorIfArrayIsEmpty: true }
  );

  if (isNull(lastPathSegment)) {
    return targetPath;
  }


  const indexOfLastDot: number = lastPathSegment.lastIndexOf(".");

  return indexOfLastDot > 0 ?
      Array.from(lastPathSegment).
          slice(0, indexOfLastDot).
          join("") :
      lastPathSegment;

}

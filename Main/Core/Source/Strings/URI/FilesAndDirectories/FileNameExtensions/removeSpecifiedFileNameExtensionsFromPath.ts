import splitString from "../../../splitString";
import replaceDoubleBackslashesWithForwardSlashes from "../../../replaceDoubleBackslashesWithForwardSlashes";
import getLastElementOfArray from "../../../../Arrays/01-RetrievingOfElements/getLastElementOfArray";
import createSetBasedOnAnyArrayLikeCollection from "../../../../Sets/createSetBasedOnAnyArrayLikeCollection";
import removeSpecificCharacterFromCertainPosition from "../../../removeSpecificCharacterFromCertainPosition";


export default function removeSpecifiedFileNameExtensionsFromPath(
  {
    filePath,
    mustIgnoreLastOrSingleFileNameExtension,
    filesNamesExtensions: filesNamesExtensions__possiblyWithLeadingDots,
    pathsSeparatorMustBeUsedInOutputPathWhen2_KindsMixedInInitialPaths
  }: Readonly<{
    filePath: string;
    mustIgnoreLastOrSingleFileNameExtension?: boolean;
    filesNamesExtensions: ReadonlyArray<string> | ReadonlySet<string>;
    pathsSeparatorMustBeUsedInOutputPathWhen2_KindsMixedInInitialPaths: "/" | "\\";
  }>
): string {

  const mutableSegmentsOfTargetPath: Array<string> = splitString(replaceDoubleBackslashesWithForwardSlashes(filePath), "/");

  const lastPathSegment: string | null = getLastElementOfArray(mutableSegmentsOfTargetPath);

  if (lastPathSegment === null || !lastPathSegment.includes(".") || lastPathSegment === ".") {
    return filePath;
  }


  const mutableSubsegmentsOfLastPathSegment: Array<string> = splitString(lastPathSegment, ".");
  const indexOfLastFileNameExtension: number = mutableSubsegmentsOfLastPathSegment.length - 1;

  const targetFilesNamesExtensions: ReadonlySet<string> = createSetBasedOnAnyArrayLikeCollection(
    filesNamesExtensions__possiblyWithLeadingDots,
    (fileNameExtension: string): string =>
        removeSpecificCharacterFromCertainPosition({
          targetString: fileNameExtension,
          targetCharacter: ".",
          fromFirstPosition: true
        })
  );

  /* [ Approach ] The loop will not start if array has less than 2 elements. */
  for (let index: number = lastPathSegment.length - 1; index > 0; index--) {

    const subsegmentOfLastPathSegment: string = mutableSubsegmentsOfLastPathSegment[index];

    if (targetFilesNamesExtensions.has(subsegmentOfLastPathSegment)) {

      if (mustIgnoreLastOrSingleFileNameExtension === true && index === indexOfLastFileNameExtension) {
        continue;
      }


      mutableSubsegmentsOfLastPathSegment.splice(index, 1);

    }

  }


  mutableSegmentsOfTargetPath[mutableSegmentsOfTargetPath.length - 1] = mutableSubsegmentsOfLastPathSegment.join(".");

  if (filePath.includes("\\")) {

    if (filePath.includes("/")) {
      return mutableSegmentsOfTargetPath.join(pathsSeparatorMustBeUsedInOutputPathWhen2_KindsMixedInInitialPaths);
    }


    return mutableSegmentsOfTargetPath.join("\\");

  }


  return mutableSegmentsOfTargetPath.join("/");

}

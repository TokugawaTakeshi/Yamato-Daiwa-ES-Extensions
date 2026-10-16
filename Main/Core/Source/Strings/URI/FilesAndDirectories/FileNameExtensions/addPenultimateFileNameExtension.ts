import removeSpecificCharacterFromCertainPosition from "../../../removeSpecificCharacterFromCertainPosition";
import extractMatchingsWithRegularExpression, { type ExtractingOfMatchingsWithRegularExpression } from
    "../../../RegularExpressions/extractMatchingsWithRegularExpression";
import splitString from "../../../splitString";
import addElementsToArray from "../../../../Arrays/04-AddingOfElements/addElementsToArray";


export default function addPenultimateFileNameExtension(
  {
    targetPath,
    targetFileNamePenultimateExtensionWithOrWithoutLeadingDot,
    mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist,
    mustAppendLastFileNameExtensionInsteadIfThereIsNoOne
  }: Readonly<{
    targetPath: string;
    targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: string;
    mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: boolean;
    mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: boolean;
  }>
): string {

  const targetFileNamePenultimateExtensionWithoutLeadingDot: string =
      removeSpecificCharacterFromCertainPosition({
        targetString: targetFileNamePenultimateExtensionWithOrWithoutLeadingDot,
        targetCharacter: ".",
        fromFirstPosition: true
      });

  if (!targetPath.includes(".")) {

      const {
        updatedString: targetPathWithoutFragment,
        extractedMatching: targetPathFragmentWithLeadingHash
      }: ExtractingOfMatchingsWithRegularExpression.NullableResult =
          extractMatchingsWithRegularExpression(
            targetPath,
            /#.+$/u,
            { mustExpectOneOrZeroMatchings: true }
          );

    return mustAppendLastFileNameExtensionInsteadIfThereIsNoOne ?
        `${ targetPathWithoutFragment }.${ targetFileNamePenultimateExtensionWithoutLeadingDot }` +
            (targetPathFragmentWithLeadingHash ?? "") :
        targetPath;

  }


  const dotSeparatedPathSegments: Array<string> = splitString(targetPath, ".");

  if (
    dotSeparatedPathSegments[dotSeparatedPathSegments.length - 2] === targetFileNamePenultimateExtensionWithoutLeadingDot &&
        !mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist
  ) {
    return targetPath;
  }


  return addElementsToArray({
    targetArray: dotSeparatedPathSegments,
    newElements: [ targetFileNamePenultimateExtensionWithoutLeadingDot ],
    mutably: true,
    toPosition__numerationFrom1: dotSeparatedPathSegments.length
  }).
      join(".");

}

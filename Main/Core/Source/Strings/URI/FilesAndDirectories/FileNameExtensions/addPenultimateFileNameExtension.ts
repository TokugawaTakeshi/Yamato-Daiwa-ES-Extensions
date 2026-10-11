import {
  removeSpecificCharacterFromCertainPosition,
  type ExtractingOfMatchingsWithRegularExpression,
  extractMatchingsWithRegularExpression,
  splitString,
  addElementsToArray
} from "../../../../index";


export default function addPenultimateFileNameExtension(
  {
    targetPath,
    targetFileNamePenultimateExtensionWithOrWithoutLeadingDot,
    mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist
  }: Readonly<{
    targetPath: string;
    targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: string;
    mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: boolean;
    mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: boolean;
  }>
): string {

  const targetFileNamePenultimateExtensionWithoutLeadingDot: string = removeSpecificCharacterFromCertainPosition({
    targetString: targetFileNamePenultimateExtensionWithOrWithoutLeadingDot,
    targetCharacter: ".",
    fromFirstPosition: true
  });

  if (!targetPath.includes(".")) {

      const {
        updatedString: targetPathWithoutFragment,
        extractedMatching: targetPathFragmentWithLeadingHash
      }: ExtractingOfMatchingsWithRegularExpression.NullableResult = extractMatchingsWithRegularExpression(
        targetPath, /#.+$/u, { mustExpectOneOrZeroMatchings: true }
      );

    return mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist ?
        `${ targetPathWithoutFragment }.${ targetFileNamePenultimateExtensionWithoutLeadingDot }` +
            targetPathFragmentWithLeadingHash :
        targetPath;

  }


  const pathDotSeparatedSegments: Array<string> = splitString(targetPath, ".");

  return addElementsToArray({
    targetArray: pathDotSeparatedSegments,
    newElements: [ targetFileNamePenultimateExtensionWithoutLeadingDot ],
    mutably: true,
    toPosition__numerationFrom1: pathDotSeparatedSegments.length
  }).join(".");

}

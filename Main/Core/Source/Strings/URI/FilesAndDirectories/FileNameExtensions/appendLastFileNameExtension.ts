import extractMatchingsWithRegularExpression from "../../../RegularExpressions/extractMatchingsWithRegularExpression";
import type { ExtractingOfMatchingsWithRegularExpression } from
    "../../../RegularExpressions/extractMatchingsWithRegularExpression";
import insertSubstringIf from "../../../insertSubstringIf";
import nullToEmptyString from "../../../../ValueTransformers/nullToEmptyString";


export default function appendLastFileNameExtension(
  sourceData: Readonly<{
    targetPath: string;
    targetFileNameExtensionWithOrWithoutLeadingDot: string;
    mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: boolean;
  }>
): string {

  const targetFileNameExtensionWithLeadingDot: string =
      sourceData.targetFileNameExtensionWithOrWithoutLeadingDot.startsWith(".") ?
          sourceData.targetFileNameExtensionWithOrWithoutLeadingDot :
          `.${ sourceData.targetFileNameExtensionWithOrWithoutLeadingDot }`;

  const {
    updatedString: targetPathWithoutFragment,
    extractedMatching: targetPathFragmentWithLeadingHash
  }: ExtractingOfMatchingsWithRegularExpression.NullableResult = extractMatchingsWithRegularExpression(
    sourceData.targetPath, /#.+$/u, { mustExpectOneOrZeroMatchings: true }
  );

  const isTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: boolean = targetPathWithoutFragment.
      endsWith(targetFileNameExtensionWithLeadingDot);

  return targetPathWithoutFragment +
      insertSubstringIf(
        targetFileNameExtensionWithLeadingDot,
        !isTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath ||
            sourceData.mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath
      ) +
      nullToEmptyString(targetPathFragmentWithLeadingHash);

}

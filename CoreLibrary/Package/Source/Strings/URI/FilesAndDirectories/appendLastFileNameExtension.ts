import extractMatchingsWithRegularExpression from "../../extractMatchingsWithRegularExpression";
import type { ExtractingOfMatchingsWithRegularExpression } from "../../extractMatchingsWithRegularExpression";
import insertSubstringIf from "../../insertSubstringIf";
import nullToEmptyString from "../../../ValueTransformers/nullToEmptyString";


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
    updatedString: targetPathWihtoutFragment,
    extractedMatching: targetPathFragmentWithLeadingHash
  }: ExtractingOfMatchingsWithRegularExpression.NullableResult = extractMatchingsWithRegularExpression(
    sourceData.targetPath, /#.+$/u, { mustExpectOneOrZeroMatchings: true }
  );

  const isTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: boolean = targetPathWihtoutFragment.
      endsWith(targetFileNameExtensionWithLeadingDot);

  return `${ targetPathWihtoutFragment }` +
      `${
        insertSubstringIf(
          targetFileNameExtensionWithLeadingDot,
          !isTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath ||
              sourceData.mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath
        )
      }` +
      `${ nullToEmptyString(targetPathFragmentWithLeadingHash) }`;

}

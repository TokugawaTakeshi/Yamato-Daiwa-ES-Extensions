import getMatchingWithFirstRegularExpressionCapturingGroup from
    "../RegularExpressions/getMatchingWithFirstRegularExpressionCapturingGroup";
import isNull from "../../TypeGuards/Nullables/isNull";
import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";
import insertSubstringIf from "../insertSubstringIf";


export default function getURI_Fragment(
  sourceDataAndOptions: Readonly<{
    targetURI: string;
    withLeadingHash: boolean;
  }>
): string | null;

export default function getURI_Fragment(
  sourceDataAndOptions: Readonly<{
    targetURI: string;
    withLeadingHash: boolean;
    mustThrowErrorIfNoFragmentPresents: true;
  }>
): string;


export default function getURI_Fragment(
  sourceDataAndOptions: Readonly<{
    targetURI: string;
    withLeadingHash: boolean;
    mustThrowErrorIfNoFragmentPresents?: true;
  }>
): string | null {

  const URI_FragmentWithoutLeadingHash: string | null = getMatchingWithFirstRegularExpressionCapturingGroup(
    sourceDataAndOptions.targetURI, /#(?<hash>.+)$/u
  );

  if (isNull(URI_FragmentWithoutLeadingHash)) {

    if (sourceDataAndOptions.mustThrowErrorIfNoFragmentPresents) {

      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          `Contrary to expectations, below URI has not the fragment.\n${ sourceDataAndOptions.targetURI }`
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getURI_Fragment(sourceDataAndOptions)"
      });

    }


    return null;

  }


  return `${ insertSubstringIf("#", sourceDataAndOptions.withLeadingHash) }${ URI_FragmentWithoutLeadingHash }`;

}

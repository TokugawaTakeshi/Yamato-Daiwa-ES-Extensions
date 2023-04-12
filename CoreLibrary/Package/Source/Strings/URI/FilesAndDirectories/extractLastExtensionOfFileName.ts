import isUndefined from "../../../TypeGuards/Nullables/isUndefined";
import Logger from "../../../Logging/Logger";
import UnexpectedEventError from "../../../Errors/UnexpectedEvent/UnexpectedEventError";


export default function extractLastExtensionOfFileName(
  compoundParameter: Readonly<{
    targetPath: string;
    withLeadingDot: boolean;
  }>
): string | null;

export default function extractLastExtensionOfFileName(
  compoundParameter: Readonly<{
    targetPath: string;
    withLeadingDot: boolean;
    mustThrowErrorIfLastPathSegmentHasNotDots: true;
  }>
): string;


export default function extractLastExtensionOfFileName(
  compoundParameter: Readonly<{
    targetPath: string;
    withLeadingDot: boolean;
    mustThrowErrorIfLastPathSegmentHasNotDots?: true;
  }>
): string | null {

  const lastFileNameExtensionWithoutLeadingDot: string | undefined = /.(?<lastFileNameExtensionWithoutLeadingDot>\w+)$/u.
      exec(compoundParameter.targetPath)?.
      groups?.
      lastFileNameExtensionWithoutLeadingDot;

  if (isUndefined(lastFileNameExtensionWithoutLeadingDot)) {

    if (compoundParameter.mustThrowErrorIfLastPathSegmentHasNotDots === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          `Contrary to expectations, the path ${ compoundParameter.targetPath } has not the file name extension.`
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "extractLastExtensionOfFileName(compoundParameter)"
      });
    }


    return null;

  }


  return lastFileNameExtensionWithoutLeadingDot;

}

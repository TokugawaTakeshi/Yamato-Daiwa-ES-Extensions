import isNull from "../../TypeGuards/Nullables/isNull";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";
import Logger from "../../Logging/Logger";


export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  sourceDataAndOptions: Readonly<{
    targetString: string;
    regularExpression: RegExp;
  }>
): string | null;

export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  sourceDataAndOptions: Readonly<{
    targetString: string;
    regularExpression: RegExp;
    mustThrowErrorIfZeroOrMoreThanOneMatchings: true;
  }>
): string;


export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  sourceDataAndOptions: Readonly<{
    targetString: string;
    regularExpression: RegExp;
    mustThrowErrorIfZeroOrMoreThanOneMatchings?: true;
  }>
): string | null {

  /* [ Theory ] Without "g" flag the matching will be always one - no matter how many times "exec" method will be called. */
  const regularExpressionWithRequiredFlags: RegExp = new RegExp(sourceDataAndOptions.regularExpression, "gu");

  /* [ Theory ] Although the "exec" returns the array-like object, this object contains the data only about first matching.
   *    To get next match, we need to call this method again. */
  const firstMatchWithRegularExpression: RegExpMatchArray | null = regularExpressionWithRequiredFlags.
      exec(sourceDataAndOptions.targetString);

  if (isNull(firstMatchWithRegularExpression)) {

    if (sourceDataAndOptions.mustThrowErrorIfZeroOrMoreThanOneMatchings) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, the string:\n" +
          `${ sourceDataAndOptions.targetString }\n` +
          "has no matchings with regular expression:\n" +
          sourceDataAndOptions.regularExpression.toString()
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getMatchingWithFirstRegularExpressionCapturingGroup(sourceDataAndOptions)"
      });
    }


    return null;

  }


  /* [ Optimization ] No need to get all matchings - it is enough to know is there the second on or no. */
  if (regularExpressionWithRequiredFlags.exec(sourceDataAndOptions.targetString)) {

    if (sourceDataAndOptions.mustThrowErrorIfZeroOrMoreThanOneMatchings) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
            "Contrary to expectations, the string:\n" +
            `${ sourceDataAndOptions.targetString }\n` +
            "has more that one matching with regular expression:\n" +
            sourceDataAndOptions.regularExpression.toString()
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getMatchingWithFirstRegularExpressionCapturingGroup(sourceDataAndOptions)"
      });
    }


    return null;

  }


  return firstMatchWithRegularExpression[1];

}

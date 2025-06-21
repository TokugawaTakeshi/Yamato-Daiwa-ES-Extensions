import isNull from "../../TypeGuards/EmptyTypes/isNull";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  targetString: string,
  regularExpression: RegExp
): string | null;

/* [ Theory ]
* Although both options set `true` are contradicting, changing the type to
*   Readonly<(
*     { mustExpectAtLeastOneMatching: boolean; } |
*     { mustExpectExactlyOneMatching: boolean; }
*   )>
* type will give no benefits because `|` is not the exclusive "or". */
export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  targetString: string,
  regularExpression: RegExp,
  options: Readonly<{
    mustExpectAtLeastOneMatching?: boolean;
    mustExpectExactlyOneMatching?: boolean;
  }>
): string;


export default function getMatchingWithFirstRegularExpressionCapturingGroup(
  targetString: string,
  regularExpression: RegExp,
  options: Readonly<{
    mustExpectAtLeastOneMatching?: boolean;
    mustExpectExactlyOneMatching?: boolean;
  }> = {}
): string | null {

  if (options.mustExpectAtLeastOneMatching === true && options.mustExpectExactlyOneMatching === true) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 3,
        parameterName: "options",
        messageSpecificPart:
            "Both \"mustExpectAtLeastOneMatching\" and \"mustExpectExactlyOneMatching\" has been set to true what is " +
              "the contradiction."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getMatchingWithFirstRegularExpressionCapturingGroup(targetString, regularExpression, options)"
    });
  }


  /* [ Theory ] Without "g" flag the matching will be always one - no matter how many times "exec" method will be called. */
  const regularExpressionWithGlobalFlag: RegExp = new RegExp(
    regularExpression, regularExpression.flags.includes("g") ? regularExpression.flags : `${ regularExpression.flags }g`
  );

  /* [ Theory ]
   * Although the "exec" returns the array-like object, this object contains the data only about first matching.
   * To get next matching, it is required to call this method again. */
  const firstMatchingWithRegularExpression: RegExpMatchArray | null = regularExpressionWithGlobalFlag.exec(targetString);

  if (isNull(firstMatchingWithRegularExpression)) {

    if (options.mustExpectAtLeastOneMatching === true || options.mustExpectExactlyOneMatching === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, the below following has no matchings with the regular expression " +
            `"${ regularExpression.toString() }":\n${ targetString }`
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getMatchingWithFirstRegularExpressionCapturingGroup(targetString, regularExpression, options)"
      });
    }


    return null;

  }


  /* [ Optimization ] No need to get all matchings - it is enough to know is there the second on or no. */
  if (regularExpressionWithGlobalFlag.exec(targetString)) {

    if (options.mustExpectExactlyOneMatching === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, the below following has more than one matchings with the regular expression " +
            `"${ regularExpression.toString() }":\n${ targetString }`
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getMatchingWithFirstRegularExpressionCapturingGroup(targetString, regularExpression, options)"
      });
    }


    return null;

  }


  return firstMatchingWithRegularExpression[1];

}

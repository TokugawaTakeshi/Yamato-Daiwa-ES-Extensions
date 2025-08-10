import isNull from "../../TypeGuards/EmptyTypes/isNull";
import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";


export namespace ExtractingOfMatchingsWithRegularExpression {

  export type ArrayedResult = {
    updatedString: string;
    extractedMatchings: Array<string>;
  };

  export type ExactlyOneResult = {
    updatedString: string;
    extractedMatching: string;
  };

  export type NullableResult = {
    updatedString: string;
    extractedMatching: string | null;
  };

  export type Result = ArrayedResult | ExactlyOneResult | NullableResult;

}


export default function extractMatchingsWithRegularExpression(
  targetString: string, regularExpression: RegExp
): ExtractingOfMatchingsWithRegularExpression.ArrayedResult;

export default function extractMatchingsWithRegularExpression(
  targetString: string, regularExpression: RegExp, options: Readonly<{ mustExpectExactlyOneMatching: true; }>
): ExtractingOfMatchingsWithRegularExpression.ExactlyOneResult;

export default function extractMatchingsWithRegularExpression(
  targetString: string, regularExpression: RegExp, options: Readonly<{ mustExpectOneOrZeroMatchings: true; }>
): ExtractingOfMatchingsWithRegularExpression.NullableResult;


export default function extractMatchingsWithRegularExpression(
  targetString: string,
  regularExpression: RegExp,
  options: Readonly<{
    mustExpectExactlyOneMatching?: true;
    mustExpectOneOrZeroMatchings?: true;
  }> = {}
): ExtractingOfMatchingsWithRegularExpression.Result {

  const searchingResults: RegExpMatchArray | null = regularExpression.exec(targetString);

  if (isNull(searchingResults)) {

    if (options.mustExpectExactlyOneMatching === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, there is no matchings with regular expression:\n" +
          `${ regularExpression.toString() }\n` +
          "in the string:\n" +
          targetString
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "extractMatchingsWithRegularExpression(targetString, regularExpression, options)"
      });
    }


    if (options.mustExpectOneOrZeroMatchings === true) {
      return {
        extractedMatching: null,
        updatedString: targetString
      };
    }


    return {
      extractedMatchings: [],
      updatedString: targetString
    };

  } else if (searchingResults.length > 1) {

    if (options.mustExpectOneOrZeroMatchings === true || options.mustExpectExactlyOneMatching) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
            "Contrary to expectations, there are more that one matchings with regular expression:\n" +
            `${ regularExpression.toString() }\n` +
            "in the string:\n" +
            targetString
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "extractMatchingsWithRegularExpression(targetString, regularExpression, options)"
      });
    }

    return {
      updatedString: targetString.replaceAll(new RegExp(regularExpression, "gu"), ""),
      extractedMatchings: searchingResults
    };

  }


  if (options.mustExpectOneOrZeroMatchings === true || options.mustExpectExactlyOneMatching === true) {

    return {
      extractedMatching: searchingResults[0],
      updatedString: targetString.replaceAll(new RegExp(regularExpression, "gu"), "")
    };

  }


  return {
    extractedMatchings: [ searchingResults[0] ],
    updatedString: targetString.replaceAll(new RegExp(regularExpression, "gu"), "")
  };

}

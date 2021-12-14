import {
  ErrorLog,
  ThrownErrorLog,
  InfoLog,
  SuccessLog,
  WarningLog,
  Log,
  Logger,
  substituteWhenUndefined,
  stringifyAndFormatArbitraryValue,
  insertSubstringIf,
  isNotUndefined,
  LoggerLocalization__English
} from "@yamato-daiwa/es-extensions";


abstract class BasicFrontEndLogger {

  private static localization: Logger.Localization = LoggerLocalization__English;

  public static setLocalization(localization: Logger.Localization): typeof BasicFrontEndLogger {
    BasicFrontEndLogger.localization = localization;
    return BasicFrontEndLogger;
  }


  public static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never {

    if ("errorInstance" in errorLog) {

      errorLog.errorInstance.message = `${errorLog.title}\n${errorLog.errorInstance.message}` +
          `\n\n${BasicFrontEndLogger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
          `${insertSubstringIf(
            `\n\n${BasicFrontEndLogger.localization.wrappableError}:` +
            `\n${stringifyAndFormatArbitraryValue(errorLog.wrappableError)}`,
            isNotUndefined(errorLog.wrappableError)
          )}` +
          `${insertSubstringIf(
            `\n\n${BasicFrontEndLogger.localization.appendedData}:` +
            `\n${stringifyAndFormatArbitraryValue(errorLog.additionalData)}`,
            isNotUndefined(errorLog.additionalData)
          )}` +
          /* Divider before stack trace */
          "\n";

      /* 〔 ESLint muting rationale 〕 In this case the 'errorInstance' is the instance of 'Error' or it's inheritor.
      *    Although '@typescript-eslint' considers the throwing of is as a violation, this scenario has not been mentioned
      *    in incorrect code example of 'no-throw-literal' rule documentation.
      *    https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md */
      /* eslint-disable-next-line @typescript-eslint/no-throw-literal */
      throw errorLog.errorInstance;
    }


    const errorWillBeThrown: Error = new Error(errorLog.description);
    errorWillBeThrown.name = errorLog.errorType;

    throw errorWillBeThrown;
  }

  public static logError(errorLog: ErrorLog): void {

    const badgeText: string = errorLog.customBadgeText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.error;

    console.error(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
      [ ` ${badgeText} `, { background: "red", color: "white", "font-weight": "bold", "border-radius": "4px" } ],
      [ ` ${errorLog.title}\n`, { color: "red", "font-weight": "bold" } ],
      [ `${errorLog.description}`, { color: "red" } ],

      [ `\n\n${BasicFrontEndLogger.localization.errorType}: `, { "font-weight": "bold", color: "red" } ],
      [ `${errorLog.errorType}`, { color: "red" } ],

      [ `\n${BasicFrontEndLogger.localization.occurrenceLocation}: `, { "font-weight": "bold", color: "red" } ],
      [ `${errorLog.occurrenceLocation}`, { color: "red" } ],
      /* 〔 Theory 〕 The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("caughtError" in errorLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.caughtError}:`, { "font-weight": "bold", color: "red" } ],
        [
          errorLog.caughtError instanceof Error ? `\n${errorLog.caughtError.stack}` :
              `\n${stringifyAndFormatArbitraryValue(errorLog.caughtError)}`,
          { color: "red" }
        ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData,
      ...("additionalData" in errorLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "red" } ],
        [ `\n${stringifyAndFormatArbitraryValue(errorLog.additionalData)}`, { color: "red" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData
    ]));
  }

  public static logErrorLikeMessage(errorLikeLog: Log): void {

    const badgeText: string = errorLikeLog.customBadgeText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.error;

    console.error(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
      [ ` ${badgeText} `, { background: "red", color: "white", "font-weight": "bold", "border-radius": "4px" } ],
      [ ` ${errorLikeLog.title}\n`, { color: "red", "font-weight": "bold" } ],
      [ `${errorLikeLog.description}`, { color: "red" } ],
      /* 〔 Theory 〕 The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("additionalData" in errorLikeLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "red" } ],
        [ `\n${stringifyAndFormatArbitraryValue(errorLikeLog.additionalData)}`, { color: "red" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData
    ]));
  }

  public static logWarning(warningLog: WarningLog): void {

    const badgeText: string = substituteWhenUndefined(
      warningLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.warning
    );

    console.warn(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
      [ ` ${badgeText} `, { background: "orange", color: "white", "font-weight": "bold", "border-radius": "4px" } ],
      [ ` ${warningLog.title}\n`, { color: "orange", "font-weight": "bold" } ],
      [ `${warningLog.description}`, { color: "orange" } ],
      /* 〔 Theory 〕 The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("occurrenceLocation" in warningLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.occurrenceLocation}: `, { "font-weight": "bold", color: "orange" } ],
        [ `${warningLog.occurrenceLocation}`, { color: "orange" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData,
      ...("additionalData" in warningLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "orange" } ],
        [ `\n${stringifyAndFormatArbitraryValue(warningLog.additionalData)}`, { color: "orange" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData
    ]));
  }

  public static logSuccess(successLog: SuccessLog): void {

    const badgeText: string = successLog.customBadgeText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.success;

    console.log(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
      [ ` ${badgeText} `, { background: "mediumseagreen", color: "white", "font-weight": "bold", "border-radius": "4px" } ],
      [ ` ${successLog.title}\n`, { color: "mediumseagreen", "font-weight": "bold" } ],
      [ `${successLog.description}`, { color: "mediumseagreen" } ],
      ...("additionalData" in successLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "mediumseagreen" } ],
        [ `\n${stringifyAndFormatArbitraryValue(successLog.additionalData)}`, { color: "mediumseagreen" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData
    ]));
  }

  public static logInfo(infoLog: InfoLog): void {

    const badgeText: string = infoLog.customBadgeText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.info;

    console.log(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
      [ ` ${badgeText} `, { background: "dodgerblue", color: "white", "font-weight": "bold", "border-radius": "4px" } ],
      [ ` ${infoLog.title}\n`, { color: "dodgerblue", "font-weight": "bold" } ],
      [ `${infoLog.description}`, { color: "dodgerblue" } ],
      ...("additionalData" in infoLog ? [
        [ `\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "dodgerblue" } ],
        [ `\n${stringifyAndFormatArbitraryValue(infoLog.additionalData)}`, { color: "dodgerblue" } ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData
    ]));
  }

  public static highlightText(targetString: string): string {
    return `\x1b[43m${targetString}`;
  }

  public static generateConsoleMethodParametersForFormattedOutput(
    formattedOutputData: BasicFrontEndLogger.FormattedOutputData
  ): Array<string> {

    const outputContent: Array<string> = [];
    const CSS_DeclarationsForEachContent: Array<string> = [];

    for (const singleFormattedOutputData of formattedOutputData) {

      outputContent.push(`%c${singleFormattedOutputData[0]}`);

      let CSS_Declarations: string = "";

      for (const [ CSS_Key, CSS_Value ] of Object.entries(singleFormattedOutputData[1])) {
        CSS_Declarations = `${CSS_Declarations}${CSS_Key}: ${CSS_Value};`;
      }

      CSS_DeclarationsForEachContent.push(CSS_Declarations);
    }

    return [ outputContent.join(""), ...CSS_DeclarationsForEachContent ];
  }
}


namespace BasicFrontEndLogger {
  export type FormattedOutputData = Array<[string, { [CSS_Key: string]: string; }]>;
}


export default BasicFrontEndLogger;

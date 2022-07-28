/* eslint-disable no-console -- This class using native "console" because of its specialization. */

import type { Log, ErrorLog, ThrownErrorLog, WarningLog, InfoLog, SuccessLog } from "./Logs";
import type { ILogger } from "./ILogger";

import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import substituteWhenUndefined from "../DefaultValueSubstituters/substituteWhenUndefined";
import insertSubstringIf from "../Strings/insertSubstringIf";
import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";

import LoggerLocalization__English from "./LoggerLocalization__English";


abstract class Logger {

  private static implementation: ILogger | null = null;
  private static localization: Logger.Localization = LoggerLocalization__English;

  public static setImplementation(implementation: ILogger): typeof Logger {
    Logger.implementation = implementation;
    return Logger;
  }

  public static setLocalization(localization: Logger.Localization): typeof Logger {
    Logger.localization = localization;
    return Logger;
  }


  public static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never {

    if (isNotNull(Logger.implementation)) {
      return Logger.implementation.throwErrorAndLog(errorLog);
    }

    if ("errorInstance" in errorLog) {

      errorLog.errorInstance.message = `${ errorLog.title }\n${ errorLog.errorInstance.message }` +

          `\n\n${ Logger.localization.occurrenceLocation }: ${ errorLog.occurrenceLocation }` +

          `${ insertSubstringIf(
            `\n\n${ Logger.localization.wrappableError }:` +
            `\n${ stringifyAndFormatArbitraryValue(errorLog.wrappableError) }`,
            isNotUndefined(errorLog.wrappableError)
          ) }` +

          `${ insertSubstringIf(
            `\n\n${ Logger.localization.appendedData }:` +
            `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`,
            isNotUndefined(errorLog.additionalData)
          ) }` +

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

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logError(errorLog);
      return;
    }

    console.error(
      `[ ${ substituteWhenUndefined(errorLog.customBadgeText, Logger.localization.badgesDefaultTitles.error) } ] ` +
      `${ errorLog.title }\n` +
      `${ errorLog.description }` +
      `\n\n${ Logger.localization.errorType }: ${ errorLog.errorType }` +
      `\n${ Logger.localization.occurrenceLocation }: ${ errorLog.occurrenceLocation }` +
      `${ insertSubstringIf(
        `\n\n${ Logger.localization.caughtError }:` + 
        `\n${ stringifyAndFormatArbitraryValue(errorLog.caughtError) }` +
        `${ errorLog.caughtError instanceof Error ? `\n${ errorLog.caughtError.stack }` : "" }`, 
        isNotUndefined(errorLog.caughtError)
      ) }` +
      `${ insertSubstringIf(
        `\n\n${ Logger.localization.appendedData }:` + 
        `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`,
        isNotUndefined(errorLog.additionalData)
      ) }`
    );
  }

  public static logErrorLikeMessage(errorLikeLog: Log): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logErrorLikeMessage(errorLikeLog);
      return;
    }

    console.error(Logger.formatGenericLog(errorLikeLog, Logger.localization.badgesDefaultTitles.error));
  }

  public static logWarning(warningLog: WarningLog): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logWarning(warningLog);
      return;
    }

    console.warn(
      `[ ${ substituteWhenUndefined(warningLog.customBadgeText, Logger.localization.badgesDefaultTitles.warning) } ] ` +
      `${ warningLog.title }\n` +
      `${ warningLog.description }` +
      `\n\n${ insertSubstringIf(
        `${ Logger.localization.occurrenceLocation }: ${ warningLog.occurrenceLocation }`,
        isNotUndefined(warningLog.occurrenceLocation)
      ) }` +
      `\n\n${ insertSubstringIf(
          `${ Logger.localization.appendedData }: ${ stringifyAndFormatArbitraryValue(warningLog.additionalData) }`,
          isNotUndefined(warningLog.additionalData)
      ) }`
    );
  }

  public static logInfo(infoLog: InfoLog): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logInfo(infoLog);
      return;
    }

    console.info(Logger.formatGenericLog(infoLog, Logger.localization.badgesDefaultTitles.info));
  }

  public static logSuccess(successLog: SuccessLog): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logSuccess(successLog);
      return;
    }

    console.info(Logger.formatGenericLog(successLog, Logger.localization.badgesDefaultTitles.success));
  }

  public static highlightText(targetString: string): string {

    if (isNotNull(Logger.implementation)) {
      return Logger.implementation.highlightText(targetString);
    }

    return targetString;
  }


  private static formatGenericLog(genericLog: Log, defaultBadgeText: string): string {
    return `[ ${ substituteWhenUndefined(genericLog.customBadgeText, defaultBadgeText) } ] ` +
        `${ genericLog.title }\n` +
        `${ genericLog.description }` +
        `\n\n${ insertSubstringIf(
          `${ Logger.localization.appendedData }: ${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`,
          isNotUndefined(genericLog.additionalData)
        ) }`;
  }
}


namespace Logger {

  export type Localization = Readonly<{

    badgesDefaultTitles: Readonly<{
      error: string;
      warning: string;
      info: string;
      success: string;
    }>;

    errorType: string;
    occurrenceLocation: string;
    caughtError: string;
    wrappableError: string;
    appendedData: string;
  }>;
}


export default Logger;

/* eslint-disable no-console -- This class using native "console" because of its specialization. */

import type { Log, ErrorLog, ThrownErrorLog, WarningLog, InfoLog, SuccessLog } from "./Logs";
import type { ILogger } from "./ILogger";

import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNonEmptyString from "../TypeGuards/Strings/isNonEmptyString";
import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";

import loggerLocalization__english from "./LoggerLocalization.english";


abstract class Logger {

  private static implementation: ILogger | null = null;
  private static localization: Logger.Localization = loggerLocalization__english;


  public static setImplementation(implementation: ILogger): typeof Logger {
    Logger.implementation = implementation;
    return Logger;
  }

  public static setLocalization(localization: Logger.Localization): typeof Logger {
    Logger.localization = localization;
    return Logger;
  }


  public static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never {

    if (isNotNull(Logger.implementation) && isNotUndefined(Logger.implementation.throwErrorAndLog)) {
      return Logger.implementation.throwErrorAndLog(errorLog);
    }


    let stringifiedInnerError: string | undefined;

    if (isNotUndefined(errorLog.innerError)) {

      stringifiedInnerError = stringifyAndFormatArbitraryValue(errorLog.innerError);

      if (errorLog.innerError instanceof Error && isNonEmptyString(errorLog.innerError.stack)) {

        /* [ Theory ] The first line could be even with `stringifyAndFormatArbitraryValue(errorLog.innerError)`,
         *    but it is runtime dependent because the `stack` property is non-standard. */

        stringifiedInnerError = errorLog.innerError.stack.includes(stringifiedInnerError) ?
            errorLog.innerError.stack :
            `${ stringifiedInnerError }\n${ errorLog.innerError.stack }`;

      }

    }

    const errorMessage: string = [

      errorLog.title,
      ...errorLog.compactLayout === true ? [ " " ] : [ "\n" ],

      ..."errorInstance" in errorLog ? [ errorLog.errorInstance.message ] : [ errorLog.description ],

      `\n\n${ Logger.localization.occurrenceLocation }: ${ errorLog.occurrenceLocation }`,

      ...isNotUndefined(stringifiedInnerError) ?
          [ `\n\n${ Logger.localization.innerError }:\n${ stringifiedInnerError }` ] : [ ],

      ...isNotUndefined(errorLog.additionalData) ?
          [
            `\n\n${ Logger.localization.appendedData }:` +
              `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`
          ] :
          [ ],

        /* Divider before stack trace */
        "\n"

      ].join("");

    if ("errorInstance" in errorLog) {

      errorLog.errorInstance.message = errorMessage;

      /* eslint-disable-next-line @typescript-eslint/only-throw-error --
      *  In this case the `errorInstance` is the instance of `Error` or its inheritor.
      *  Although `@typescript-eslint` considers the throwing of it as the violation, this scenario has not been mentioned
      *    in incorrect code example of `no-throw-literal` rule documentation.
      *    https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
      *  */
      throw errorLog.errorInstance;

    }


    const errorWillBeThrown: Error = new Error(errorMessage);
    errorWillBeThrown.name = errorLog.errorType;

    throw errorWillBeThrown;

  }

  public static logError(errorLog: ErrorLog): void {

    if (errorLog.mustOutputIf === false) {
      return;
    }


    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logError(errorLog);
      return;
    }


    console.error(
      [

        ...errorLog.badge === false ?
            [ ] :
            [ `[ ${ errorLog.badge?.customText ?? Logger.localization.badgesDefaultTitles.error } ] ` ],

        errorLog.title,
        ...errorLog.compactLayout === true ? [ " " ] : [ "\n" ],
        errorLog.description,

        `\n\n${ Logger.localization.errorType }: ${ errorLog.errorType }`,
        `\n${ Logger.localization.occurrenceLocation }: ${ errorLog.occurrenceLocation }`,

        ...isNotUndefined(errorLog.caughtError) ?
            [
              `\n\n${ Logger.localization.caughtError }:` +
                `\n${ stringifyAndFormatArbitraryValue(errorLog.caughtError) }` +
                (
                  errorLog.caughtError instanceof Error && isNonEmptyString(errorLog.caughtError.stack) ?
                      `\n${ errorLog.caughtError.toString() }\n${ errorLog.caughtError.stack }` : ""
                )
            ] :
            [ ],

        ...isNotUndefined(errorLog.additionalData) ?
            [
              `\n\n${ Logger.localization.appendedData }:` +
                `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`
            ] :
            [ ]

      ].join("")
    );

  }

  public static logErrorLikeMessage(errorLikeLog: Log): void {

    if (errorLikeLog.mustOutputIf === false) {
      return;
    }


    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logErrorLikeMessage(errorLikeLog);
      return;
    }

    console.error(Logger.formatGenericLog(errorLikeLog, Logger.localization.badgesDefaultTitles.error));

  }

  public static logWarning(warningLog: WarningLog): void {

    if (warningLog.mustOutputIf === false) {
      return;
    }


    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logWarning(warningLog);
      return;
    }

    console.warn(
      [

      ...warningLog.badge === false ?
          [ ] :
          [ `[ ${ warningLog.badge?.customText ?? Logger.localization.badgesDefaultTitles.error } ] ` ],

        warningLog.title,
        ...warningLog.compactLayout === true ? [ " " ] : [ "\n" ],
        warningLog.description,

        `\n${ Logger.localization.occurrenceLocation }: ${ warningLog.occurrenceLocation }`,

        ...isNotUndefined(warningLog.additionalData) ?
          [
            `\n\n${ Logger.localization.appendedData }:` +
              `\n${ stringifyAndFormatArbitraryValue(warningLog.additionalData) }`
          ] :
          [ ]

      ].join("")
    );

  }

  public static logInfo(infoLog: InfoLog): void {

    if (infoLog.mustOutputIf === false) {
      return;
    }


    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logInfo(infoLog);
      return;
    }


    console.info(Logger.formatGenericLog(infoLog, Logger.localization.badgesDefaultTitles.info));

  }

  public static logSuccess(successLog: SuccessLog): void {

    if (successLog.mustOutputIf === false) {
      return;
    }


    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logSuccess(successLog);
      return;
    }


    console.info(Logger.formatGenericLog(successLog, Logger.localization.badgesDefaultTitles.success));

  }

  public static logGeneric(genericLog: Log): void {

    if (genericLog.mustOutputIf === false) {
      return;
    }

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logGeneric(genericLog);
      return;
    }


    console.log(Logger.formatGenericLog(genericLog, Logger.localization.badgesDefaultTitles.generic));


  }

  public static highlightText(targetString: string): string {
    return isNotNull(Logger.implementation) ? Logger.implementation.highlightText(targetString) : targetString;
  }


  private static formatGenericLog(genericLog: Log, defaultBadgeText: string): string {
    return [

      ...genericLog.badge === false ? [ ] : [ `[ ${ genericLog.badge?.customText ?? defaultBadgeText } ] ` ],

      genericLog.title,
      ...genericLog.compactLayout === true ? [ " " ] : [ "\n" ],
      genericLog.description,

      ...isNotUndefined(genericLog.additionalData) ?
            [
              `\n\n${ Logger.localization.appendedData }:` +
                `\n${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`
            ] :
            [ ]

    ].join("");
  }
}


namespace Logger {

  export type Localization = Readonly<{

    badgesDefaultTitles: Readonly<{
      error: string;
      warning: string;
      info: string;
      success: string;
      generic: string;
    }>;

    errorType: string;
    occurrenceLocation: string;
    caughtError: string;
    innerError: string;
    appendedData: string;

  }>;

}


export default Logger;

/* eslint-disable no-console -- This class using native "console" because of its specialization. */

import type { Log, ErrorLog, ThrownErrorLog, WarningLog, InfoLog, SuccessLog } from "./Logs";
import type { ILogger } from "./ILogger";

import isString from "../TypeGuards/Strings/isString";
import isNonEmptyString from "../TypeGuards/Strings/isNonEmptyString";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isBoolean from "../TypeGuards/isBoolean";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import isNotUndefined from "../TypeGuards/EmptyTypes/isNotUndefined";
import isNull from "../TypeGuards/EmptyTypes/isNull";
import isNotNull from "../TypeGuards/EmptyTypes/isNotNull";

import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";

import loggerLocalization__english from "./LoggerLocalization.english";


abstract class Logger {

  /* ━━━ Protected Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected static implementation: ILogger | null = null;
  protected static localization: Logger.Localization = loggerLocalization__english;


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Configuration ────────────────────────────────────────────────────────────────────────────────────────────── */
  public static setImplementation(implementation: ILogger): typeof Logger {
    Logger.implementation = implementation;
    return Logger;
  }

  public static setLocalization(localization: Logger.Localization): typeof Logger {
    Logger.localization = localization;
    return Logger;
  }


  /* ─── Methods of `ILogger` Interface ───────────────────────────────────────────────────────────────────────────── */
  public static throwErrorAndLog<CustomError extends Error>(
    polymorphicPayload: Error | ThrownErrorLog<CustomError>
  ): never {

    if (isNotNull(Logger.implementation) && isNotUndefined(Logger.implementation.throwErrorAndLog)) {
      return Logger.implementation.throwErrorAndLog(polymorphicPayload);
    }


    if (polymorphicPayload instanceof Error) {
      throw polymorphicPayload;
    }


    let stringifiedInnerError: string | undefined;

    if (isNotUndefined(polymorphicPayload.innerError)) {

      stringifiedInnerError = stringifyAndFormatArbitraryValue(polymorphicPayload.innerError);

      if (polymorphicPayload.innerError instanceof Error && isNonEmptyString(polymorphicPayload.innerError.stack)) {

        /* [ Theory ] The first line could be even with `stringifyAndFormatArbitraryValue(polymorphicPayload.innerError)`,
         *    but it is runtime dependent because the `stack` property is non-standard. */

        stringifiedInnerError = polymorphicPayload.innerError.stack.includes(stringifiedInnerError) ?
            polymorphicPayload.innerError.stack :
            `${ stringifiedInnerError }\n${ polymorphicPayload.innerError.stack }`;

      }

    }

    const errorMessage: string = Logger.
        generateFormattedErrorFromThrownErrorLog(polymorphicPayload, stringifiedInnerError);

    if ("errorInstance" in polymorphicPayload) {
      polymorphicPayload.errorInstance.message = errorMessage;
      throw polymorphicPayload.errorInstance;
    }


    const errorWillBeThrown: Error = new Error(errorMessage);
    errorWillBeThrown.name = polymorphicPayload.errorType;

    throw errorWillBeThrown;

  }

  public static logError(polymorphicPayload: ErrorLog | string): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logError(polymorphicPayload);
      return;
    }


    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.error(Logger.formatErrorLog(polymorphicPayload));

  }

  public static logErrorLikeMessage(polymorphicPayload: Log | string): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logErrorLikeMessage(polymorphicPayload);
      return;
    }


    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.error(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.error));

  }

  public static logWarning(polymorphicPayload: WarningLog | string): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logWarning(polymorphicPayload);
      return;
    }


    if (isString(polymorphicPayload)) {
      console.warn(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.warn(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.warning));

  }

  public static logInfo(polymorphicPayload: InfoLog | string): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logInfo(polymorphicPayload);
      return;
    }


    if (isString(polymorphicPayload)) {
      console.info(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.info(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.info));

  }

  public static logSuccess(polymorphicPayload: SuccessLog | string): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logSuccess(polymorphicPayload);
      return;
    }


    if (isString(polymorphicPayload)) {
      console.info(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.info(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.success));

  }

  public static logDebug(polymorphicPayload: Log | string | number | boolean | null | undefined): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logDebug(polymorphicPayload);
      return;
    }


    if (
      isString(polymorphicPayload) ||
      isNumber(polymorphicPayload) ||
      isBoolean(polymorphicPayload) ||
      isNull(polymorphicPayload) ||
      isUndefined(polymorphicPayload)
    ) {
      console.debug(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.debug(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.debug));

  }

  public static logGeneric(polymorphicPayload: Log | string | number | boolean | null | undefined): void {

    if (isNotNull(Logger.implementation)) {
      Logger.implementation.logGeneric(polymorphicPayload);
      return;
    }


    if (
      isString(polymorphicPayload) ||
      isNumber(polymorphicPayload) ||
      isBoolean(polymorphicPayload) ||
      isNull(polymorphicPayload) ||
      isUndefined(polymorphicPayload)
    ) {
      console.log(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.log(Logger.formatGenericLog(polymorphicPayload, Logger.localization.badgesDefaultTitles.generic));

  }

  public static logPromiseError(error: unknown): void {

    if (isNotNull(Logger.implementation) && isNotUndefined(Logger.implementation.logPromiseError)) {
      Logger.implementation.logPromiseError(error);
      return;
    }


    console.error(error);

  }


  /* ─── Formatters ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public static highlightText(targetString: string): string {
    return isNotNull(Logger.implementation) ? Logger.implementation.highlightText(targetString) : targetString;
  }

  public static generateFormattedErrorFromThrownErrorLog(
    thrownErrorLog: ThrownErrorLog, stringifiedInnerError?: string
  ): string {
    return [

      thrownErrorLog.title,
      ...thrownErrorLog.compactLayout === true ? [ " " ] : [ "\n" ],

      ..."errorInstance" in thrownErrorLog ?
          [ thrownErrorLog.errorInstance.message ] :
          [ thrownErrorLog.description ],

      `\n\n${ Logger.localization.occurrenceLocation }: ${ thrownErrorLog.occurrenceLocation }`,

      ...isNotUndefined(stringifiedInnerError) ?
          [ `\n\n${ Logger.localization.innerError }:\n${ stringifiedInnerError }` ] : [ ],

      ...isNotUndefined(thrownErrorLog.additionalData) ?
          [
            `\n\n${ Logger.localization.appendedData }:` +
              `\n${ stringifyAndFormatArbitraryValue(thrownErrorLog.additionalData) }`
          ] :
          [ ],

        /* Divider before stack trace */
        "\n"

    ].join("");
  }

  public static formatErrorLog(errorLog: ErrorLog): string {
    return [

      ...Logger.generateBadgeIfMust(errorLog.badge, Logger.localization.badgesDefaultTitles.error),

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

    ].join("");
  }

  public static formatGenericLog(genericLog: Log | WarningLog, defaultBadgeText: string): string {
    return [

      ...Logger.generateBadgeIfMust(genericLog.badge, defaultBadgeText),

      genericLog.title,
      ...genericLog.compactLayout === true ? [ " " ] : [ "\n" ],
      genericLog.description,

      ..."occurrenceLocation" in genericLog ?
          [ `\n${ Logger.localization.occurrenceLocation }: ${ genericLog.occurrenceLocation }` ] : [],

      ...isNotUndefined(genericLog.additionalData) ?
          [
            `\n\n${ Logger.localization.appendedData }:` +
              `\n${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`
          ] :
          [ ]

    ].join("");
  }

  public static generateBadgeIfMust(
    badge: Readonly<{ customText: string; }> | false | undefined,
    defaultBadgeText: string
  ): Array<string> {
    return badge === false ? [] : [ `[ ${ badge?.customText ?? defaultBadgeText } ] ` ];
  }

}


namespace Logger {

  export type Localization = Readonly<{

    badgesDefaultTitles: Readonly<{
      error: string;
      warning: string;
      info: string;
      success: string;
      debug: string;
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

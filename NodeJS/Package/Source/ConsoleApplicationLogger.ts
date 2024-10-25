/* eslint-disable no-console -- This class using native "console" because of its specialization. */

import {
  type Logger,
  type ErrorLog,
  type ThrownErrorLog,
  type InfoLog,
  type SuccessLog,
  type WarningLog,
  type Log,
  isString,
  isNonEmptyString,
  isNumber,
  isNonNegativeInteger,
  isBoolean,
  isArbitraryObject,
  isUndefined,
  isNotUndefined,
  isNull,
  insertSubstringIf,
  stringifyAndFormatArbitraryValue,
  loggerLocalization__english
} from "@yamato-daiwa/es-extensions";


abstract class ConsoleApplicationLogger {

  protected static localization: Logger.Localization = loggerLocalization__english;


  public static setLocalization(localization: Logger.Localization): typeof ConsoleApplicationLogger {
    ConsoleApplicationLogger.localization = localization;
    return ConsoleApplicationLogger;
  }


  /* ━━━ Logging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static throwErrorAndLog<CustomError extends Error>(
    polymorphicPayload: Error | ThrownErrorLog<CustomError>
  ): never {

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

    const errorMessage: string = ConsoleApplicationLogger.
        generateFormattedErrorFromThrownErrorLog(polymorphicPayload, stringifiedInnerError);

    /* [ Theory ] Although the formatting of error `name` is possible, it could break the error handling so it is
     *    better to keep it as is. */
    if ("errorInstance" in polymorphicPayload) {
      polymorphicPayload.errorInstance.message = errorMessage;
      throw polymorphicPayload.errorInstance;
    }


    const errorWillBeThrown: Error = new Error(errorMessage);
    errorWillBeThrown.name = polymorphicPayload.errorType;

    throw errorWillBeThrown;

  }

  public static logError(polymorphicPayload: ErrorLog | string): void {

    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.error(...ConsoleApplicationLogger.formatErrorLog(polymorphicPayload));

  }

  public static logErrorLikeMessage(polymorphicPayload: Log | string): void {

    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.error(
      ...ConsoleApplicationLogger.formatGenericLog({
        genericLog: polymorphicPayload,
        badgeContentAndFormatting: {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.error,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 192, green: 57, blue: 43 }
        },
        mainColor: { red: 231, green: 76, blue: 60 },
        titleColor: { red: 192, green: 57, blue: 43 }
      })
    );

  }

  public static logWarning(polymorphicPayload: WarningLog | string): void {

    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.warn(
      ...ConsoleApplicationLogger.formatGenericLog({
        genericLog: polymorphicPayload,
        badgeContentAndFormatting: {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.warning,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 211, green: 84, blue: 0 }
        },
        mainColor: { red: 230, green: 126, blue: 34 },
        titleColor: { red: 211, green: 84, blue: 0 }
      })
    );

  }

  public static logInfo(polymorphicPayload: InfoLog | string): void {

    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.log(
      ...ConsoleApplicationLogger.formatGenericLog({
        genericLog: polymorphicPayload,
        badgeContentAndFormatting: {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.info,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 41, green: 128, blue: 185 }
        },
        mainColor: { red: 52, green: 152, blue: 219 },
        titleColor: { red: 41, green: 128, blue: 185 }
      })
    );

  }

  public static logSuccess(polymorphicPayload: SuccessLog | string): void {

    if (isString(polymorphicPayload)) {
      console.error(polymorphicPayload);
      return;
    }


    if (polymorphicPayload.mustOutputIf === false) {
      return;
    }


    console.log(
      ...ConsoleApplicationLogger.formatGenericLog({
        genericLog: polymorphicPayload,
        badgeContentAndFormatting: {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.success,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 39, green: 174, blue: 96 }
        },
        mainColor: { red: 46, green: 204, blue: 113 },
        titleColor: { red: 39, green: 174, blue: 96 }
      })
    );

  }

  public static logGeneric(polymorphicPayload: Log | string | number | boolean | null | undefined): void {

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


    console.log(
      ...ConsoleApplicationLogger.formatGenericLog({
        genericLog: polymorphicPayload,
        badgeContentAndFormatting: {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.generic,
          foregroundColor: { red: 0, green: 0, blue: 0 },
          backgroundColor: { red: 255, green: 255, blue: 255 }
        },
        mainColor: { red: 255, green: 255, blue: 255 },
        titleColor: { red: 255, green: 255, blue: 255 }
      })
    );

  }


  /* ━━━ Formatters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static highlightText(targetString: string): string {
    return `\x1b[43m${ targetString }\x1b[49m`;
  }

  public static generateFormattedErrorFromThrownErrorLog(
    thrownErrorLog: ThrownErrorLog, stringifiedInnerError?: string
  ): string {
    return [

      ConsoleApplicationLogger.generateRedGreenBlueForegroundColorControlSequence({ red: 231, green: 76, blue: 60 }),

      "\x1b[1m",
      thrownErrorLog.title,
      "\x1b[22m",

      ...thrownErrorLog.compactLayout === true ? [ " " ] : [ "\n" ],

      ..."errorInstance" in thrownErrorLog ?
          [ thrownErrorLog.errorInstance.message ] :
          [ thrownErrorLog.description ],

      `\n\n${ ConsoleApplicationLogger.localization.occurrenceLocation }: ${ thrownErrorLog.occurrenceLocation }`,

      ...isNotUndefined(stringifiedInnerError) ?
          [ `\n\n${ ConsoleApplicationLogger.localization.innerError }:\n${ stringifiedInnerError }` ] : [ ],

      ...isNotUndefined(thrownErrorLog.additionalData) ?
          [
            `\n\n${ ConsoleApplicationLogger.localization.appendedData }:` +
              `\n${ stringifyAndFormatArbitraryValue(thrownErrorLog.additionalData) }`
          ] :
          [ ],

        "\x1b[0m",

        /* Divider before stack trace */
        "\n"

    ].join("");
  }


  public static formatErrorLog(errorLog: ErrorLog): Array<string> {
    return ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([

      ConsoleApplicationLogger.generateBadgeIfMust(
        errorLog.badge,
        {
          defaultText: ConsoleApplicationLogger.localization.badgesDefaultTitles.error,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 192, green: 57, blue: 43 }
        }
      ),

      [
        `${ insertSubstringIf(" ", errorLog.badge !== false) }${ errorLog.title }`,
        { bold: true, foregroundColor: { red: 192, green: 57, blue: 43 } }
      ],
      [
        `${ errorLog.compactLayout === true ? " " : "\n" }${ errorLog.description }`,
        { foregroundColor: { red: 231, green: 76, blue: 60 } }
      ],

      [
        `\n\n${ ConsoleApplicationLogger.localization.errorType }: `,
        { bold: true, foregroundColor: { red: 231, green: 76, blue: 60 } }
      ],
      [
        errorLog.errorType,
        { foregroundColor: { red: 231, green: 76, blue: 60 } }
      ],

      [
        `\n${ ConsoleApplicationLogger.localization.occurrenceLocation }: `,
        { bold: true, foregroundColor: { red: 231, green: 76, blue: 60 } }
      ],
      [
        errorLog.occurrenceLocation,
        { foregroundColor: { red: 231, green: 76, blue: 60 } }
      ],

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * [ Theory ※ ] The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123
      * */
      ...("caughtError" in errorLog ? [
        [
          `\n\n${ ConsoleApplicationLogger.localization.caughtError }:`,
          { bold: true, foregroundColor: { red: 231, green: 76, blue: 60 } }
        ],
        [
          errorLog.caughtError instanceof Error ?
              `\n${ errorLog.caughtError.toString() }\n${ errorLog.caughtError.stack }` :
              `\n${ stringifyAndFormatArbitraryValue(errorLog.caughtError) }`,
          { foregroundColor: { red: 231, green: 76, blue: 60 } }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData,

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
      ...("additionalData" in errorLog ? [
        [
          `\n\n${ ConsoleApplicationLogger.localization.appendedData }:`,
          {
            bold: true,
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ],
        [
          `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`,
          {
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData

    ]);
  }

  public static formatGenericLog(
    {
      genericLog,
      badgeContentAndFormatting,
      mainColor,
      titleColor
    }: Readonly<{
      genericLog: Log;
      badgeContentAndFormatting: Readonly<{
        defaultText: string;
        foregroundColor: ConsoleApplicationLogger.RedGreenBlue;
        backgroundColor: ConsoleApplicationLogger.RedGreenBlue;
      }>;
      mainColor: ConsoleApplicationLogger.RedGreenBlue;
      titleColor: ConsoleApplicationLogger.RedGreenBlue;
    }>
  ): Array<string> {
    return ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([

      ConsoleApplicationLogger.generateBadgeIfMust(genericLog.badge, badgeContentAndFormatting),

      [
        `${ insertSubstringIf(" ", genericLog.badge !== false) }${ genericLog.title }`,
        { foregroundColor: titleColor, bold: true }
      ],
      [
        `${ genericLog.compactLayout === true ? " " : "\n" }${ genericLog.description }`,
        { foregroundColor: mainColor }
      ],

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
      ...("additionalData" in genericLog ? [
        [
          `\n\n${ ConsoleApplicationLogger.localization.appendedData }:`,
          { bold: true, foregroundColor: mainColor }
        ],
        [
          `\n${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`,
          { foregroundColor: mainColor }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData

    ]);
  }

  public static generateBadgeIfMust(
    badge: Readonly<{ customText: string; }> | false | undefined,
    {
      defaultText,
      foregroundColor,
      backgroundColor
    }: Readonly<{
      defaultText: string;
      foregroundColor: ConsoleApplicationLogger.RedGreenBlue;
      backgroundColor: ConsoleApplicationLogger.RedGreenBlue;
    }>
  ): [ string | null, ConsoleApplicationLogger.Formatting ] {
    return [
      badge === false ? null : ` ${ badge?.customText ?? defaultText } `,
      {
        bold: true,
        foregroundColor,
        backgroundColor
      }
    ];
  }


  /* ━━━ Auxiliaries ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
     https://stackoverflow.com/a/33206814/4818123 */
  public static generateConsoleMethodParametersForFormattedOutput(
    formattedOutputData: ConsoleApplicationLogger.FormattedOutputData
  ): Array<string> {

    const logsTextings: Array<string> = [];
    const templatesWithFormattings: Array<string> = [];

    for (const singleFormattedOutputData of formattedOutputData) {

      if (isNull(singleFormattedOutputData[0])) {
        continue;
      }


      let templateWithFormatting: string = "";

      const formatting: ConsoleApplicationLogger.Formatting = singleFormattedOutputData[1];

      switch (formatting.foregroundColor) {
        case ConsoleApplicationLogger.FourBitColours.black: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[30m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.red: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[31m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.green: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[32m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.yellow: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[33m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.blue: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[34m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.magenta: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[35m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.cyan: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[36m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.white: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[37m`;
          break;
        }

        default: {

          if (ConsoleApplicationLogger.isRegGreenBlue(formatting.foregroundColor)) {
            templateWithFormatting = `${ templateWithFormatting }${
              ConsoleApplicationLogger.generateRedGreenBlueForegroundColorControlSequence(formatting.foregroundColor)
            }`;
          }

        }
      }

      switch (formatting.backgroundColor) {
        case ConsoleApplicationLogger.FourBitColours.black: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[40m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.red: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[41m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.green: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[42m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.yellow: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[43m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.blue: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[44m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.magenta: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[45m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.cyan: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[46m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.white: {
          templateWithFormatting = `${ templateWithFormatting }\x1b[47m`;
          break;
        }

        default: {

          if (ConsoleApplicationLogger.isRegGreenBlue(formatting.backgroundColor)) {
            templateWithFormatting = `${ templateWithFormatting }${
              ConsoleApplicationLogger.generateRedGreenBlueBackgroundColorControlSequence(formatting.backgroundColor)
            }`;
          }

        }
      }

      if (formatting.bold === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[1m`;
      }

      if (formatting.underlined === true || formatting.underscore === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[4m`;
      }

      if (formatting.bright === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[1m`;
      }

      if (formatting.dim === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[2m`;
      }

      if (formatting.blink === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[5m`;
      }

      if (formatting.reverse === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[7m`;
      }

      if (formatting.hidden === true) {
        templateWithFormatting = `${ templateWithFormatting }\x1b[8m`;
      }

      logsTextings.push(singleFormattedOutputData[0]);
      templatesWithFormattings.push(templateWithFormatting);

    }

    return [ `${ templatesWithFormattings.join("%s\x1b[0m") }%s\x1b[0m` ].concat(logsTextings);

  }

  /* [ Reference ]　https://note.affi-sapo-sv.com/nodejs-console-color-output.php */
  public static generateRedGreenBlueForegroundColorControlSequence(
    colorDefinition: ConsoleApplicationLogger.RedGreenBlue
  ): string {
    return `\x1b[38;2;${ colorDefinition.red };${ colorDefinition.green };${ colorDefinition.blue }m`;
  }

  public static generateRedGreenBlueBackgroundColorControlSequence(
    colorDefinition: ConsoleApplicationLogger.RedGreenBlue
  ): string {
    return `\x1b[48;2;${ colorDefinition.red };${ colorDefinition.green };${ colorDefinition.blue }m`;
  }

}


namespace ConsoleApplicationLogger {

  export type FormattedOutputData = Array<[ string | null, Formatting ]>;

  export type Formatting = {
    foregroundColor?: FourBitColours | RedGreenBlue;
    bold?: boolean;
    bright?: boolean;
    dim?: boolean;
    underscore?: boolean;
    blink?: boolean;
    reverse?: boolean;
    hidden?: boolean;
    underlined?: boolean;
    backgroundColor?: FourBitColours | RedGreenBlue;
  };

  export enum FourBitColours {
    black = "BLACK",
    white = "WHITE",
    red = "RED",
    green = "GREEN",
    blue = "BLUE",
    yellow = "YELLOW",
    magenta = "MAGENTA",
    cyan = "CYAN"
  }


  export type RedGreenBlue = {
    red: number;
    green: number;
    blue: number;
  };

  export function isRegGreenBlue(rawValue: unknown): rawValue is RedGreenBlue {
    return isArbitraryObject(rawValue) &&
        isNonNegativeInteger(rawValue.red) &&
        isNonNegativeInteger(rawValue.green) &&
        isNonNegativeInteger(rawValue.blue);
  }
}


export default ConsoleApplicationLogger;

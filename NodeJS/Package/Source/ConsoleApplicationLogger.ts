import {
  ErrorLog,
  ThrownErrorLog,
  InfoLog,
  SuccessLog,
  WarningLog,
  Log,
  Logger,
  LoggerLocalization__English,
  stringifyAndFormatArbitraryValue,
  isArbitraryObject,
  isNonNegativeInteger,
  insertSubstringIf,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


abstract class ConsoleApplicationLogger {

  private static localization: Logger.Localization = LoggerLocalization__English;

  public static setLocalization(localization: Logger.Localization): typeof ConsoleApplicationLogger {
    ConsoleApplicationLogger.localization = localization;
    return ConsoleApplicationLogger;
  }


  public static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never {

    if ("errorInstance" in errorLog) {

      errorLog.errorInstance.message = `${errorLog.title}\n${errorLog.errorInstance.message}` +
          `\n\n${ConsoleApplicationLogger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
          `${insertSubstringIf(
              `\n\n${ConsoleApplicationLogger.localization.wrappableError}:` +
              `\n${stringifyAndFormatArbitraryValue(errorLog.wrappableError)}`,
              isNotUndefined(errorLog.wrappableError)
          )}` +
          `${insertSubstringIf(
              `\n\n${ConsoleApplicationLogger.localization.appendedData}:` +
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
    console.error(...ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([
      [
        ` ${errorLog.customBadgeText ?? ConsoleApplicationLogger.localization.badgesDefaultTitles.error} `,
        {
          bold: true,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 192, green: 57, blue: 43 }
        }
      ],
      [
        ` ${errorLog.title}\n`,
        {
          bold: true,
          foregroundColor: { red: 192, green: 57, blue: 43 }
        }
      ],
      [
        `${errorLog.description}`,
        {
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],
      [
        `\n\n${ConsoleApplicationLogger.localization.errorType}: `,
        {
          bold: true,
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],
      [
        `${errorLog.errorType}`,
        {
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],

      [
        `\n${ConsoleApplicationLogger.localization.occurrenceLocation}: `,
        {
          bold: true,
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],
      [
        `${errorLog.occurrenceLocation}: `,
        {
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],
      /* 〔 Theory 〕 The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("caughtError" in errorLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.caughtError}:`,
          {
            bold: true,
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ],
        [
          errorLog.caughtError instanceof Error ? `\n${errorLog.caughtError.stack}` :
          `\n${stringifyAndFormatArbitraryValue(errorLog.caughtError)}`,
          {
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData,
      ...("additionalData" in errorLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.appendedData}:`,
          {
            bold: true,
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ],
        [
          `\n${stringifyAndFormatArbitraryValue(errorLog.additionalData)}`,
          {
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData
    ]));
  }

  public static logErrorLikeMessage(errorLikeLog: Log): void {
    console.error(...ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([
      [
        ` ${errorLikeLog.customBadgeText ?? ConsoleApplicationLogger.localization.badgesDefaultTitles.error} `,
        {
          bold: true,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 192, green: 57, blue: 43 }
        }
      ],
      [
        ` ${errorLikeLog.title}\n`,
        {
          bold: true,
          foregroundColor: { red: 192, green: 57, blue: 43 }
        }
      ],
      [
        `${errorLikeLog.description}`,
        {
          foregroundColor: { red: 231, green: 76, blue: 60 }
        }
      ],


      /* 〔 Theory 〕 The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("additionalData" in errorLikeLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.appendedData}:`,
          {
            bold: true,
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ],
        [
          `\n${stringifyAndFormatArbitraryValue(errorLikeLog.additionalData)}`,
          {
            foregroundColor: { red: 231, green: 76, blue: 60 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData
    ]));
  }

  public static logWarning(warningLog: WarningLog): void {
    console.warn(...ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([
      [
        ` ${warningLog.customBadgeText ?? ConsoleApplicationLogger.localization.badgesDefaultTitles.warning} `,
        {
          bold: true,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 211, green: 84, blue: 0 }
        }
      ],
      [
        ` ${warningLog.title}\n`,
        {
          bold: true,
          foregroundColor: { red: 211, green: 84, blue: 0 }
        }
      ],
      [
        `${warningLog.description}`,
        {
          foregroundColor: { red: 230, green: 126, blue: 34 }
        }
      ],
      ...("occurrenceLocation" in warningLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.occurrenceLocation}: `,
          {
            bold: true,
            foregroundColor: { red: 230, green: 126, blue: 34 }
          }
        ],
        [
          `${warningLog.occurrenceLocation}`,
          {
            foregroundColor: { red: 230, green: 126, blue: 34 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData,
      ...("additionalData" in warningLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.appendedData}:`,
          {
            "font-weight": "bold",
            foregroundColor: { red: 230, green: 126, blue: 34 }
          }
        ],
        [
          `\n${stringifyAndFormatArbitraryValue(warningLog.additionalData)}`,
          {
            foregroundColor: { red: 230, green: 126, blue: 34 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData
    ]));
  }

  public static logSuccess(successLog: SuccessLog): void {
    console.log(...ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([
      [
        ` ${successLog.customBadgeText ?? ConsoleApplicationLogger.localization.badgesDefaultTitles.success} `,
        {
          bold: true,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 39, green: 174, blue: 96 }
        }
      ],
      [
        ` ${successLog.title}\n`,
        {
          bold: true,
          foregroundColor: { red: 39, green: 174, blue: 96 }
        }
      ],
      [
        `${successLog.description}`,
        {
          foregroundColor: { red: 46, green: 204, blue: 113 }
        }
      ],
      ...("additionalData" in successLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.appendedData}:`,
          {
            bold: true,
            foregroundColor: { red: 46, green: 204, blue: 113 }
          }
        ],
        [
          `\n${stringifyAndFormatArbitraryValue(successLog.additionalData)}`,
          {
            foregroundColor: { red: 46, green: 204, blue: 113 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData
    ]));
  }

  public static logInfo(infoLog: InfoLog): void {
    console.log(...ConsoleApplicationLogger.generateConsoleMethodParametersForFormattedOutput([
      [
        ` ${infoLog.customBadgeText ?? ConsoleApplicationLogger.localization.badgesDefaultTitles.info} `,
        {
          bold: true,
          foregroundColor: { red: 255, green: 255, blue: 255 },
          backgroundColor: { red: 41, green: 128, blue: 185 }
        }
      ],
      [
        ` ${infoLog.title}\n`,
        {
          foregroundColor: { red: 41, green: 128, blue: 185 },
          bold: true
        }
      ],
      [
        `${infoLog.description}`,
        {
          foregroundColor: { red: 52, green: 152, blue: 219 }
        }
      ],
      ...("additionalData" in infoLog ? [
        [
          `\n\n${ConsoleApplicationLogger.localization.appendedData}:`,
          {
            bold: true,
            foregroundColor: { red: 52, green: 152, blue: 219 }
          }
        ],
        [
          `\n${stringifyAndFormatArbitraryValue(infoLog.additionalData)}`,
          {
            foregroundColor: { red: 52, green: 152, blue: 219 }
          }
        ]
      ] : []) as ConsoleApplicationLogger.FormattedOutputData
    ]));
  }

  public static highlightText(targetString: string): string {
    return `\x1b[43m${targetString}\x1b[0m`;
  }

  // https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
  // https://stackoverflow.com/a/33206814/4818123
  public static generateConsoleMethodParametersForFormattedOutput(
    formattedOutputData: ConsoleApplicationLogger.FormattedOutputData
  ): Array<string> {

    const logsTextings: Array<string> = [];
    const templatesWithFormattings: Array<string> = [];

    for (const singleFormattedOutputData of formattedOutputData) {

      let templateWithFormatting: string = "";

      const formatting: ConsoleApplicationLogger.Formatting = singleFormattedOutputData[1];

      switch (formatting.foregroundColor) {
        case ConsoleApplicationLogger.FourBitColours.black: {
          templateWithFormatting = `${templateWithFormatting}\x1b[30m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.red: {
          templateWithFormatting = `${templateWithFormatting}\x1b[31m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.green: {
          templateWithFormatting = `${templateWithFormatting}\x1b[32m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.yellow: {
          templateWithFormatting = `${templateWithFormatting}\x1b[33m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.blue: {
          templateWithFormatting = `${templateWithFormatting}\x1b[34m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.magenta: {
          templateWithFormatting = `${templateWithFormatting}\x1b[35m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.cyan: {
          templateWithFormatting = `${templateWithFormatting}\x1b[36m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.white: {
          templateWithFormatting = `${templateWithFormatting}\x1b[37m`;
          break;
        }

        default: {

          if (ConsoleApplicationLogger.isRegGreenBlue(formatting.foregroundColor)) {
            templateWithFormatting = `${templateWithFormatting}${
              ConsoleApplicationLogger.generateRedGreenBlueForegroundColorControlSequence(formatting.foregroundColor)
            }`;
          }

        }
      }

      switch (formatting.backgroundColor) {
        case ConsoleApplicationLogger.FourBitColours.black: {
          templateWithFormatting = `${templateWithFormatting}\x1b[40m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.red: {
          templateWithFormatting = `${templateWithFormatting}\x1b[41m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.green: {
          templateWithFormatting = `${templateWithFormatting}\x1b[42m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.yellow: {
          templateWithFormatting = `${templateWithFormatting}\x1b[43m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.blue: {
          templateWithFormatting = `${templateWithFormatting}\x1b[44m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.magenta: {
          templateWithFormatting = `${templateWithFormatting}\x1b[45m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.cyan: {
          templateWithFormatting = `${templateWithFormatting}\x1b[46m`;
          break;
        }
        case ConsoleApplicationLogger.FourBitColours.white: {
          templateWithFormatting = `${templateWithFormatting}\x1b[47m`;
          break;
        }

        default: {

          if (ConsoleApplicationLogger.isRegGreenBlue(formatting.backgroundColor)) {
            templateWithFormatting = `${templateWithFormatting}${
              ConsoleApplicationLogger.generateRedGreenBlueBackgroundColorControlSequence(formatting.backgroundColor)
            }`;
          }

        }
      }

      if (formatting.bold === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[1m`;
      }

      if (formatting.underlined === true || formatting.underscore === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[4m`;
      }

      if (formatting.bright === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[1m`;
      }

      if (formatting.dim === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[2m`;
      }

      if (formatting.blink === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[5m`;
      }

      if (formatting.reverse === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[7m`;
      }

      if (formatting.hidden === true) {
        templateWithFormatting = `${templateWithFormatting}\x1b[8m`;
      }

      logsTextings.push(singleFormattedOutputData[0]);
      templatesWithFormattings.push(templateWithFormatting);
    }

    return [ `${templatesWithFormattings.join("%s\x1b[0m")}%s\x1b[0m` ].concat(logsTextings);
  }

  /* [ Reference ]　https://note.affi-sapo-sv.com/nodejs-console-color-output.php */
  public static generateRedGreenBlueForegroundColorControlSequence(
    colorDefinition: ConsoleApplicationLogger.RedGreenBlue
  ): string {
    return `\x1b[38;2;${colorDefinition.red};${colorDefinition.green};${colorDefinition.blue}m`;
  }

  public static generateRedGreenBlueBackgroundColorControlSequence(
    colorDefinition: ConsoleApplicationLogger.RedGreenBlue
  ): string {
    return `\x1b[48;2;${colorDefinition.red};${colorDefinition.green};${colorDefinition.blue}m`;
  }
}


namespace ConsoleApplicationLogger {

  export type FormattedOutputData = Array<[string, Formatting]>;

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

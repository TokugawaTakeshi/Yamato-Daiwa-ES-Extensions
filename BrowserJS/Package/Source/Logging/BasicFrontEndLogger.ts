/* eslint-disable no-console -- This class using native "console" because of its specialization. */

import {
  type Logger,
  type ErrorLog,
  type InfoLog,
  type SuccessLog,
  type WarningLog,
  type Log,
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  insertSubstringIf,
  stringifyAndFormatArbitraryValue,
  loggerLocalization__english
} from "@yamato-daiwa/es-extensions";


abstract class BasicFrontEndLogger {

  private static localization: Logger.Localization = loggerLocalization__english;

  public static setLocalization(localization: Logger.Localization): typeof BasicFrontEndLogger {
    BasicFrontEndLogger.localization = localization;
    return BasicFrontEndLogger;
  }


  /* ━━━ Logging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static logError(polymorphicPayload: ErrorLog | string): void {
    console.error(
      ...isString(polymorphicPayload) ? [ polymorphicPayload ] : BasicFrontEndLogger.formatErrorLog(polymorphicPayload)
    );
  }

  public static logErrorLikeMessage(polymorphicPayload: Log | string): void {
    console.error(
      ...isString(polymorphicPayload) ?
          [ polymorphicPayload ] :
          BasicFrontEndLogger.formatGenericLog({
            genericLog: polymorphicPayload,
            badgeContentAndFormatting: {
              defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.error,
              foregroundColor: "white",
              backgroundColor: "red"
            },
            mainColor: "red",
            titleColor: "red"
          })
    );
  }

  public static logWarning(polymorphicPayload: WarningLog | string): void {
    console.warn(
      ...isString(polymorphicPayload) ?
          [ polymorphicPayload ] :
          BasicFrontEndLogger.formatGenericLog({
            genericLog: polymorphicPayload,
            badgeContentAndFormatting: {
              defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.warning,
              foregroundColor: "white",
              backgroundColor: "orange"
            },
            mainColor: "orange",
            titleColor: "orange"
          })
    );
  }

  public static logInfo(polymorphicPayload: InfoLog | string): void {
    console.log(
      ...isString(polymorphicPayload) ?
          [ polymorphicPayload ] :
          BasicFrontEndLogger.formatGenericLog({
            genericLog: polymorphicPayload,
            badgeContentAndFormatting: {
              defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.success,
              foregroundColor: "white",
              backgroundColor: "dodgerblue"
            },
            mainColor: "dodgerblue",
            titleColor: "dodgerblue"
          })
    );
  }

  public static logSuccess(polymorphicPayload: SuccessLog | string): void {
    console.log(
      ...isString(polymorphicPayload) ?
          [ polymorphicPayload ] :
          BasicFrontEndLogger.formatGenericLog({
            genericLog: polymorphicPayload,
            badgeContentAndFormatting: {
              defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.success,
              foregroundColor: "white",
              backgroundColor: "mediumseagreen"
            },
            mainColor: "mediumseagreen",
            titleColor: "mediumseagreen"
          })
    );
  }

  public static logGeneric(polymorphicPayload: Log | string | number | boolean | null | undefined): void {
    console.log(
      ...isString(polymorphicPayload) ||
          isNumber(polymorphicPayload) ||
          isBoolean(polymorphicPayload) ||
          isNull(polymorphicPayload) ||
          isUndefined(polymorphicPayload) ?
              [ polymorphicPayload ] :
              BasicFrontEndLogger.formatGenericLog({
                genericLog: polymorphicPayload,
                badgeContentAndFormatting: {
                  defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.success,
                  foregroundColor: "white",
                  backgroundColor: "gray"
                },
                mainColor: "gray",
                titleColor: "gray"
              })
    );
  }


  /* ━━━ Formatters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static highlightText(targetString: string): string {
    return `\x1b[43m${ targetString }`;
  }

  public static formatErrorLog(errorLog: ErrorLog): Array<string> {
    return BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

      BasicFrontEndLogger.generateBadgeIfMust(
        errorLog.badge,
        {
          defaultText: BasicFrontEndLogger.localization.badgesDefaultTitles.error,
          foregroundColor: "white",
          backgroundColor: "red"
        }
      ),

      [
        `${ insertSubstringIf(" ", errorLog.badge !== false) }${ errorLog.title }`,
        { "font-weight": "bold", color: "red" }
      ],
      [
        `${ errorLog.compactLayout === true ? " " : "\n" }${ errorLog.description }`,
        { color: "red" }
      ],

      [
        `\n\n${ BasicFrontEndLogger.localization.errorType }: `,
        { "font-weight": "bold", color: "red" }
      ],
      [
        errorLog.errorType,
        { color: "red" }
      ],

      [
        `\n${ BasicFrontEndLogger.localization.occurrenceLocation }: `,
        { "font-weight": "bold", color: "red" }
      ],
      [
        errorLog.occurrenceLocation,
        { color: "red" }
      ],

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ※
       * The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
       * type can/doest not be "matched" with function's parameter's types.
       * https://stackoverflow.com/a/67015118/4818123 */
      ...("caughtError" in errorLog ? [
        [
          `\n\n${ BasicFrontEndLogger.localization.caughtError }:`,
          { "font-weight": "bold", color: "red" }
        ],
        [
          errorLog.caughtError instanceof Error ?
              `\n${ errorLog.caughtError.toString() }\n${ errorLog.caughtError.stack }` :
              `\n${ stringifyAndFormatArbitraryValue(errorLog.caughtError) }`,
          { color: "red" }
        ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData,

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
      ...("additionalData" in errorLog ? [
        [
          `\n\n${ BasicFrontEndLogger.localization.appendedData }:`,
          { "font-weight": "bold", color: "red" }
        ],
        [
          `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`,
          { color: "red" }
        ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData

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
        foregroundColor: string;
        backgroundColor: string;
      }>;
      mainColor: string;
      titleColor: string;
    }>
  ): Array<string> {
    return BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

      BasicFrontEndLogger.generateBadgeIfMust(genericLog.badge, badgeContentAndFormatting),

      [
        `${ insertSubstringIf(" ", genericLog.badge !== false) }${ genericLog.title }`,
        { "font-weight": "bold", color: titleColor }
      ],
      [
        `${ genericLog.compactLayout === true ? " " : "\n" }${ genericLog.description }`,
        { color: mainColor }
      ],

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
      ...("additionalData" in genericLog ? [
        [
          `\n\n${ BasicFrontEndLogger.localization.appendedData }:`,
          { "font-weight": "bold", color: mainColor }
        ],
        [
          `\n${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`,
          { color: mainColor }
        ]
      ] : []) as BasicFrontEndLogger.FormattedOutputData

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
      foregroundColor: string;
      backgroundColor: string;
    }>
  ): [ string | null, { [CSS_Key: string]: string; } ] {
    return [
      badge === false ? null : ` ${ badge?.customText ?? defaultText } `,
      { "font-weight": "bold", "border-radius": "4px", color: foregroundColor, background: backgroundColor }
    ];
  }


  /* ━━━ Auxiliaries ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static generateConsoleMethodParametersForFormattedOutput(
    formattedOutputData: BasicFrontEndLogger.FormattedOutputData
  ): Array<string> {

    const outputContent: Array<string> = [];
    const CSS_DeclarationsForEachContent: Array<string> = [];

    for (const singleFormattedOutputData of formattedOutputData) {

      if (isNull(singleFormattedOutputData[0])) {
        continue;
      }


      outputContent.push(`%c${ singleFormattedOutputData[0] }`);

      let CSS_Declarations: string = "";

      for (const [ CSS_Key, CSS_Value ] of Object.entries(singleFormattedOutputData[1])) {
        CSS_Declarations = `${ CSS_Declarations }${ CSS_Key }: ${ CSS_Value };`;
      }

      CSS_DeclarationsForEachContent.push(CSS_Declarations);

    }

    return [ outputContent.join(""), ...CSS_DeclarationsForEachContent ];
  }

}


namespace BasicFrontEndLogger {
  export type FormattedOutputData = Array<[string | null, { [CSS_Key: string]: string; }]>;
}


export default BasicFrontEndLogger;

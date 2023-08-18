/* eslint-disable no-console -- This class is wrapping the 'console' allowing to avoid of direct 'console' usage. */

import {
  stringifyAndFormatArbitraryValue,
  insertSubstringIf,
  isNull,
  loggerLocalization__english
} from "@yamato-daiwa/es-extensions";
import type {
  ErrorLog,
  InfoLog,
  SuccessLog,
  WarningLog,
  Log,
  Logger
} from "@yamato-daiwa/es-extensions";


abstract class BasicFrontEndLogger {

  private static localization: Logger.Localization = loggerLocalization__english;

  public static setLocalization(localization: Logger.Localization): typeof BasicFrontEndLogger {
    BasicFrontEndLogger.localization = localization;
    return BasicFrontEndLogger;
  }

  /* ━━━ Logging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static logError(errorLog: ErrorLog): void {
    console.error(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

        [
          errorLog.badge === false ?
              null : ` ${ errorLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.error } `,
          { "font-weight": "bold", "border-radius": "4px", background: "red", color: "white" }
        ],

        [
          `${ insertSubstringIf(" ", errorLog.badge !== false) }${ errorLog.title }`,
          { color: "red", "font-weight": "bold" }
        ],
        [ `${ errorLog.compactLayout === true ? " " : "\n" }${ errorLog.description }`, { color: "red" } ],

        [ `\n\n${ BasicFrontEndLogger.localization.errorType }: `, { "font-weight": "bold", color: "red" } ],
        [ `${ errorLog.errorType }`, { color: "red" } ],

        [ `\n${ BasicFrontEndLogger.localization.occurrenceLocation }: `, { "font-weight": "bold", color: "red" } ],
        [ `${ errorLog.occurrenceLocation }`, { color: "red" } ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ※
         * The 'as' assertion required because the expression is not calculated at compile time, so it's resultant
         * type can/doest not be "matched" with function's parameter's types.
         * https://stackoverflow.com/a/67015118/4818123 */
        ...("caughtError" in errorLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.caughtError }:`, { "font-weight": "bold", color: "red" } ],
          [
            errorLog.caughtError instanceof Error ? `\n${ errorLog.caughtError.stack }` :
                `\n${ stringifyAndFormatArbitraryValue(errorLog.caughtError) }`,
            { color: "red" }
          ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData,

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in errorLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold", color: "red" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(errorLog.additionalData) }`, { color: "red" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }

  public static logErrorLikeMessage(errorLikeLog: Log): void {
    console.error(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

        [
          errorLikeLog.badge === false ?
              null : ` ${ errorLikeLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.error } `,
          { "font-weight": "bold", "border-radius": "4px", background: "red", color: "white" }
        ],

        [
          `${ insertSubstringIf(" ", errorLikeLog.badge !== false) }${ errorLikeLog.title }`,
          { color: "red", "font-weight": "bold" }
        ],
        [ `${ errorLikeLog.compactLayout === true ? " " : "\n" }${ errorLikeLog.description }`, { color: "red" } ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in errorLikeLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold", color: "red" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(errorLikeLog.additionalData) }`, { color: "red" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }

  public static logWarning(warningLog: WarningLog): void {
    console.warn(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

        [
          warningLog.badge === false ?
              null : ` ${ warningLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.warning } `,
          { "font-weight": "bold", "border-radius": "4px", background: "orange", color: "white" }
        ],

        [
          `${ insertSubstringIf(" ", warningLog.badge !== false) }${ warningLog.title }`,
          { color: "orange", "font-weight": "bold" }
        ],
        [ `${ warningLog.compactLayout === true ? " " : "\n" }${ warningLog.description }`, { color: "orange" } ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("occurrenceLocation" in warningLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.occurrenceLocation }: `, { "font-weight": "bold", color: "orange" } ],
          [ `${ warningLog.occurrenceLocation }`, { color: "orange" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData,

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in warningLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold", color: "orange" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(warningLog.additionalData) }`, { color: "orange" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }

  public static logSuccess(successLog: SuccessLog): void {
    console.log(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

         [
          successLog.badge === false ?
              null : ` ${ successLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.success } `,
          { "font-weight": "bold", "border-radius": "4px", background: "mediumseagreen", color: "white" }
        ],

        [
          `${ insertSubstringIf(" ", successLog.badge !== false) }${ successLog.title }`,
          { color: "mediumseagreen", "font-weight": "bold" }
        ],
        [ `${ successLog.compactLayout === true ? " " : "\n" }${ successLog.description }`, { color: "mediumseagreen" } ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in successLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold", color: "mediumseagreen" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(successLog.additionalData) }`, { color: "mediumseagreen" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }

  public static logInfo(infoLog: InfoLog): void {
    console.log(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

        [
          infoLog.badge === false ?
              null : ` ${ infoLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.success } `,
          { "font-weight": "bold", "border-radius": "4px", background: "dodgerblue", color: "white" }
        ],

        [
          `${ insertSubstringIf(" ", infoLog.badge !== false) }${ infoLog.title }`,
          { color: "dodgerblue", "font-weight": "bold" }
        ],
        [ `${ infoLog.compactLayout === true ? " " : "\n" }${ infoLog.description }`, { color: "dodgerblue" } ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in infoLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold", color: "dodgerblue" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(infoLog.additionalData) }`, { color: "dodgerblue" } ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }

  public static logGeneric(genericLog: Log): void {
    console.log(
      ...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([

        [
          genericLog.badge === false ?
              null : ` ${ genericLog.badge?.customText ?? BasicFrontEndLogger.localization.badgesDefaultTitles.success } `,
          { "font-weight": "bold", "border-radius": "4px", background: "silver", color: "gray" }
        ],

        [
          `${ insertSubstringIf(" ", genericLog.badge !== false) }${ genericLog.title }`,
          { "font-weight": "bold" }
        ],
        [ `${ genericLog.compactLayout === true ? " " : "\n" }${ genericLog.description }`, {} ],

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※ */
        ...("additionalData" in genericLog ? [
          [ `\n\n${ BasicFrontEndLogger.localization.appendedData }:`, { "font-weight": "bold" } ],
          [ `\n${ stringifyAndFormatArbitraryValue(genericLog.additionalData) }`, {} ]
        ] : []) as BasicFrontEndLogger.FormattedOutputData

      ])
    );
  }


  /* ━━━ Auxiliaries ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static highlightText(targetString: string): string {
    return `\x1b[43m${ targetString }`;
  }

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

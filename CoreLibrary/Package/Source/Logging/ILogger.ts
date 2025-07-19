import type { Log, ErrorLog, InfoLog, SuccessLog, ThrownErrorLog, WarningLog } from "./Logs";


interface ILogger {

  readonly throwErrorWithFormattedMessage?: <CustomError extends Error = Error>(
    polymorphicPayload: Error | ThrownErrorLog<CustomError>,
    options?: ILogger.ThrowingErrorWithFormattedMessage.Options
  ) => never;

  readonly throwErrorAndLog?: <CustomError extends Error = Error>(
    polymorphicPayload: Error | ThrownErrorLog<CustomError>
  ) => never;

  readonly logError: (polymorphicPayload: ErrorLog | string) => void;
  readonly logErrorLikeMessage: (polymorphicPayload: Log | string) => void;

  readonly logWarning: (polymorphicPayload: WarningLog | string) => void;

  readonly logInfo: (polymorphicPayload: InfoLog | string) => void;
  readonly logSuccess: (polymorphicPayload: SuccessLog | string) => void;

  readonly logDebug: (polymorphicPayload: Log | string | number | boolean | null | undefined) => void;
  readonly logGeneric: (polymorphicPayload: Log | string | number | boolean | null | undefined) => void;

  readonly highlightText: (targetString: string) => string;

  readonly logPromiseError?: (error: unknown) => void;

}


namespace ILogger {

  export namespace ThrowingErrorWithFormattedMessage {

    export type Options = Readonly<{
      mustLogErrorBeforeThrowing?: boolean;
    }>;

  }

}


export default ILogger;

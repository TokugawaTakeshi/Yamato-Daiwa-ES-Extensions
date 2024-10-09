import type { Log, ErrorLog, InfoLog, SuccessLog, ThrownErrorLog, WarningLog } from "./Logs";


export interface ILogger {

  readonly throwErrorAndLog?: <CustomError extends Error = Error>(
    polymorphicPayload: Error | ThrownErrorLog<CustomError>
  ) => never;

  readonly logError: (polymorphicPayload: ErrorLog | string) => void;
  readonly logErrorLikeMessage: (polymorphicPayload: Log | string) => void;

  readonly logWarning: (polymorphicPayload: WarningLog | string) => void;

  readonly logInfo: (polymorphicPayload: InfoLog | string) => void;
  readonly logSuccess: (polymorphicPayload: SuccessLog | string) => void;

  readonly logGeneric: (polymorphicPayload: Log | string | number | boolean | null | undefined) => void;

  readonly highlightText: (targetString: string) => string;

  readonly logPromiseError?: (error: unknown) => void;

}

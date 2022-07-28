import type { Log, ErrorLog, InfoLog, SuccessLog, ThrownErrorLog, WarningLog } from "./Logs";


export interface ILogger {

  readonly throwErrorAndLog: <CustomError extends Error = Error>(errorLog: ThrownErrorLog<CustomError>) => never;
  readonly logError: (errorLog: ErrorLog) => void;
  readonly logErrorLikeMessage: (errorLikeLog: Log) => void;

  readonly logWarning: (warningLog: WarningLog) => void;

  readonly logSuccess: (successLog: SuccessLog) => void;
  readonly logInfo: (infoLog: InfoLog) => void;

  readonly highlightText: (targetString: string) => string;
}

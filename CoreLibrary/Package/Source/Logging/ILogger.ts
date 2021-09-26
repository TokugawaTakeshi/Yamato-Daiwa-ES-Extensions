import { Log, ErrorLog, InfoLog, SuccessLog, ThrownErrorLog, WarningLog } from "./Logs";


export interface ILogger {

  throwErrorAndLog: <CustomError extends Error = Error>(errorLog: ThrownErrorLog<CustomError>) => never;
  logError: (errorLog: ErrorLog) => void;
  logErrorLikeMessage: (errorLikeLog: Log) => void;

  logWarning: (warningLog: WarningLog) => void;

  logSuccess: (successLog: SuccessLog) => void;
  logInfo: (infoLog: InfoLog) => void;

  highlightText: (targetString: string) => string;
}

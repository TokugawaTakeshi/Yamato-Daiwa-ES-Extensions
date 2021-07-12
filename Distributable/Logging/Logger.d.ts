import { Log, ErrorLog, ThrownErrorLog, WarningLog, InfoLog, SuccessLog } from "./Logs";
import { ILogger } from "./ILogger";
declare abstract class Logger {
    private static implementation;
    private static localization;
    static setImplementation(implementation: ILogger): typeof Logger;
    static setLocalization(localization: Logger.Localization): typeof Logger;
    static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never;
    static logError(errorLog: ErrorLog): void;
    static logErrorLikeMessage(errorLikeLog: Log): void;
    static logWarning(warningLog: WarningLog): void;
    static logInfo(infoLog: InfoLog): void;
    static logSuccess(successLog: SuccessLog): void;
    static highlightText(targetString: string): string;
    private static formatGenericLog;
}
declare namespace Logger {
    type Localization = {
        badgesDefaultTitles: {
            error: string;
            warning: string;
            info: string;
            success: string;
        };
        errorType: string;
        occurrenceLocation: string;
        caughtError: string;
        wrappableError: string;
        appendedData: string;
    };
}
export default Logger;

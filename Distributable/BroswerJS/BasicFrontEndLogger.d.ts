import { ErrorLog, ThrownErrorLog, InfoLog, SuccessLog, WarningLog, Log } from "../Logging/Logs";
import Logger from "../Logging/Logger";
declare abstract class BasicFrontEndLogger {
    private static localization;
    static setLocalization(localization: Logger.Localization): typeof BasicFrontEndLogger;
    static throwErrorAndLog<CustomError extends Error>(errorLog: ThrownErrorLog<CustomError>): never;
    static logError(errorLog: ErrorLog): void;
    static logErrorLikeMessage(errorLikeLog: Log): void;
    static logWarning(warningLog: WarningLog): void;
    static logSuccess(successLog: SuccessLog): void;
    static logInfo(infoLog: InfoLog): void;
    static highlightText(targetString: string): string;
    static generateConsoleMethodParametersForFormattedOutput(formattedOutputData: BasicFrontEndLogger.FormattedOutputData): Array<string>;
}
declare namespace BasicFrontEndLogger {
    type FormattedOutputData = Array<[string, {
        [CSS_Key: string]: string;
    }]>;
}
export default BasicFrontEndLogger;

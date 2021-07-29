import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import substituteWhenUndefined from "../DefaultValueSubstituters/substituteWhenUndefined";
import insertSubstringIf from "../Strings/insertSubstringIf";
import stringifyAndFormatUnknownAtAdvanceEntity from "../Strings/stringifyAndFormatUnknownAtAdvanceEntity";
import LoggerLocalization__English from "./LoggerLocalization__English";
class Logger {
    static setImplementation(implementation) {
        Logger.implementation = implementation;
        return Logger;
    }
    static setLocalization(localization) {
        Logger.localization = localization;
        return Logger;
    }
    static throwErrorAndLog(errorLog) {
        if (isNotNull(Logger.implementation)) {
            return Logger.implementation.throwErrorAndLog(errorLog);
        }
        if ("errorInstance" in errorLog) {
            errorLog.errorInstance.message = `${errorLog.title}\n${errorLog.errorInstance.message}` +
                `\n\n${Logger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
                `${insertSubstringIf(`\n\n${Logger.localization.wrappableError}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity(errorLog.wrappableError)}`, isNotUndefined(errorLog.wrappableError))}` +
                `${insertSubstringIf(`\n\n${Logger.localization.appendedData}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity(errorLog.additionalData)}`, isNotUndefined(errorLog.additionalData))}` +
                "\n";
            throw errorLog.errorInstance;
        }
        const errorWillBeThrown = new Error(errorLog.description);
        errorWillBeThrown.name = errorLog.errorType;
        throw errorWillBeThrown;
    }
    static logError(errorLog) {
        if (isNotNull(Logger.implementation)) {
            Logger.implementation.logError(errorLog);
            return;
        }
        console.error(`[ ${substituteWhenUndefined(errorLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${errorLog.title}\n` +
            `${errorLog.description}` +
            `\n\n${Logger.localization.errorType}: ${errorLog.errorType}` +
            `\n${Logger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
            `${insertSubstringIf(`\n\n${Logger.localization.caughtError}:` +
                `\n${stringifyAndFormatUnknownAtAdvanceEntity(errorLog.caughtError)}` +
                `${errorLog.caughtError instanceof Error ? `\n${errorLog.caughtError.stack}` : ""}`, isNotUndefined(errorLog.caughtError))}` +
            `${insertSubstringIf(`\n\n${Logger.localization.appendedData}:` +
                `\n${stringifyAndFormatUnknownAtAdvanceEntity(errorLog.additionalData)}`, isNotUndefined(errorLog.additionalData))}`);
    }
    static logErrorLikeMessage(errorLikeLog) {
        if (isNotNull(Logger.implementation)) {
            Logger.implementation.logErrorLikeMessage(errorLikeLog);
            return;
        }
        console.error(Logger.formatGenericLog(errorLikeLog));
    }
    static logWarning(warningLog) {
        if (isNotNull(Logger.implementation)) {
            Logger.implementation.logWarning(warningLog);
            return;
        }
        console.warn(`[ ${substituteWhenUndefined(warningLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${warningLog.title}\n` +
            `${warningLog.description}` +
            `\n\n${insertSubstringIf(`${Logger.localization.occurrenceLocation}: ${warningLog.occurrenceLocation}`, isNotUndefined(warningLog.occurrenceLocation))}` +
            `\n\n${insertSubstringIf(`${Logger.localization.appendedData}: ${stringifyAndFormatUnknownAtAdvanceEntity(warningLog.additionalData)}`, isNotUndefined(warningLog.additionalData))}`);
    }
    static logInfo(infoLog) {
        if (isNotNull(Logger.implementation)) {
            Logger.implementation.logInfo(infoLog);
            return;
        }
        console.info(Logger.formatGenericLog(infoLog));
    }
    static logSuccess(successLog) {
        if (isNotNull(Logger.implementation)) {
            Logger.implementation.logSuccess(successLog);
            return;
        }
        console.info(Logger.formatGenericLog(successLog));
    }
    static highlightText(targetString) {
        if (isNotNull(Logger.implementation)) {
            return Logger.implementation.highlightText(targetString);
        }
        return targetString;
    }
    static formatGenericLog(genericLog) {
        return `[ ${substituteWhenUndefined(genericLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${genericLog.title}\n` +
            `${genericLog.description}` +
            `\n\n${insertSubstringIf(`${Logger.localization.appendedData}: ${stringifyAndFormatUnknownAtAdvanceEntity(genericLog.additionalData)}`, isNotUndefined(genericLog.additionalData))}`;
    }
}
Logger.implementation = null;
Logger.localization = LoggerLocalization__English;
export default Logger;

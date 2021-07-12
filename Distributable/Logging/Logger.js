"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNotNull_1 = require("../TypeGuards/Nullables/isNotNull");
const isNotUndefined_1 = require("../TypeGuards/Nullables/isNotUndefined");
const substituteWhenUndefined_1 = require("../DefaultValueSubstituters/substituteWhenUndefined");
const insertSubstringIf_1 = require("../Strings/insertSubstringIf");
const stringifyAndFormatUnknownAtAdvanceEntity_1 = require("../Strings/stringifyAndFormatUnknownAtAdvanceEntity");
const LoggerLocalization__English_1 = require("./LoggerLocalization__English");
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
        if (isNotNull_1.default(Logger.implementation)) {
            return Logger.implementation.throwErrorAndLog(errorLog);
        }
        if ("errorInstance" in errorLog) {
            errorLog.errorInstance.message = `${errorLog.title}\n${errorLog.errorInstance.message}` +
                `\n\n${Logger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
                `${insertSubstringIf_1.default(`\n\n${Logger.localization.wrappableError}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.wrappableError)}`, isNotUndefined_1.default(errorLog.wrappableError))}` +
                `${insertSubstringIf_1.default(`\n\n${Logger.localization.appendedData}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.additionalData)}`, isNotUndefined_1.default(errorLog.additionalData))}` +
                "\n";
            throw errorLog.errorInstance;
        }
        const errorWillBeThrown = new Error(errorLog.description);
        errorWillBeThrown.name = errorLog.errorType;
        throw errorWillBeThrown;
    }
    static logError(errorLog) {
        if (isNotNull_1.default(Logger.implementation)) {
            Logger.implementation.logError(errorLog);
            return;
        }
        console.error(`[ ${substituteWhenUndefined_1.default(errorLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${errorLog.title}\n` +
            `${errorLog.description}` +
            `\n\n${Logger.localization.errorType}: ${errorLog.errorType}` +
            `\n${Logger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
            `${insertSubstringIf_1.default(`\n\n${Logger.localization.caughtError}:` +
                `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.caughtError)}` +
                `${errorLog.caughtError instanceof Error ? `\n${errorLog.caughtError.stack}` : ""}`, isNotUndefined_1.default(errorLog.caughtError))}` +
            `${insertSubstringIf_1.default(`\n\n${Logger.localization.appendedData}:` +
                `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.additionalData)}`, isNotUndefined_1.default(errorLog.additionalData))}`);
    }
    static logErrorLikeMessage(errorLikeLog) {
        if (isNotNull_1.default(Logger.implementation)) {
            Logger.implementation.logErrorLikeMessage(errorLikeLog);
            return;
        }
        console.error(Logger.formatGenericLog(errorLikeLog));
    }
    static logWarning(warningLog) {
        if (isNotNull_1.default(Logger.implementation)) {
            Logger.implementation.logWarning(warningLog);
            return;
        }
        console.warn(`[ ${substituteWhenUndefined_1.default(warningLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${warningLog.title}\n` +
            `${warningLog.description}` +
            `\n\n${insertSubstringIf_1.default(`${Logger.localization.occurrenceLocation}: ${warningLog.occurrenceLocation}`, isNotUndefined_1.default(warningLog.occurrenceLocation))}` +
            `\n\n${insertSubstringIf_1.default(`${Logger.localization.appendedData}: ${stringifyAndFormatUnknownAtAdvanceEntity_1.default(warningLog.additionalData)}`, isNotUndefined_1.default(warningLog.additionalData))}`);
    }
    static logInfo(infoLog) {
        if (isNotNull_1.default(Logger.implementation)) {
            Logger.implementation.logInfo(infoLog);
            return;
        }
        console.info(Logger.formatGenericLog(infoLog));
    }
    static logSuccess(successLog) {
        if (isNotNull_1.default(Logger.implementation)) {
            Logger.implementation.logSuccess(successLog);
            return;
        }
        console.info(Logger.formatGenericLog(successLog));
    }
    static highlightText(targetString) {
        if (isNotNull_1.default(Logger.implementation)) {
            return Logger.implementation.highlightText(targetString);
        }
        return targetString;
    }
    static formatGenericLog(genericLog) {
        return `[ ${substituteWhenUndefined_1.default(genericLog.customBadgeText, Logger.localization.badgesDefaultTitles.error)} ] ` +
            `${genericLog.title}\n` +
            `${genericLog.description}` +
            `\n\n${insertSubstringIf_1.default(`${Logger.localization.appendedData}: ${stringifyAndFormatUnknownAtAdvanceEntity_1.default(genericLog.additionalData)}`, isNotUndefined_1.default(genericLog.additionalData))}`;
    }
}
Logger.implementation = null;
Logger.localization = LoggerLocalization__English_1.default;
exports.default = Logger;

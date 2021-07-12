"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const substituteWhenUndefined_1 = require("../DefaultValueSubstituters/substituteWhenUndefined");
const stringifyAndFormatUnknownAtAdvanceEntity_1 = require("../Strings/stringifyAndFormatUnknownAtAdvanceEntity");
const insertSubstringIf_1 = require("../Strings/insertSubstringIf");
const isNotUndefined_1 = require("../TypeGuards/Nullables/isNotUndefined");
const LoggerLocalization__English_1 = require("../Logging/LoggerLocalization__English");
class BasicFrontEndLogger {
    static setLocalization(localization) {
        BasicFrontEndLogger.localization = localization;
        return BasicFrontEndLogger;
    }
    static throwErrorAndLog(errorLog) {
        if ("errorInstance" in errorLog) {
            errorLog.errorInstance.message = `${errorLog.title}\n${errorLog.errorInstance.message}` +
                `\n\n${BasicFrontEndLogger.localization.occurrenceLocation}: ${errorLog.occurrenceLocation}` +
                `${insertSubstringIf_1.default(`\n\n${BasicFrontEndLogger.localization.wrappableError}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.wrappableError)}`, isNotUndefined_1.default(errorLog.wrappableError))}` +
                `${insertSubstringIf_1.default(`\n\n${BasicFrontEndLogger.localization.appendedData}:` +
                    `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.additionalData)}`, isNotUndefined_1.default(errorLog.additionalData))}` +
                "\n";
            throw errorLog.errorInstance;
        }
        const errorWillBeThrown = new Error(errorLog.description);
        errorWillBeThrown.name = errorLog.errorType;
        throw errorWillBeThrown;
    }
    static logError(errorLog) {
        const badgeText = substituteWhenUndefined_1.default(errorLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.error);
        console.error(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
            [` ${badgeText} `, { background: "red", color: "white", "font-weight": "bold", "border-radius": "4px" }],
            [` ${errorLog.title}\n`, { color: "red", "font-weight": "bold" }],
            [`${errorLog.description}`, { color: "red" }],
            [`\n\n${BasicFrontEndLogger.localization.errorType}: `, { "font-weight": "bold", color: "red" }],
            [`${errorLog.errorType}`, { color: "red" }],
            [`\n${BasicFrontEndLogger.localization.occurrenceLocation}: `, { "font-weight": "bold", color: "red" }],
            [`${errorLog.occurrenceLocation}`, { color: "red" }],
            ...("caughtError" in errorLog ? [
                [`\n\n${BasicFrontEndLogger.localization.caughtError}:`, { "font-weight": "bold", color: "red" }],
                [
                    errorLog.caughtError instanceof Error ? `\n${errorLog.caughtError.stack}` :
                        `\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.caughtError)}`,
                    { color: "red" }
                ]
            ] : []),
            ...("additionalData" in errorLog ? [
                [`\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "red" }],
                [`\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLog.additionalData)}`, { color: "red" }]
            ] : [])
        ]));
    }
    static logErrorLikeMessage(errorLikeLog) {
        const badgeText = substituteWhenUndefined_1.default(errorLikeLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.error);
        console.error(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
            [` ${badgeText} `, { background: "red", color: "white", "font-weight": "bold", "border-radius": "4px" }],
            [` ${errorLikeLog.title}\n`, { color: "red", "font-weight": "bold" }],
            [`${errorLikeLog.description}`, { color: "red" }],
            ...("additionalData" in errorLikeLog ? [
                [`\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "red" }],
                [`\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(errorLikeLog.additionalData)}`, { color: "red" }]
            ] : [])
        ]));
    }
    static logWarning(warningLog) {
        const badgeText = substituteWhenUndefined_1.default(warningLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.error);
        console.warn(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
            [` ${badgeText} `, { background: "orange", color: "white", "font-weight": "bold", "border-radius": "4px" }],
            [` ${warningLog.title}\n`, { color: "orange", "font-weight": "bold" }],
            [`${warningLog.description}`, { color: "orange" }],
            ...("occurrenceLocation" in warningLog ? [
                [`\n\n${BasicFrontEndLogger.localization.occurrenceLocation}: `, { "font-weight": "bold", color: "orange" }],
                [`${warningLog.occurrenceLocation}`, { color: "orange" }]
            ] : []),
            ...("additionalData" in warningLog ? [
                [`\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "orange" }],
                [`\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(warningLog.additionalData)}`, { color: "orange" }]
            ] : [])
        ]));
    }
    static logSuccess(successLog) {
        const badgeText = substituteWhenUndefined_1.default(successLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.error);
        console.log(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
            [` ${badgeText} `, { background: "mediumseagreen", color: "white", "font-weight": "bold", "border-radius": "4px" }],
            [` ${successLog.title}\n`, { color: "mediumseagreen", "font-weight": "bold" }],
            [`${successLog.description}`, { color: "mediumseagreen" }],
            ...("additionalData" in successLog ? [
                [`\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "mediumseagreen" }],
                [`\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(successLog.additionalData)}`, { color: "mediumseagreen" }]
            ] : [])
        ]));
    }
    static logInfo(infoLog) {
        const badgeText = substituteWhenUndefined_1.default(infoLog.customBadgeText, BasicFrontEndLogger.localization.badgesDefaultTitles.error);
        console.log(...BasicFrontEndLogger.generateConsoleMethodParametersForFormattedOutput([
            [` ${badgeText} `, { background: "dodgerblue", color: "white", "font-weight": "bold", "border-radius": "4px" }],
            [` ${infoLog.title}\n`, { color: "dodgerblue", "font-weight": "bold" }],
            [`${infoLog.description}`, { color: "dodgerblue" }],
            ...("additionalData" in infoLog ? [
                [`\n\n${BasicFrontEndLogger.localization.appendedData}:`, { "font-weight": "bold", color: "dodgerblue" }],
                [`\n${stringifyAndFormatUnknownAtAdvanceEntity_1.default(infoLog.additionalData)}`, { color: "dodgerblue" }]
            ] : [])
        ]));
    }
    static highlightText(targetString) {
        return `\x1b[43m${targetString}`;
    }
    static generateConsoleMethodParametersForFormattedOutput(formattedOutputData) {
        const outputContents = [];
        const CSS_DeclarationsForEachContent = [];
        for (const singleFormattedOutputData of formattedOutputData) {
            outputContents.push(`%c${singleFormattedOutputData[0]}`);
            let CSS_Declarations = "";
            for (const [CSS_Key, CSS_Value] of Object.entries(singleFormattedOutputData[1])) {
                CSS_Declarations = `${CSS_Declarations}${CSS_Key}: ${CSS_Value};`;
            }
            CSS_DeclarationsForEachContent.push(CSS_Declarations);
        }
        return [outputContents.join(""), ...CSS_DeclarationsForEachContent];
    }
}
BasicFrontEndLogger.localization = LoggerLocalization__English_1.default;
exports.default = BasicFrontEndLogger;

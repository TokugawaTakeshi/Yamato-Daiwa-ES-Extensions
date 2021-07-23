"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLastElementOfNonEmptyArrayOperation = void 0;
const Logger_1 = require("../../Logging/Logger");
const UnexpectedEventError_1 = require("../../Logging/Errors/UnexpectedEvent/UnexpectedEventError");
const GetLastElementOfNonEmptyArrayOperationLocalization__English_1 = require("./GetLastElementOfNonEmptyArrayOperationLocalization__English");
var GetLastElementOfNonEmptyArrayOperation;
(function (GetLastElementOfNonEmptyArrayOperation) {
    let localization = GetLastElementOfNonEmptyArrayOperationLocalization__English_1.default;
    function setLocalization(newLocalization) {
        localization = newLocalization;
    }
    GetLastElementOfNonEmptyArrayOperation.setLocalization = setLocalization;
    function getLastElementOfNonEmptyArray(targetArray) {
        if (targetArray.length === 0) {
            Logger_1.default.throwErrorAndLog({
                errorInstance: new UnexpectedEventError_1.default(localization.elementNotFoundErrorMessage),
                title: UnexpectedEventError_1.default.DEFAULT_TITLE,
                occurrenceLocation: "getLastElementOfNonEmptyArray(targetArray)"
            });
        }
        return targetArray[targetArray.length - 1];
    }
    GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray = getLastElementOfNonEmptyArray;
})(GetLastElementOfNonEmptyArrayOperation = exports.GetLastElementOfNonEmptyArrayOperation || (exports.GetLastElementOfNonEmptyArrayOperation = {}));
exports.default = GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray;

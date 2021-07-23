"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArrayElementWhichMustExistByPredicateOperation = void 0;
const Logger_1 = require("../../Logging/Logger");
const UnexpectedEventError_1 = require("../../Logging/Errors/UnexpectedEvent/UnexpectedEventError");
const GetArrayElementWhichMustExistByPredicateOperationLocalization__English_1 = require("./GetArrayElementWhichMustExistByPredicateOperationLocalization__English");
var GetArrayElementWhichMustExistByPredicateOperation;
(function (GetArrayElementWhichMustExistByPredicateOperation) {
    let localization = GetArrayElementWhichMustExistByPredicateOperationLocalization__English_1.default;
    function setLocalization(newLocalization) {
        localization = newLocalization;
    }
    GetArrayElementWhichMustExistByPredicateOperation.setLocalization = setLocalization;
    function getArrayElementWhichMustExistByPredicate(targetArray, predicate) {
        const desiredElement = targetArray.find(predicate);
        if (typeof desiredElement === "undefined") {
            Logger_1.default.throwErrorAndLog({
                errorInstance: new UnexpectedEventError_1.default(localization.elementNotFoundErrorMessage),
                title: UnexpectedEventError_1.default.DEFAULT_TITLE,
                occurrenceLocation: "getArrayElementWhichMustExistByPredicate(targetArray, predicate)"
            });
        }
        return desiredElement;
    }
    GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate = getArrayElementWhichMustExistByPredicate;
})(GetArrayElementWhichMustExistByPredicateOperation = exports.GetArrayElementWhichMustExistByPredicateOperation || (exports.GetArrayElementWhichMustExistByPredicateOperation = {}));
exports.default = GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate;

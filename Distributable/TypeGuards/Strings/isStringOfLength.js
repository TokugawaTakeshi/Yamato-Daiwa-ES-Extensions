"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOfLengthCheckingOperation = void 0;
const isNonNegativeInteger_1 = require("../Numbers/isNonNegativeInteger");
var IsStringOfLengthCheckingOperation;
(function (IsStringOfLengthCheckingOperation) {
    function isStringOfLength(potentialString, options) {
        if (typeof potentialString !== "string") {
            return false;
        }
        if (isNonNegativeInteger_1.default(options.exactSymbolsCount)) {
            return potentialString.length === options.exactSymbolsCount;
        }
        if (isNonNegativeInteger_1.default(options.minimalSymbolsCount) && isNonNegativeInteger_1.default(options.maximalSymbolsCount)) {
            return potentialString.length >= options.minimalSymbolsCount && potentialString.length <= options.maximalSymbolsCount;
        }
        if (isNonNegativeInteger_1.default(options.minimalSymbolsCount)) {
            return potentialString.length >= options.minimalSymbolsCount;
        }
        if (isNonNegativeInteger_1.default(options.maximalSymbolsCount)) {
            return potentialString.length <= options.maximalSymbolsCount;
        }
        return false;
    }
    IsStringOfLengthCheckingOperation.isStringOfLength = isStringOfLength;
})(IsStringOfLengthCheckingOperation = exports.IsStringOfLengthCheckingOperation || (exports.IsStringOfLengthCheckingOperation = {}));
exports.default = IsStringOfLengthCheckingOperation.isStringOfLength;

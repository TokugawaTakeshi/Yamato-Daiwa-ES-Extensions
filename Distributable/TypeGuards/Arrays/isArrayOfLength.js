"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfLengthCheckingOperation = void 0;
const isNonNegativeInteger_1 = require("../Numbers/isNonNegativeInteger");
var IsArrayOfLengthCheckingOperation;
(function (IsArrayOfLengthCheckingOperation) {
    function isArrayOfLength(potentialArray, options) {
        if (!Array.isArray(potentialArray)) {
            return false;
        }
        if (isNonNegativeInteger_1.default(options.exactElementsCount)) {
            return potentialArray.length === options.exactElementsCount;
        }
        if (isNonNegativeInteger_1.default(options.minimalElementsCount) && isNonNegativeInteger_1.default(options.maximalElementsCount)) {
            return potentialArray.length >= options.minimalElementsCount && potentialArray.length <= options.maximalElementsCount;
        }
        if (isNonNegativeInteger_1.default(options.minimalElementsCount)) {
            return potentialArray.length >= options.minimalElementsCount;
        }
        if (isNonNegativeInteger_1.default(options.maximalElementsCount)) {
            return potentialArray.length <= options.maximalElementsCount;
        }
        return false;
    }
    IsArrayOfLengthCheckingOperation.isArrayOfLength = isArrayOfLength;
})(IsArrayOfLengthCheckingOperation = exports.IsArrayOfLengthCheckingOperation || (exports.IsArrayOfLengthCheckingOperation = {}));
exports.default = IsArrayOfLengthCheckingOperation.isArrayOfLength;

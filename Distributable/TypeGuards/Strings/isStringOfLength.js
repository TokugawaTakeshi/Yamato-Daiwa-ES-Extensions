import isNonNegativeInteger from "../Numbers/isNonNegativeInteger";
export var IsStringOfLengthCheckingOperation;
(function (IsStringOfLengthCheckingOperation) {
    function isStringOfLength(potentialString, options) {
        if (typeof potentialString !== "string") {
            return false;
        }
        if (isNonNegativeInteger(options.exactSymbolsCount)) {
            return potentialString.length === options.exactSymbolsCount;
        }
        if (isNonNegativeInteger(options.minimalSymbolsCount) && isNonNegativeInteger(options.maximalSymbolsCount)) {
            return potentialString.length >= options.minimalSymbolsCount && potentialString.length <= options.maximalSymbolsCount;
        }
        if (isNonNegativeInteger(options.minimalSymbolsCount)) {
            return potentialString.length >= options.minimalSymbolsCount;
        }
        if (isNonNegativeInteger(options.maximalSymbolsCount)) {
            return potentialString.length <= options.maximalSymbolsCount;
        }
        return false;
    }
    IsStringOfLengthCheckingOperation.isStringOfLength = isStringOfLength;
})(IsStringOfLengthCheckingOperation || (IsStringOfLengthCheckingOperation = {}));
export default IsStringOfLengthCheckingOperation.isStringOfLength;

import isNonNegativeInteger from "../Numbers/isNonNegativeInteger";
export var IsArrayOfLengthCheckingOperation;
(function (IsArrayOfLengthCheckingOperation) {
    function isArrayOfLength(potentialArray, options) {
        if (!Array.isArray(potentialArray)) {
            return false;
        }
        if (isNonNegativeInteger(options.exactElementsCount)) {
            return potentialArray.length === options.exactElementsCount;
        }
        if (isNonNegativeInteger(options.minimalElementsCount) && isNonNegativeInteger(options.maximalElementsCount)) {
            return potentialArray.length >= options.minimalElementsCount && potentialArray.length <= options.maximalElementsCount;
        }
        if (isNonNegativeInteger(options.minimalElementsCount)) {
            return potentialArray.length >= options.minimalElementsCount;
        }
        if (isNonNegativeInteger(options.maximalElementsCount)) {
            return potentialArray.length <= options.maximalElementsCount;
        }
        return false;
    }
    IsArrayOfLengthCheckingOperation.isArrayOfLength = isArrayOfLength;
})(IsArrayOfLengthCheckingOperation || (IsArrayOfLengthCheckingOperation = {}));
export default IsArrayOfLengthCheckingOperation.isArrayOfLength;

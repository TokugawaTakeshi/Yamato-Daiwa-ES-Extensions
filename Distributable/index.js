"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.secondsToMilliseconds = exports.millisecondsToSeconds = exports.isFunctionLike = exports.isElementOfEnumeration = exports.isBoolean = exports.isUndefined = exports.isNull = exports.isNotUndefined = exports.isNotNull = exports.isNeitherUndefinedNorNull = exports.isNonEmptyArray = exports.isEmptyArray = exports.isArrayOfCertainTypeElements = exports.isNonNullObject = exports.isNonEmptyObject = exports.isEmptyObject = exports.IsStringOfLengthCheckingOperation = exports.isStringOfLength = exports.isString = exports.isNonEmptyString = exports.isEmptyString = exports.isPositiveDecimalFraction = exports.isNumber = exports.isNonNegativeInteger = exports.isNegativeIntegerOrZero = exports.isNegativeInteger = exports.isNegativeDecimalFraction = exports.isNatualNumber = exports.isDecimalFractionOfAnySign = void 0;
const isDecimalFractionOfAnySign_1 = require("./TypeGuards/Numbers/isDecimalFractionOfAnySign");
exports.isDecimalFractionOfAnySign = isDecimalFractionOfAnySign_1.default;
const isNaturalNumber_1 = require("./TypeGuards/Numbers/isNaturalNumber");
exports.isNatualNumber = isNaturalNumber_1.default;
const isNegativeDecimalFraction_1 = require("./TypeGuards/Numbers/isNegativeDecimalFraction");
exports.isNegativeDecimalFraction = isNegativeDecimalFraction_1.default;
const isNegativeInteger_1 = require("./TypeGuards/Numbers/isNegativeInteger");
exports.isNegativeInteger = isNegativeInteger_1.default;
const isNegativeIntegerOrZero_1 = require("./TypeGuards/Numbers/isNegativeIntegerOrZero");
exports.isNegativeIntegerOrZero = isNegativeIntegerOrZero_1.default;
const isNonNegativeInteger_1 = require("./TypeGuards/Numbers/isNonNegativeInteger");
exports.isNonNegativeInteger = isNonNegativeInteger_1.default;
const isNumber_1 = require("./TypeGuards/Numbers/isNumber");
exports.isNumber = isNumber_1.default;
const isPositiveDecimalFraction_1 = require("./TypeGuards/Numbers/isPositiveDecimalFraction");
exports.isPositiveDecimalFraction = isPositiveDecimalFraction_1.default;
const isEmptyString_1 = require("./TypeGuards/Strings/isEmptyString");
exports.isEmptyString = isEmptyString_1.default;
const isNonEmptyString_1 = require("./TypeGuards/Strings/isNonEmptyString");
exports.isNonEmptyString = isNonEmptyString_1.default;
const isString_1 = require("./TypeGuards/Strings/isString");
exports.isString = isString_1.default;
const isStringOfLength_1 = require("./TypeGuards/Strings/isStringOfLength");
exports.isStringOfLength = isStringOfLength_1.default;
Object.defineProperty(exports, "IsStringOfLengthCheckingOperation", { enumerable: true, get: function () { return isStringOfLength_1.IsStringOfLengthCheckingOperation; } });
const isEmptyObject_1 = require("./TypeGuards/Objects/isEmptyObject");
exports.isEmptyObject = isEmptyObject_1.default;
const isNonEmptyObject_1 = require("./TypeGuards/Objects/isNonEmptyObject");
exports.isNonEmptyObject = isNonEmptyObject_1.default;
const isNonNullObject_1 = require("./TypeGuards/Objects/isNonNullObject");
exports.isNonNullObject = isNonNullObject_1.default;
const isArrayOfCertainTypeElements_1 = require("./TypeGuards/Arrays/isArrayOfCertainTypeElements");
exports.isArrayOfCertainTypeElements = isArrayOfCertainTypeElements_1.default;
const isEmptyArray_1 = require("./TypeGuards/Arrays/isEmptyArray");
exports.isEmptyArray = isEmptyArray_1.default;
const isNonEmptyArray_1 = require("./TypeGuards/Arrays/isNonEmptyArray");
exports.isNonEmptyArray = isNonEmptyArray_1.default;
const isNeitherUndefinedNorNull_1 = require("./TypeGuards/Nullables/isNeitherUndefinedNorNull");
exports.isNeitherUndefinedNorNull = isNeitherUndefinedNorNull_1.default;
const isNotNull_1 = require("./TypeGuards/Nullables/isNotNull");
exports.isNotNull = isNotNull_1.default;
const isNotUndefined_1 = require("./TypeGuards/Nullables/isNotUndefined");
exports.isNotUndefined = isNotUndefined_1.default;
const isNull_1 = require("./TypeGuards/Nullables/isNull");
exports.isNull = isNull_1.default;
const isUndefined_1 = require("./TypeGuards/Nullables/isUndefined");
exports.isUndefined = isUndefined_1.default;
const isBoolean_1 = require("./TypeGuards/isBoolean");
exports.isBoolean = isBoolean_1.default;
const isElementOfEnumeration_1 = require("./TypeGuards/isElementOfEnumeration");
exports.isElementOfEnumeration = isElementOfEnumeration_1.default;
const isFunctionLike_1 = require("./TypeGuards/isFunctionLike");
exports.isFunctionLike = isFunctionLike_1.default;
const millisecondsToSeconds_1 = require("./DateTime/millisecondsToSeconds");
exports.millisecondsToSeconds = millisecondsToSeconds_1.default;
const secondsToMilliseconds_1 = require("./DateTime/secondsToMilliseconds");
exports.secondsToMilliseconds = secondsToMilliseconds_1.default;
const Timer_1 = require("./DateTime/Timer");
exports.Timer = Timer_1.default;

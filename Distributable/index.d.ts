/*!
 * @yamato-daiwa/es-extensions v0.0.7
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */
import formatNumberWith4KetaKanji from "./Numbers/formatNumberWith4KetaKanji";
import isStringifiedNonNegativeIntegerOfRegularNotation from "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
import separateEach3DigitsGroupWithComma from "./Numbers/separateEach3DigitsGroupWithComma";
import separateEach4DigitsGroupWithComma from "./Numbers/separateEach4DigitsGroupWithComma";
import computeFirstItemNumberForSpecificPaginationPage from "./Numbers/Pagination/computeFirstItemNumberForSpecificPaginationPage";
import computeLastItemNumberForSpecificPaginationPage from "./Numbers/Pagination/computeLastItemNumberForSpecificPaginationPage";
import isDecimalFractionOfAnySign from "./TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isNaturalNumber from "./TypeGuards/Numbers/isNaturalNumber";
import isNegativeDecimalFraction from "./TypeGuards/Numbers/isNegativeDecimalFraction";
import isNegativeInteger from "./TypeGuards/Numbers/isNegativeInteger";
import isNegativeIntegerOrZero from "./TypeGuards/Numbers/isNegativeIntegerOrZero";
import isNonNegativeInteger from "./TypeGuards/Numbers/isNonNegativeInteger";
import isNumber from "./TypeGuards/Numbers/isNumber";
import isPositiveDecimalFraction from "./TypeGuards/Numbers/isPositiveDecimalFraction";
import isEmptyString from "./TypeGuards/Strings/isEmptyString";
import isNonEmptyString from "./TypeGuards/Strings/isNonEmptyString";
import isString from "./TypeGuards/Strings/isString";
import isStringOfLength, { IsStringOfLengthCheckingOperation } from "./TypeGuards/Strings/isStringOfLength";
import isEmptyObject from "./TypeGuards/Objects/isEmptyObject";
import isNonEmptyObject from "./TypeGuards/Objects/isNonEmptyObject";
import isNonNullObject from "./TypeGuards/Objects/isNonNullObject";
import isArrayOfCertainTypeElements from "./TypeGuards/Arrays/isArrayOfCertainTypeElements";
import isArrayOfLength, { IsArrayOfLengthCheckingOperation } from "./TypeGuards/Arrays/isArrayOfLength";
import isEmptyArray from "./TypeGuards/Arrays/isEmptyArray";
import isNonEmptyArray from "./TypeGuards/Arrays/isNonEmptyArray";
import isNeitherUndefinedNorNull from "./TypeGuards/Nullables/isNeitherUndefinedNorNull";
import isNotNull from "./TypeGuards/Nullables/isNotNull";
import isNotUndefined from "./TypeGuards/Nullables/isNotUndefined";
import isNull from "./TypeGuards/Nullables/isNull";
import isUndefined from "./TypeGuards/Nullables/isUndefined";
import isBoolean from "./TypeGuards/isBoolean";
import isElementOfEnumeration from "./TypeGuards/isElementOfEnumeration";
import isFunctionLike from "./TypeGuards/isFunctionLike";
import millisecondsToSeconds from "./DateTime/millisecondsToSeconds";
import secondsToMilliseconds from "./DateTime/secondsToMilliseconds";
import Timer from "./DateTime/Timer";
export { formatNumberWith4KetaKanji, isStringifiedNonNegativeIntegerOfRegularNotation, separateEach3DigitsGroupWithComma, separateEach4DigitsGroupWithComma, computeFirstItemNumberForSpecificPaginationPage, computeLastItemNumberForSpecificPaginationPage, isDecimalFractionOfAnySign, isNaturalNumber, isNegativeDecimalFraction, isNegativeInteger, isNegativeIntegerOrZero, isNonNegativeInteger, isNumber, isPositiveDecimalFraction, isEmptyString, isNonEmptyString, isString, isStringOfLength, IsStringOfLengthCheckingOperation, isEmptyObject, isNonEmptyObject, isNonNullObject, isArrayOfCertainTypeElements, isArrayOfLength, IsArrayOfLengthCheckingOperation, isEmptyArray, isNonEmptyArray, isNeitherUndefinedNorNull, isNotNull, isNotUndefined, isNull, isUndefined, isBoolean, isElementOfEnumeration, isFunctionLike, millisecondsToSeconds, secondsToMilliseconds, Timer };

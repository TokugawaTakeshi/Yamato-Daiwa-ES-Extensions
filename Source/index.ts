/*!
 * @yamato-daiwa/es-extensions v0.0.8
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */

/* === Numbers ====================================================================================================== */
import formatNumberWith4KetaKanji from "./Numbers/formatNumberWith4KetaKanji";
import isStringifiedNonNegativeIntegerOfRegularNotation
  from "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
import separateEach3DigitsGroupWithComma from "./Numbers/separateEach3DigitsGroupWithComma";
import separateEach4DigitsGroupWithComma from "./Numbers/separateEach4DigitsGroupWithComma";

/* --- Pagination --------------------------------------------------------------------------------------------------- */
import computeFirstItemNumberForSpecificPaginationPage
  from "./Numbers/Pagination/computeFirstItemNumberForSpecificPaginationPage";
import computeLastItemNumberForSpecificPaginationPage
  from "./Numbers/Pagination/computeLastItemNumberForSpecificPaginationPage";


/* === Sets ========================================================================================================= */
import addMultipleElementsToSet from "./Sets/addMultipleElementsToSet";


/* === Maps ========================================================================================================= */
import addMultiplePairsToMap from "./Maps/addMultiplePairsToMap";
import createMapBasedOnOtherMap from "./Maps/createMapBasedOnOtherMap";
import filterMap from "./Maps/filterMap";


/* === Types ======================================================================================================== */
import type {
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty
} from "./Types/ParsedJSON";

/* === Type guards ================================================================================================== */
/* --- Numbers ------------------------------------------------------------------------------------------------------ */
import isDecimalFractionOfAnySign from "./TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isNaturalNumber from "./TypeGuards/Numbers/isNaturalNumber";
import isNegativeDecimalFraction from "./TypeGuards/Numbers/isNegativeDecimalFraction";
import isNegativeInteger from "./TypeGuards/Numbers/isNegativeInteger";
import isNegativeIntegerOrZero from "./TypeGuards/Numbers/isNegativeIntegerOrZero";
import isNonNegativeInteger from "./TypeGuards/Numbers/isNonNegativeInteger";
import isNumber from "./TypeGuards/Numbers/isNumber";
import isPositiveDecimalFraction from "./TypeGuards/Numbers/isPositiveDecimalFraction";

/* --- Strings ------------------------------------------------------------------------------------------------------ */
import isEmptyString from "./TypeGuards/Strings/isEmptyString";
import isNonEmptyString from "./TypeGuards/Strings/isNonEmptyString";
import isString from "./TypeGuards/Strings/isString";
import isStringOfLength, { IsStringOfLengthCheckingOperation } from "./TypeGuards/Strings/isStringOfLength";

/* --- Objects ------------------------------------------------------------------------------------------------------ */
import isEmptyObject from "./TypeGuards/Objects/isEmptyObject";
import isNonEmptyObject from "./TypeGuards/Objects/isNonEmptyObject";
import isNonNullObject from "./TypeGuards/Objects/isNonNullObject";

/* --- Arrays ------------------------------------------------------------------------------------------------------- */
import isArrayOfCertainTypeElements from "./TypeGuards/Arrays/isArrayOfCertainTypeElements";
import isArrayOfLength, { IsArrayOfLengthCheckingOperation } from "./TypeGuards/Arrays/isArrayOfLength";
import isEmptyArray from "./TypeGuards/Arrays/isEmptyArray";
import isNonEmptyArray from "./TypeGuards/Arrays/isNonEmptyArray";

/* --- undefined & null --------------------------------------------------------------------------------------------- */
import isNeitherUndefinedNorNull from "./TypeGuards/Nullables/isNeitherUndefinedNorNull";
import isNotNull from "./TypeGuards/Nullables/isNotNull";
import isNotUndefined from "./TypeGuards/Nullables/isNotUndefined";
import isNull from "./TypeGuards/Nullables/isNull";
import isUndefined from "./TypeGuards/Nullables/isUndefined";

/* --- Others ------------------------------------------------------------------------------------------------------- */
import isBoolean from "./TypeGuards/isBoolean";
import isElementOfEnumeration from "./TypeGuards/isElementOfEnumeration";
import isFunctionLike from "./TypeGuards/isFunctionLike";


/* === Date & Time ================================================================================================== */
import millisecondsToSeconds from "./DateTime/millisecondsToSeconds";
import secondsToMilliseconds from "./DateTime/secondsToMilliseconds";
import Timer from "./DateTime/Timer";


/* === Value transformers =========================================================================================== */
import emptyStringToNull from "./ValueTransformers/emptyStringToNull";
import nullToUndefined from "./ValueTransformers/nullToUndefined";
import nullToZero from "./ValueTransformers/nullToZero";
import undefinedToEmptyArray from "./ValueTransformers/undefinedToEmptyArray";
import undefinedToEmptyString from "./ValueTransformers/undefinedToEmptyString";
import undefinedToNull from "./ValueTransformers/undefinedToNull";


export {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,

  /* --- Pagination ------------------------------------------------------------------------------------------------- */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,


  /* === Sets ======================================================================================================= */
  addMultipleElementsToSet,


  /* === Maps ======================================================================================================= */
  addMultiplePairsToMap,
  createMapBasedOnOtherMap,
  filterMap,


  /* === Type guards ================================================================================================ */
  /* --- Numbers ---------------------------------------------------------------------------------------------------- */
  isDecimalFractionOfAnySign,
  isNaturalNumber,
  isNegativeDecimalFraction,
  isNegativeInteger,
  isNegativeIntegerOrZero,
  isNonNegativeInteger,
  isNumber,
  isPositiveDecimalFraction,

  /* --- Strings ---------------------------------------------------------------------------------------------------- */
  isEmptyString,
  isNonEmptyString,
  isString,
  isStringOfLength,
  IsStringOfLengthCheckingOperation,

  /* --- Objects ---------------------------------------------------------------------------------------------------- */
  isEmptyObject,
  isNonEmptyObject,
  isNonNullObject,

  /* --- Arrays ----------------------------------------------------------------------------------------------------- */
  isArrayOfCertainTypeElements,
  isArrayOfLength,
  IsArrayOfLengthCheckingOperation,
  isEmptyArray,
  isNonEmptyArray,

  /* --- undefined/null --------------------------------------------------------------------------------------------- */
  isNeitherUndefinedNorNull,
  isNotNull,
  isNotUndefined,
  isNull,
  isUndefined,

  /* --- Others ----------------------------------------------------------------------------------------------------- */
  isBoolean,
  isElementOfEnumeration,
  isFunctionLike,

  /* === Date & Time ================================================================================================ */
  millisecondsToSeconds,
  secondsToMilliseconds,
  Timer,


  /* === Value transformers ========================================================================================= */
  emptyStringToNull,
  nullToUndefined,
  nullToZero,
  undefinedToEmptyArray,
  undefinedToEmptyString,
  undefinedToNull
};


export type {
  /* === Value transformers ========================================================================================= */
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty
};

/* === Type guards ================================================================================================== */
/* --- Numbers ------------------------------------------------------------------------------------------------------ */
import isDecimalFractionOfAnySign from "./TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isNatualNumber from "./TypeGuards/Numbers/isNaturalNumber";
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


export {

  /* === Type guards ================================================================================================ */
  /* --- Numbers ---------------------------------------------------------------------------------------------------- */
  isDecimalFractionOfAnySign,
  isNatualNumber,
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
  Timer
};

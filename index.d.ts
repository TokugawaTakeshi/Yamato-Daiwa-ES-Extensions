/* === Type guards ================================================================================================== */
/* --- Numbers ------------------------------------------------------------------------------------------------------ */
import { isDecimalFractionOfAnySign } from "./Distributable"
import { isNatualNumber } from "./Distributable"
import { isNegativeDecimalFraction } from "./Distributable"
import { isNegativeInteger } from "./Distributable"
import { isNegativeIntegerOrZero } from "./Distributable"
import { isNonNegativeInteger } from "./Distributable"
import { isNumber } from "./Distributable"
import { isPositiveDecimalFraction } from "./Distributable"

/* --- Strings ------------------------------------------------------------------------------------------------------ */
import { isEmptyString } from "./Distributable"
import { isNonEmptyString } from "./Distributable"
import { isString } from "./Distributable"
import { isStringOfLength, IsStringOfLengthCheckingOperation } from "./Distributable";

/* --- Objects ------------------------------------------------------------------------------------------------------ */
import { isEmptyObject } from "./Distributable"
import { isNonEmptyObject } from "./Distributable"
import { isNonNullObject } from "./Distributable"

/* --- Arrays ------------------------------------------------------------------------------------------------------- */
import { isArrayOfCertainTypeElements } from "./Distributable"
import { isEmptyArray } from "./Distributable"
import { isNonEmptyArray } from "./Distributable"

/* --- undefined & null --------------------------------------------------------------------------------------------- */
import { isNeitherUndefinedNorNull } from "./Distributable"
import { isNotNull } from "./Distributable"
import { isNotUndefined } from "./Distributable"
import { isNull } from "./Distributable"
import { isUndefined } from "./Distributable"

/* --- Others ------------------------------------------------------------------------------------------------------- */
import { isBoolean } from "./Distributable"
import { isElementOfEnumeration } from "./Distributable"
import { isFunctionLike } from "./Distributable"


/* === Date & Time ================================================================================================== */
import { millisecondsToSeconds } from "./Distributable"
import { secondsToMilliseconds } from "./Distributable"
import { Timer } from "./Distributable"


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

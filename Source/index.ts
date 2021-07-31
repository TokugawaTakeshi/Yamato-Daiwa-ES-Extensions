/*!
 * @yamato-daiwa/es-extensions v0.6.0
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */

/* === Numbers ====================================================================================================== */
import formatNumberWith4KetaKanji from "./Numbers/formatNumberWith4KetaKanji";
import isStringifiedNonNegativeIntegerOfRegularNotation
  from "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
import separateEach3DigitsGroupWithComma from "./Numbers/separateEach3DigitsGroupWithComma";
import separateEach4DigitsGroupWithComma from "./Numbers/separateEach4DigitsGroupWithComma";


/* === Strings ====================================================================================================== */
import areStringifiedDigitsOnly from "./Strings/areStringifiedDigitsOnly";
import capitalizeFirstSymbol from "./Strings/capitalizeFirstSymbol";
import getLastSymbol from "./Strings/getLastSymbol";
import getPositionsOfAllSubstringOccurrences from "./Strings/getPositionsOfAllSubstringOccurrences";
import insertSubstring from "./Strings/insertSubstring";
import insertSubstringIf from "./Strings/insertSubstringIf";
import removeAllSpecifiedCharacters from "./Strings/removeAllSpecifiedCharacters";
import removeNonDigitsCharacters from "./Strings/removeNonDigitsCharacters";
import removeNthSymbol from "./Strings/removeNthSymbol";
import replace2OrMoreSpacesTo1 from "./Strings/replace2OrMoreSpacesTo1";
import replaceBrHTML_TagToNewLineEscapeSequence from "./Strings/replaceBrHTML_TagToNewLineEscapeSequence";
import reverseString from "./Strings/reverseString";
import splitString from "./Strings/splitString";
import stringifyAndFormatUnknownAtAdvanceEntity from "./Strings/stringifyAndFormatUnknownAtAdvanceEntity";


/* === Arrays ======================================================================================================= */
import getArrayElementWhichMustExistByPredicate, {
  GetArrayElementWhichMustExistByPredicateOperation
} from "./Arrays/getArrayElementWhichMustExistByPredicate/getArrayElementWhichMustExistByPredicate";
import getLastElementOfNonEmptyArray, {
  GetLastElementOfNonEmptyArrayOperation
} from "./Arrays/getLastElementOfNonEmptyArray/getLastElementOfNonEmptyArray";
import getIndexesOfArrayElementsWhichSatisfiesToPredicate
  from "./Arrays/getIndexesOfArrayElementsWhichSatisfiesToPredicate";
import getIndexOfArrayElementByPredicate from "./Arrays/getIndexOfArrayElementByPredicate";

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
import { PartialBy } from "./Types/PartialBy";


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
import nullToEmptyString from "./ValueTransformers/nullToEmptyString";
import nullToUndefined from "./ValueTransformers/nullToUndefined";
import nullToZero from "./ValueTransformers/nullToZero";
import undefinedToEmptyArray from "./ValueTransformers/undefinedToEmptyArray";
import undefinedToEmptyString from "./ValueTransformers/undefinedToEmptyString";
import undefinedToNull from "./ValueTransformers/undefinedToNull";


/* === Default value substituters =================================================================================== */
import substituteWhenNull from "./DefaultValueSubstituters/substituteWhenNull";
import substituteWhenUndefined from "./DefaultValueSubstituters/substituteWhenUndefined";


/* === Random values generators =================================================================================== */
import getRandomArrayElement from "./RandomValuesGenerators/getRandomArrayElement";
import getRandomBoolean from "./RandomValuesGenerators/getRandomBoolean";
import getRandomInteger from "./RandomValuesGenerators/getRandomInteger";
import getRandomLatinSymbol from "./RandomValuesGenerators/getRandomLatinSymbol";
import getRandomObjectPropertyValue from "./RandomValuesGenerators/getRandomObjectPropertyValue";
import getSpecificBooleanValueWithProbability from "./RandomValuesGenerators/getSpecificBooleanValueWithProbability";


/* === Constants and enumerations =================================================================================== */
import HTTP_Methods from "./ConstantsAndEnumerations/HTTP_Methods";
import HTTP_StatusCodes from "./ConstantsAndEnumerations/HTTP_StatusCodes";


/* === Pagination =================================================================================================== */
import computeFirstItemNumberForSpecificPaginationPage
  from "./Pagination/computeFirstItemNumberForSpecificPaginationPage";
import computeLastItemNumberForSpecificPaginationPage
  from "./Pagination/computeLastItemNumberForSpecificPaginationPage";
import splitToPaginationCollection from "./Pagination/splitToPaginationCollection";
import type { PaginationCollection } from "./Pagination/splitToPaginationCollection";

/* === Logging ====================================================================================================== */
import type {
  Log,
  ErrorLog,
  ThrownErrorLog,
  WarningLog,
  SuccessLog,
  InfoLog
} from "./Logging/Logs";
import type { ILogger } from "./Logging/ILogger";
import Logger from "./Logging/Logger";
import LoggerLocalization__English from "./Logging/LoggerLocalization__English";

import AlgorithmMismatchError from "./Logging/Errors/AlgorithmMismatch/AlgorithmMismatchError";
import AlgorithmMismatchErrorLocalization__English
  from "./Logging/Errors/AlgorithmMismatch/AlgorithmMismatchErrorLocalization__English";
import ClassRedundantSubsequentInitializationError
  from "./Logging/Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationError";
import ClassRedundantSubsequentInitializationErrorLocalization__English
  from "./Logging/Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationErrorLocalization__English";
import ClassRequiredInitializationHasNotBeenExecutedError
  from "./Logging/Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedError";
import ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English
  from "./Logging/Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English";
import ConfigFileNotFoundError from "./Logging/Errors/ConfigFileNotFound/СonfigFileNotFoundError";
import ConfigFileNotFoundErrorLocalization__English
  from "./Logging/Errors/ConfigFileNotFound/ConfigFileNotFoundErrorLocalization__English";
import CrossBrowserIssueError from "./Logging/Errors/CrossBrowserIssue/CrossBrowserIssueError";
import CrossBrowserIssueErrorLocalization__English
  from "./Logging/Errors/CrossBrowserIssue/CrossBrowserIssueErrorLocalization__English";
import DataRetrievingFailedError from "./Logging/Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataRetrievingFailedErrorLocalization__English
  from "./Logging/Errors/DataRetrievingFailed/DataRetrievingFailedErrorLocalization__English";
import DataSubmittingFailedError from "./Logging/Errors/DataSubmittingFailed/DataSubmittingFailedError";
import DataSubmittingFailedErrorLocalization__English
  from "./Logging/Errors/DataSubmittingFailed/DataSubmittingFailedErrorLocalization__English";
import DOM_ElementRetrievingFailedError
  from "./Logging/Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedError";
import DOM_ElementRetrievingFailedErrorLocalization__English
  from "./Logging/Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedErrorLocalization__English";
import FileReadingFailedError from "./Logging/Errors/FileReadingFailed/FileReadingFailedError";
import FileReadingFailedErrorLocalization__English
  from "./Logging/Errors/FileReadingFailed/FileReadingFailedErrorLocalization__English";
import FileWritingFailedError from "./Logging/Errors/FileWritingFailed/FileWritingFailedError";
import FileWritingFailedErrorLocalization__English
  from "./Logging/Errors/FileWritingFailed/FileWritingFailedErrorLocalization__English";
import ImproperUsageError from "./Logging/Errors/ImproperUsage/ImproperUsageError";
import ImproperUsageErrorLocalization__English
  from "./Logging/Errors/ImproperUsage/ImproperUsageErrorLocalization__English";
import IncompatiblePropertiesInObjectTypeParameterError
  from "./Logging/Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";
import IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English
  from "./Logging/Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English";
import InterProcessInteractionFailedError
  from "./Logging/Errors/InterProcessInteractionFailed/InterProcessInteractionFailedError";
import InterProcessInteractionFailedErrorLocalization__English
  from "./Logging/Errors/InterProcessInteractionFailed/InterProcessInteractionFailedErrorLocalization__English";
import InvalidConfigError from "./Logging/Errors/InvalidConfig/InvalidConfigError";
import InvalidConfigErrorLocalization__English
  from "./Logging/Errors/InvalidConfig/InvalidConfigErrorLocalization__English";
import InvalidExternalDataError from "./Logging/Errors/InvalidExternalData/InvalidExternalDataError";
import InvalidExternalDataErrorLocalization__English
  from "./Logging/Errors/InvalidExternalData/InvalidExternalDataErrorLocalization__English";
import InvalidParameterValueError from "./Logging/Errors/InvalidParameterValue/InvalidParameterValueError";
import InvalidParameterValueErrorLocalization__English
  from "./Logging/Errors/InvalidParameterValue/InvalidParameterValueErrorLocalization__English";
import ModuleDynamicLoadingFailedError
  from "./Logging/Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedError";
import ModuleDynamicLoadingFailedErrorLocalization__English
  from "./Logging/Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedErrorLocalization__English";
import UnexpectedEventError from "./Logging/Errors/UnexpectedEvent/UnexpectedEventError";
import UnexpectedEventErrorLocalization__English
  from "./Logging/Errors/UnexpectedEvent/UnexpectedEventErrorLocalization__English";
import UnsupportedScenarioError from "./Logging/Errors/UnsupportedScenario/UnsupportedScenarioError";
import UnsupportedScenarioErrorLocalization__English
  from "./Logging/Errors/UnsupportedScenario/UnsupportedScenarioErrorLocalization__English";


export {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,


  /* === Strings ==================================================================================================== */
  areStringifiedDigitsOnly,
  capitalizeFirstSymbol,
  getLastSymbol,
  getPositionsOfAllSubstringOccurrences,
  insertSubstring,
  insertSubstringIf,
  removeAllSpecifiedCharacters,
  removeNonDigitsCharacters,
  removeNthSymbol,
  replace2OrMoreSpacesTo1,
  replaceBrHTML_TagToNewLineEscapeSequence,
  reverseString,
  splitString,
  stringifyAndFormatUnknownAtAdvanceEntity,


  /* === Arrays ===================================================================================================== */
  getArrayElementWhichMustExistByPredicate,
  GetArrayElementWhichMustExistByPredicateOperation,
  getLastElementOfNonEmptyArray,
  GetLastElementOfNonEmptyArrayOperation,
  getIndexesOfArrayElementsWhichSatisfiesToPredicate,
  getIndexOfArrayElementByPredicate,

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
  nullToEmptyString,
  nullToUndefined,
  nullToZero,
  undefinedToEmptyArray,
  undefinedToEmptyString,
  undefinedToNull,


  /* === Default value substituters ================================================================================= */
  substituteWhenNull,
  substituteWhenUndefined,


  /* === Random values generators =================================================================================== */
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInteger,
  getRandomLatinSymbol,
  getRandomObjectPropertyValue,
  getSpecificBooleanValueWithProbability,


  /* === Constants and enumerations ================================================================================= */
  HTTP_Methods,
  HTTP_StatusCodes,


  /* === Pagination ================================================================================================= */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,
  splitToPaginationCollection,


  /* === Logging ==================================================================================================== */
  Logger,
  LoggerLocalization__English,
  AlgorithmMismatchError,
  AlgorithmMismatchErrorLocalization__English,
  ClassRedundantSubsequentInitializationError,
  ClassRedundantSubsequentInitializationErrorLocalization__English,
  ClassRequiredInitializationHasNotBeenExecutedError,
  ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English,
  ConfigFileNotFoundError,
  ConfigFileNotFoundErrorLocalization__English,
  CrossBrowserIssueError,
  CrossBrowserIssueErrorLocalization__English,
  DataRetrievingFailedError,
  DataRetrievingFailedErrorLocalization__English,
  DataSubmittingFailedError,
  DataSubmittingFailedErrorLocalization__English,
  DOM_ElementRetrievingFailedError,
  DOM_ElementRetrievingFailedErrorLocalization__English,
  FileReadingFailedError,
  FileReadingFailedErrorLocalization__English,
  FileWritingFailedError,
  FileWritingFailedErrorLocalization__English,
  ImproperUsageError,
  ImproperUsageErrorLocalization__English,
  IncompatiblePropertiesInObjectTypeParameterError,
  IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English,
  InterProcessInteractionFailedError,
  InterProcessInteractionFailedErrorLocalization__English,
  InvalidConfigError,
  InvalidConfigErrorLocalization__English,
  InvalidExternalDataError,
  InvalidExternalDataErrorLocalization__English,
  InvalidParameterValueError,
  InvalidParameterValueErrorLocalization__English,
  ModuleDynamicLoadingFailedError,
  ModuleDynamicLoadingFailedErrorLocalization__English,
  UnexpectedEventError,
  UnexpectedEventErrorLocalization__English,
  UnsupportedScenarioError,
  UnsupportedScenarioErrorLocalization__English
};


export type {

  /* === Types ===================================================================================================== */
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty,

  PartialBy,


  /* === Pagination ================================================================================================= */
  PaginationCollection,


  /* === Logging ==================================================================================================== */
  Log,
  ErrorLog,
  ThrownErrorLog,
  WarningLog,
  SuccessLog,
  InfoLog,
  ILogger
};

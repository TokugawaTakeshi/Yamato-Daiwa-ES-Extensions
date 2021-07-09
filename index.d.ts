import {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,

  /* --- Pagination ------------------------------------------------------------------------------------------------- */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,


  /* === Strings ==================================================================================================== */
  areStringifiedDigitsOnly,
  capitalizeFirstSymbol,
  getLastSymbol,
  getPositionsOfAllSubstringOccurrences,
  insertSubstring,
  insertSubstringIf,
  removeAllSpecifiedCharacters,
  removeNonDigitsCharacters,
  reverseString,
  stringifyAndFormatUnknownAtAdvanceEntity,


  /* === Arrays ===================================================================================================== */
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
  HTTP_StatusCodes,
  HTTP_Methods,


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
} from "./Distributable";


import type {

  /* === Types ====================================================================================================== */
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty,


  /* === Logging ==================================================================================================== */
  Log,
  ErrorLog,
  ThrownErrorLog,
  WarningLog,
  SuccessLog,
  InfoLog,
  ILogger
} from "./Distributable";


export {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,

  /* --- Pagination ------------------------------------------------------------------------------------------------- */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,


  /* === Strings ==================================================================================================== */
  areStringifiedDigitsOnly,
  capitalizeFirstSymbol,
  getLastSymbol,
  getPositionsOfAllSubstringOccurrences,
  insertSubstring,
  insertSubstringIf,
  removeAllSpecifiedCharacters,
  removeNonDigitsCharacters,
  reverseString,
  stringifyAndFormatUnknownAtAdvanceEntity,


  /* === Arrays ===================================================================================================== */
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
  HTTP_StatusCodes,
  HTTP_Methods,


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

  /* === Types ====================================================================================================== */
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty,


  /* === Logging ==================================================================================================== */
  Log,
  ErrorLog,
  ThrownErrorLog,
  WarningLog,
  SuccessLog,
  InfoLog,
  ILogger
};

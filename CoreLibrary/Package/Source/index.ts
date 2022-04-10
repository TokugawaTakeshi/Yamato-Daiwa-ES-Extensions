/*!
 * @yamato-daiwa/es-extensions v1.5
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */

/* === Numbers ====================================================================================================== */
export { default as formatNumberWith4KetaKanji } from "./Numbers/formatNumberWith4KetaKanji";
export { default as isStringifiedNonNegativeIntegerOfRegularNotation } from
    "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
export { default as separateEach3DigitsGroupWithComma } from "./Numbers/separateEach3DigitsGroupWithComma";
export { default as separateEach4DigitsGroupWithComma } from "./Numbers/separateEach4DigitsGroupWithComma";


/* === Strings ====================================================================================================== */
export { default as areStringifiedDigitsOnly } from "./Strings/areStringifiedDigitsOnly";
export { default as capitalizeFirstCharacter } from "./Strings/capitalizeFirstCharacter";
export { default as EmailAddress } from "./Strings/EmailAddress";
export { default as getLastCharacter } from "./Strings/getLastCharacter";
export { default as getPositionsOfAllSubstringOccurrences } from "./Strings/getPositionsOfAllSubstringOccurrences";
export { default as insertSubstring } from "./Strings/insertSubstring";
export { default as insertSubstringIf } from "./Strings/insertSubstringIf";
export { default as removeAllSpecifiedCharacters } from "./Strings/removeAllSpecifiedCharacters";
export { default as removeLastCharacter } from "./Strings/removeLastCharacter";
export { default as removeNonDigitsCharacters } from "./Strings/removeNonDigitsCharacters";
export { default as removeNthCharacter } from "./Strings/removeNthCharacter";
export { default as removeSpecificCharacterInLastPosition } from "./Strings/removeSpecificCharacterInLastPosition";
export { default as replace2OrMoreSpacesTo1 } from "./Strings/replace2OrMoreSpacesTo1";
export { default as replaceBrHTML_TagToNewLineEscapeSequence } from "./Strings/replaceBrHTML_TagToNewLineEscapeSequence";
export { default as replaceDoubleBackslashesWithForwardSlashes } from "./Strings/replaceDoubleBackslashesWithForwardSlashes";
export { default as reverseString } from "./Strings/reverseString";
export { default as splitString } from "./Strings/splitString";
export { default as stringifyAndFormatArbitraryValue } from "./Strings/stringifyAndFormatArbitraryValue";
export { default as trimSpaces } from "./Strings/trimSpaces";
export {
  SpaceCharacters,
  EscapeCharacters,
  latinCharacters__lowercase,
  latinCharacters__uppercase,
  stringifiedDigits
} from "./Strings/CharactersAssets";


/* === Arrays ======================================================================================================= */
export { default as addElementsToArrayImmutably } from "./Arrays/addElementsToArrayImmutably";
export { default as getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne } from
      "./Arrays/getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne";
export { default as getIndexesOfArrayElementsWhichSatisfiesToPredicate } from
    "./Arrays/getIndexesOfArrayElementsWhichSatisfiesToPredicate";
export { default as getIndexOfArrayElementByPredicate } from "./Arrays/getIndexOfArrayElementByPredicate";
export { default as getLastElementOfNonEmptyArray } from "./Arrays/getLastElementOfNonEmptyArray";
export { default as removeArrayElementsByIndexes, RemovingArrayElementsByIndexesOperation } from
    "./Arrays/removeArrayElementsByIndexes";
export { default as removeArrayElementsByPredicates, RemovingArrayElementsByPredicatesOperation } from
    "./Arrays/removeArrayElementsByPredicates";
export { default as replaceArrayElementsByIndexesImmutably } from "./Arrays/replaceArrayElementsByIndexesImmutably";
export { default as replaceArrayElementsByPredicates, ReplacingArrayElementsByPredicatesOperation } from
    "./Arrays/replaceArrayElementsByPredicates";
export { default as twoDimensionalizeArray } from "./Arrays/twoDimensionalizeArray";


/* === Sets ========================================================================================================= */
export { default as addMultipleElementsToSet } from "./Sets/addMultipleElementsToSet";


/* === Maps ========================================================================================================= */
export { default as addMultiplePairsToMap } from "./Maps/addMultiplePairsToMap";
export { default as createMapBasedOnOtherMap } from "./Maps/createMapBasedOnOtherMap";
export { default as filterMap } from "./Maps/filterMap";


/* === Types ======================================================================================================== */
export type { ArbitraryObject } from "./Types/ArbitraryObject";
export type { ElementOfPseudoEnumeration } from "./Types/ElementOfPseudoEnumeration";
export type { InheritEnumerationKeys } from "./Types/InheritEnumerationKeys";
export type {
  ParsedJSON,
  ParsedJSON_Object,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty
} from "./Types/ParsedJSON";
export { PartialBy } from "./Types/PartialBy";


/* === Type guards ================================================================================================== */
/* --- Numbers ------------------------------------------------------------------------------------------------------ */
export { default as isDecimalFractionOfAnySign } from "./TypeGuards/Numbers/isDecimalFractionOfAnySign";
export { default as isNaturalNumber } from "./TypeGuards/Numbers/isNaturalNumber";
export { default as isNegativeDecimalFraction } from "./TypeGuards/Numbers/isNegativeDecimalFraction";
export { default as isNegativeInteger } from "./TypeGuards/Numbers/isNegativeInteger";
export { default as isNegativeIntegerOrZero } from "./TypeGuards/Numbers/isNegativeIntegerOrZero";
export { default as isNonNegativeInteger } from "./TypeGuards/Numbers/isNonNegativeInteger";
export { default as isNumber } from "./TypeGuards/Numbers/isNumber";
export { default as isPositiveDecimalFraction } from "./TypeGuards/Numbers/isPositiveDecimalFraction";

/* --- Strings ------------------------------------------------------------------------------------------------------ */
export { default as isEmptyString } from "./TypeGuards/Strings/isEmptyString";
export { default as isNonEmptyString } from "./TypeGuards/Strings/isNonEmptyString";
export { default as isString } from "./TypeGuards/Strings/isString";
export { default as isStringOfLength, IsStringOfLengthCheckingOperation } from "./TypeGuards/Strings/isStringOfLength";

/* --- Objects ------------------------------------------------------------------------------------------------------ */
export { default as isArbitraryObject } from "./TypeGuards/Objects/isArbitraryObject";
export { default as isEmptyObject } from "./TypeGuards/Objects/isEmptyObject";
export { default as isNonEmptyArbitraryObject } from "./TypeGuards/Objects/isNonEmptyArbitraryObject";
export { default as isNonEmptyObject } from "./TypeGuards/Objects/isNonEmptyObject";
export { default as isNonNullObject } from "./TypeGuards/Objects/isNonNullObject";

/* --- Arrays ------------------------------------------------------------------------------------------------------- */
export { default as isArrayOfCertainTypeElements } from "./TypeGuards/Arrays/isArrayOfCertainTypeElements";
export { default as isArrayOfLength, IsArrayOfLengthCheckingOperation } from "./TypeGuards/Arrays/isArrayOfLength";
export { default as isEmptyArray } from "./TypeGuards/Arrays/isEmptyArray";
export { default as isNonEmptyArray } from "./TypeGuards/Arrays/isNonEmptyArray";

/* --- undefined & null --------------------------------------------------------------------------------------------- */
export { default as isNeitherUndefinedNorNull } from "./TypeGuards/Nullables/isNeitherUndefinedNorNull";
export { default as isEitherUndefinedOrNull } from "./TypeGuards/Nullables/isEitherUndefinedOrNull";
export { default as isNotNull } from "./TypeGuards/Nullables/isNotNull";
export { default as isNotUndefined } from "./TypeGuards/Nullables/isNotUndefined";
export { default as isNull } from "./TypeGuards/Nullables/isNull";
export { default as isUndefined } from "./TypeGuards/Nullables/isUndefined";

/* --- Others ------------------------------------------------------------------------------------------------------- */
export { default as isBoolean } from "./TypeGuards/isBoolean";
export { default as isElementOfEnumeration } from "./TypeGuards/isElementOfEnumeration";
export { default as isFunctionLike } from "./TypeGuards/isFunctionLike";


/* === Date & Time ================================================================================================== */
export { default as CalendarBuilder } from "./DateTime/CalendarBuilder";
export { default as getDaysCountInSpecificMonth } from "./DateTime/getDaysCountInSpecificMonth";
export { default as getMonthNameByNumber } from "./DateTime/getMonthNameByNumber";
export { default as getMonthNumberByName } from "./DateTime/getMonthNumberByName";
export { default as getNextMonthNumber } from "./DateTime/getNextMonthNumber";
export { default as getPreviousMonthNumber } from "./DateTime/getPreviousMonthNumber";
export { default as getYearOfNextMonth } from "./DateTime/getYearOfNextMonth";
export { default as getYearOfPreviousMonth } from "./DateTime/getYearOfPreviousMonth";
export { default as hasTimeCome } from "./DateTime/hasTimeCome";
export { default as millisecondsToSeconds } from "./DateTime/millisecondsToSeconds";
export { default as secondsToMilliseconds } from "./DateTime/secondsToMilliseconds";
export { default as TimePoint } from "./DateTime/TimePoint/TimePoint";
export { default as Timer } from "./DateTime/Timer";


/* === Value transformers =========================================================================================== */
export { default as emptyStringToNull } from "./ValueTransformers/emptyStringToNull";
export { default as nullToEmptyString } from "./ValueTransformers/nullToEmptyString";
export { default as nullToUndefined } from "./ValueTransformers/nullToUndefined";
export { default as nullToZero } from "./ValueTransformers/nullToZero";
export { default as undefinedToEmptyArray } from "./ValueTransformers/undefinedToEmptyArray";
export { default as undefinedToEmptyString } from "./ValueTransformers/undefinedToEmptyString";
export { default as undefinedToNull } from "./ValueTransformers/undefinedToNull";


/* === Default value substituters =================================================================================== */
export { default as substituteWhenNull } from "./DefaultValueSubstituters/substituteWhenNull";
export { default as substituteWhenUndefined } from "./DefaultValueSubstituters/substituteWhenUndefined";


/* === Random values generators =================================================================================== */
export { default as getRandomString, RandomStringsGenerator } from "./RandomValuesGenerators/getRandomString/getRandomString";
export { default as getRandomArrayElement } from "./RandomValuesGenerators/getRandomArrayElement";
export { default as getRandomBoolean } from "./RandomValuesGenerators/getRandomBoolean";
export { default as getRandomInteger } from "./RandomValuesGenerators/getRandomInteger";
export { default as getRandomLatinCharacter } from "./RandomValuesGenerators/getRandomLatinCharacter";
export { default as getRandomObjectPropertyValue } from "./RandomValuesGenerators/getRandomObjectPropertyValue";
export { default as getRandomSubarray } from "./RandomValuesGenerators/getRandomSubarray";
export { default as getSpecificBooleanValueWithProbability } from
    "./RandomValuesGenerators/getSpecificBooleanValueWithProbability";
export { default as removeRandomArrayElement } from "./RandomValuesGenerators/removeRandomArrayElement";


/* === Constants and enumerations =================================================================================== */
export { default as DaysOfWeek } from "./ConstantsAndEnumerations/DaysOfWeek";
export { default as HTTP_Methods } from "./ConstantsAndEnumerations/HTTP_Methods";
export { default as HTTP_StatusCodes } from "./ConstantsAndEnumerations/HTTP_StatusCodes";
export { default as MonthsNames } from "./ConstantsAndEnumerations/MonthsNames";
export {
  HOURS_PER_STELLAR_DAY,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  MONTHS_PER_YEAR
} from "./ConstantsAndEnumerations/DateTimeConstants";


/* === Pagination =================================================================================================== */
export { default as computeFirstItemNumberForSpecificPaginationPage } from
    "./Pagination/computeFirstItemNumberForSpecificPaginationPage";
export { default as computeLastItemNumberForSpecificPaginationPage } from
    "./Pagination/computeLastItemNumberForSpecificPaginationPage";
export { default as splitToPaginationCollection } from "./Pagination/splitToPaginationCollection";
export type { PaginationCollection } from "./Pagination/splitToPaginationCollection";

/* === Logging ====================================================================================================== */
export type {
  Log,
  ErrorLog,
  ThrownErrorLog,
  WarningLog,
  SuccessLog,
  InfoLog
} from "./Logging/Logs";
export type { ILogger } from "./Logging/ILogger";
export { default as Logger } from "./Logging/Logger";
export { default as LoggerLocalization__English } from "./Logging/LoggerLocalization__English";

export { default as AlgorithmMismatchError } from "./Logging/Errors/AlgorithmMismatch/AlgorithmMismatchError";
export { default as AlgorithmMismatchErrorLocalization__English } from
    "./Logging/Errors/AlgorithmMismatch/AlgorithmMismatchErrorLocalization__English";
export { default as ClassRedundantSubsequentInitializationError } from
    "./Logging/Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationError";
export { default as ClassRedundantSubsequentInitializationErrorLocalization__English } from
    "./Logging/Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationErrorLocalization__English";
export { default as ClassRequiredInitializationHasNotBeenExecutedError } from
    "./Logging/Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedError";
export { default as ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English } from
    "./Logging/Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English";
export { default as ConfigFileNotFoundError } from "./Logging/Errors/ConfigFileNotFound/ConfigFileNotFoundError";
export { default as ConfigFileNotFoundErrorLocalization__English } from
    "./Logging/Errors/ConfigFileNotFound/ConfigFileNotFoundErrorLocalization__English";
export { default as CrossBrowserIssueError } from "./Logging/Errors/CrossBrowserIssue/CrossBrowserIssueError";
export { default as CrossBrowserIssueErrorLocalization__English } from
    "./Logging/Errors/CrossBrowserIssue/CrossBrowserIssueErrorLocalization__English";
export { default as DataRetrievingFailedError } from "./Logging/Errors/DataRetrievingFailed/DataRetrievingFailedError";
export { default as DataRetrievingFailedErrorLocalization__English } from
    "./Logging/Errors/DataRetrievingFailed/DataRetrievingFailedErrorLocalization__English";
export { default as DataSubmittingFailedError } from "./Logging/Errors/DataSubmittingFailed/DataSubmittingFailedError";
export {
  default as DataSubmittingFailedErrorLocalization__English
} from "./Logging/Errors/DataSubmittingFailed/DataSubmittingFailedErrorLocalization__English";
export {
  default as DOM_ElementRetrievingFailedError
} from "./Logging/Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedError";
export {
  default as DOM_ElementRetrievingFailedErrorLocalization__English
} from "./Logging/Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedErrorLocalization__English";
export { default as FileReadingFailedError } from "./Logging/Errors/FileReadingFailed/FileReadingFailedError";
export {
  default as FileReadingFailedErrorLocalization__English
} from "./Logging/Errors/FileReadingFailed/FileReadingFailedErrorLocalization__English";
export { default as FileWritingFailedError } from "./Logging/Errors/FileWritingFailed/FileWritingFailedError";
export {
  default as FileWritingFailedErrorLocalization__English
} from "./Logging/Errors/FileWritingFailed/FileWritingFailedErrorLocalization__English";
export { default as ImproperUsageError } from "./Logging/Errors/ImproperUsage/ImproperUsageError";
export {
  default as ImproperUsageErrorLocalization__English
} from "./Logging/Errors/ImproperUsage/ImproperUsageErrorLocalization__English";
export {
  default as IncompatiblePropertiesInObjectTypeParameterError
} from "./Logging/Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";
export { default as IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English } from
    "./Logging/Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English";
export {
  default as InterProcessInteractionFailedError
} from "./Logging/Errors/InterProcessInteractionFailed/InterProcessInteractionFailedError";
export {
  default as InterProcessInteractionFailedErrorLocalization__English
} from "./Logging/Errors/InterProcessInteractionFailed/InterProcessInteractionFailedErrorLocalization__English";
export { default as InvalidConfigError } from "./Logging/Errors/InvalidConfig/InvalidConfigError";
export {
  default as InvalidConfigErrorLocalization__English
} from "./Logging/Errors/InvalidConfig/InvalidConfigErrorLocalization__English";
export { default as InvalidExternalDataError } from "./Logging/Errors/InvalidExternalData/InvalidExternalDataError";
export {
  default as InvalidExternalDataErrorLocalization__English
} from "./Logging/Errors/InvalidExternalData/InvalidExternalDataErrorLocalization__English";
export { default as InvalidParameterValueError } from "./Logging/Errors/InvalidParameterValue/InvalidParameterValueError";
export {
  default as InvalidParameterValueErrorLocalization__English
} from "./Logging/Errors/InvalidParameterValue/InvalidParameterValueErrorLocalization__English";
export {
  default as ModuleDynamicLoadingFailedError
} from "./Logging/Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedError";
export {
  default as ModuleDynamicLoadingFailedErrorLocalization__English
} from "./Logging/Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedErrorLocalization__English";
export { default as UnexpectedEventError } from "./Logging/Errors/UnexpectedEvent/UnexpectedEventError";
export {
  default as UnexpectedEventErrorLocalization__English
} from "./Logging/Errors/UnexpectedEvent/UnexpectedEventErrorLocalization__English";
export { default as UnsupportedScenarioError } from "./Logging/Errors/UnsupportedScenario/UnsupportedScenarioError";
export {
  default as UnsupportedScenarioErrorLocalization__English
} from "./Logging/Errors/UnsupportedScenario/UnsupportedScenarioErrorLocalization__English";


/* === Tools ======================================================================================================== */
export { default as RawObjectDataProcessor } from "./RawObjectDataProcessor/RawObjectDataProcessor";
export {
  default as RawObjectDataProcessorLocalization__English
} from "./RawObjectDataProcessor/RawObjectDataProcessorLocalization__English";

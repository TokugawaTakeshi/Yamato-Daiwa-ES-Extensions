/*!
 * @yamato-daiwa/es-extensions v1.6
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */


/* === Arrays ======================================================================================================= */
export { default as addElementsToArray } from "./Arrays/addElementsToArray";
export { default as getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from
    "./Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";
export { default as getIndexesOfArrayElementsWhichSatisfiesThePredicate } from
    "./Arrays/getIndexesOfArrayElementsWhichSatisfiesThePredicate";
export { default as getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from
    "./Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";
export { default as getLastElementOfArray } from "./Arrays/getLastElementOfArray";
export { default as removeArrayElementsByIndexes, type RemovingArrayElementsByIndexesOperation } from
    "./Arrays/removeArrayElementsByIndexes";
export { default as removeArrayElementsByPredicates, type RemovingArrayElementsByPredicatesOperation } from
    "./Arrays/removeArrayElementsByPredicates";
export { default as replaceArrayElementsByIndexesImmutably } from "./Arrays/replaceArrayElementsByIndexesImmutably";
export { default as replaceArrayElementsByPredicates, type ReplacingArrayElementsByPredicatesOperation } from
    "./Arrays/replaceArrayElementsByPredicates";
export { default as twoDimensionalizeArray } from "./Arrays/twoDimensionalizeArray";


/* === Constants and enumerations =================================================================================== */
/* --- Date & Time -------------------------------------------------------------------------------------------------- */
export { default as CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING } from
    "./ConstantsAndEnumerations/DateTime/CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING";
export { default as DaysOfWeek } from "./ConstantsAndEnumerations/DateTime/DaysOfWeek";
export { default as HOURS_PER_STELLAR_DAY } from "./ConstantsAndEnumerations/DateTime/HOURS_PER_STELLAR_DAY";
export { default as MAXIMAL_DAYS_AT_MONTH } from "./ConstantsAndEnumerations/DateTime/MAXIMAL_DAYS_IN_MONTH";
export { default as MINUTES_PER_HOUR } from "./ConstantsAndEnumerations/DateTime/MINUTES_PER_HOUR";
export { default as MONTHS_PER_YEAR } from "./ConstantsAndEnumerations/DateTime/MONTHS_PER_YEAR";
export { default as MonthsNames } from "./ConstantsAndEnumerations/DateTime/MonthsNames";
export { default as SECONDS_PER_MINUTE } from "./ConstantsAndEnumerations/DateTime/SECONDS_PER_MINUTE";

/* --- Date & Time -------------------------------------------------------------------------------------------------- */
export { default as HTTP_Methods } from "./ConstantsAndEnumerations/HTTP/HTTP_Methods";
export {
  HTTP_StatusCodes,
  InformationalResponsesHTTP_StatusCodes,
  SuccessfulResponsesHTTP_StatusCodes,
  RedirectionResponsesHTTP_StatusCodes,
  ClientErrorsHTTP_StatusCodes,
  ServerErrorsHTTP_StatusCodes
} from "./ConstantsAndEnumerations/HTTP/HTTP_StatusCodes";

/* --- Other -------------------------------------------------------------------------------------------------------- */
export { default as YDEE_BUG_REPORTING_PAGE_URI } from "./ConstantsAndEnumerations/YDEE_BUG_REPORTING_PAGE_URI";


/* === Data mocking ================================================================================================= */
export { default as MockGatewayHelper } from "./DataMocking/MockGatewayHelpler/MockGatewayHelper";


/* === Date & Time ================================================================================================== */
export { default as CalendarBuilder } from "./DateTime/CalendarBuilder";
export { default as DateWithoutTime } from "./DateTime/DateWithoutTime";
export { default as doesTimeIntervalsOverlaps } from "./DateTime/doesTimeIntervalsOverlaps";
export { default as getDaysCountInSpecificMonth } from "./DateTime/getDaysCountInSpecificMonth";
export { default as getDaysCountOfPeriod } from "./DateTime/getDaysCountOfPeriod";
export { default as getISO8601StringWithoutTimePart } from "./DateTime/getISO8601StringWithoutTimePart";
export { default as getMonthNameByNumber } from "./DateTime/getMonthNameByNumber";
export { default as getMonthNumberByName } from "./DateTime/getMonthNumberByName";
export { default as getNextMonthNumber } from "./DateTime/getNextMonthNumber";
export { default as getPreviousMonthNumber } from "./DateTime/getPreviousMonthNumber";
export { default as getYearOfNextMonth } from "./DateTime/getYearOfNextMonth";
export { default as getYearOfPreviousMonth } from "./DateTime/getYearOfPreviousMonth";
export { default as hasDateCome } from "./DateTime/hasDateCome";
export { default as hasTimeCome } from "./DateTime/hasTimeCome";
export { default as isEarlierThan } from "./DateTime/isEarlierThan";
export { default as isLaterThan } from "./DateTime/isLaterThan";
export { default as isNotEarlierThan } from "./DateTime/isNotEarlierThan";
export { default as isNotLaterThan } from "./DateTime/isNotLaterThan";
// === TODO 未校閲 ======================================================================================================
export { default as isValidNativeDate } from "./DateTime/isValidNativeDate";
export { default as isValidISO8601DateAndPossiblyTimeDefinition } from "./DateTime/isValidISO8601DateAndPossiblyTimeDefinition";
export { default as millisecondsToSeconds } from "./DateTime/millisecondsToSeconds";
export { default as secondsToMilliseconds } from "./DateTime/secondsToMilliseconds";
export { default as shiftDateBySpecificDaysCount } from "./DateTime/shiftDateBySpecificDaysCount";
export { default as TimePoint } from "./DateTime/TimePoint/TimePoint";
export { default as Timer } from "./DateTime/Timer";
// === TODO 整理 ========================================================================================================
/* === Numbers ====================================================================================================== */
export { default as formatNumberWith4KetaKanji } from "./Numbers/formatNumberWith4KetaKanji";
export { default as getArithmeticMean } from "./Numbers/getArithmeticMean";
export { default as isStringifiedNonNegativeIntegerOfRegularNotation } from
    "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
export { default as roundDownToSpecificIntegerPlaceValue } from "./Numbers/roundDownToSpecificIntegerPlaceValue";
export { default as roundToSpecificNearestIntegerPlaceValue } from "./Numbers/roundToSpecificNearestIntegerPlaceValue";
export { default as roundToSpecifiedNearestDecimalPlaceValue } from "./Numbers/roundToSpecifiedNearestDecimalPlaceValue";
export { default as roundUpToSpecificIntegerPlaceValue } from "./Numbers/roundUpToSpecificIntegerPlaceValue";
export { default as separateEach3DigitsGroupWithComma } from "./Numbers/separateEach3DigitsGroupWithComma";
export { default as separateEach4DigitsGroupWithComma } from "./Numbers/separateEach4DigitsGroupWithComma";

/* === Strings ====================================================================================================== */
export { default as EscapeCharacters } from "./Strings/CharactersAssets/EscapeCharacters";
export { default as lowercaseLatinCharacters } from "./Strings/CharactersAssets/lowercaseLatinCharacters";
export { default as uppercaseLatinCharacters } from "./Strings/CharactersAssets/uppercaseLatinCharacters";
export { default as SpaceCharacters } from "./Strings/CharactersAssets/SpaceCharacters";
export { default as SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag } from
    "./Strings/CharactersAssets/SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag";
export { default as stringifiedDigits } from "./Strings/CharactersAssets/stringifiedDigits";
export { default as areStringifiedDigitsOnly } from "./Strings/areStringifiedDigitsOnly";
export { default as capitalizeFirstCharacter } from "./Strings/capitalizeFirstCharacter";
export { default as EmailAddress } from "./Strings/EmailAddress";
export { default as explodeCasedPhraseToWords } from "./Strings/explodeCasedPhraseToWords";
export { default as extractSubstring } from "./Strings/extractSubstring";
export { default as getEnglishAbbreviatedOrdinalNumber } from "./Strings/getEnglishAbbreviatedOrdinalNumber";
export { default as getLastCharacter } from "./Strings/getLastCharacter";
export { default as getPositionsOfAllSubstringOccurrences } from "./Strings/getPositionsOfAllSubstringOccurrences";
export { default as hasStringOnlySpecificCharacters } from "./Strings/hasStringOnlySpecificCharacters";
export { default as insertSubstring } from "./Strings/insertSubstring";
export { default as insertSubstringIf } from "./Strings/insertSubstringIf";
export { default as isIPv4AddressLiesInRange } from "./Strings/isIPv4AddressLiesInRange";
export { default as removeAllSpecifiedCharacters } from "./Strings/removeAllSpecifiedCharacters";
export { default as removeLastCharacter } from "./Strings/removeLastCharacter";
export { default as removeNonDigitsCharacters } from "./Strings/removeNonDigitsCharacters";
export { default as removeNthCharacter } from "./Strings/removeNthCharacter";
export { default as removeSpecificCharacterFromCertainPosition } from "./Strings/removeSpecificCharacterFromCertainPosition";
export { default as replace2OrMoreSpacesTo1 } from "./Strings/replace2OrMoreSpacesTo1";
export { default as replaceBrHTML_TagToNewLineEscapeSequence } from "./Strings/replaceBrHTML_TagToNewLineEscapeSequence";
export { default as replaceDoubleBackslashesWithForwardSlashes } from "./Strings/replaceDoubleBackslashesWithForwardSlashes";
export { default as reverseString } from "./Strings/reverseString";
export { default as splitString } from "./Strings/splitString";
export { default as stringifyAndFormatArbitraryValue } from "./Strings/stringifyAndFormatArbitraryValue";
export { default as toLowerCamelCase } from "./Strings/toLowerCamelCase";
export { default as toScreamingSnakeCase } from "./Strings/toScreamingSnakeCase";
export { default as toUpperCamelCase } from "./Strings/toUpperCamelCase";
export { default as trimSpaces } from "./Strings/trimSpaces";


/* === Objects ======================================================================================================= */
export { default as getObjectPropertySafely } from "./Objects/getObjectPropertySafely";

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
  ParsedJSON_NestedProperty,
  ReadonlyParsedJSON,
  ReadonlyParsedJSON_Object,
  ReadonlyParsedJSON_Array,
  ReadonlyParsedJSON_NestedProperty
} from "./Types/ParsedJSON";
export type { PartialBy } from "./Types/PartialBy";


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


/* === Pagination =================================================================================================== */
export { default as computeFirstItemNumberForSpecificPaginationPage } from
    "./Pagination/computeFirstItemNumberForSpecificPaginationPage";
export { default as computeLastItemNumberForSpecificPaginationPage } from
    "./Pagination/computeLastItemNumberForSpecificPaginationPage";
export { default as splitToPaginationCollection } from "./Pagination/splitToPaginationCollection";
export type { PaginationCollection } from "./Pagination/splitToPaginationCollection";
export { default as PromisesQueue } from "./Promises/PromisesQueue";


/* === PoliteErrorsMessageBuilder =================================================================================== */
export { default as PoliteErrorsMessagesBuilder } from "./Logging/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilder";
export { default as PoliteErrorsMessagesBuilder__English } from
    "./Logging/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilderLocalization.english";


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
export { default as LoggerLocalization__English } from "./Logging/LoggerLocalization.english";


/* === Errors ======================================================================================================= */
export { default as AlgorithmMismatchError } from "./Errors/AlgorithmMismatch/AlgorithmMismatchError";
export { default as AlgorithmMismatchErrorLocalization__English } from
    "./Errors/AlgorithmMismatch/AlgorithmMismatchErrorLocalization.english";
export { default as ClassRedundantSubsequentInitializationError } from
    "./Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationError";
export { default as ClassRedundantSubsequentInitializationErrorLocalization__English } from
    "./Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationErrorLocalization.english";
export { default as ClassRequiredInitializationHasNotBeenExecutedError } from
    "./Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedError";
export { default as ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English } from
    "./Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedErrorLocalization.english";
export { default as ConfigFileNotFoundError } from "./Errors/ConfigFileNotFound/ConfigFileNotFoundError";
export { default as ConfigFileNotFoundErrorLocalization__English } from
    "./Errors/ConfigFileNotFound/ConfigFileNotFoundErrorLocalization.english";
export { default as CrossBrowserIssueError } from "./Errors/CrossBrowserIssue/CrossBrowserIssueError";
export { default as CrossBrowserIssueErrorLocalization__English } from
    "./Errors/CrossBrowserIssue/CrossBrowserIssueErrorLocalization.english";
export { default as DataRetrievingFailedError } from "./Errors/DataRetrievingFailed/DataRetrievingFailedError";
export { default as DataRetrievingFailedErrorLocalization__English } from
    "./Errors/DataRetrievingFailed/DataRetrievingFailedErrorLocalization.english";
export { default as DataSubmittingFailedError } from "./Errors/DataSubmittingFailed/DataSubmittingFailedError";
export { default as DataSubmittingFailedErrorLocalization__English } from
    "./Errors/DataSubmittingFailed/DataSubmittingFailedErrorLocalization.english";
export { default as DOM_ElementRetrievingFailedError } from
    "./Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedError";
export { default as DOM_ElementRetrievingFailedErrorLocalization__English } from
    "./Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedErrorLocalization.english";
export { default as FileReadingFailedError } from "./Errors/FileReadingFailed/FileReadingFailedError";
export { default as FileReadingFailedErrorLocalization__English } from
    "./Errors/FileReadingFailed/FileReadingFailedErrorLocalization.english";
export { default as FileWritingFailedError } from "./Errors/FileWritingFailed/FileWritingFailedError";
export { default as FileWritingFailedErrorLocalization__English } from
    "./Errors/FileWritingFailed/FileWritingFailedErrorLocalization.english";
export { default as ImproperUsageError } from "./Errors/ImproperUsage/ImproperUsageError";
export { default as ImproperUsageErrorLocalization__English } from
    "./Errors/ImproperUsage/ImproperUsageErrorLocalization.english";
export { default as IncompatiblePropertiesInObjectTypeParameterError } from
    "./Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";
export { default as IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English } from
    "./Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterErrorLocalization.english";
export { default as InterProcessInteractionFailedError } from
    "./Errors/InterProcessInteractionFailed/InterProcessInteractionFailedError";
export { default as InterProcessInteractionFailedErrorLocalization__English } from
    "./Errors/InterProcessInteractionFailed/InterProcessInteractionFailedErrorLocalization.english";
export { default as InvalidConfigError } from "./Errors/InvalidConfig/InvalidConfigError";
export { default as InvalidConfigErrorLocalization__English } from
    "./Errors/InvalidConfig/InvalidConfigErrorLocalization.english";
export { default as InvalidExternalDataError } from "./Errors/InvalidExternalData/InvalidExternalDataError";
export { default as InvalidExternalDataErrorLocalization__English } from
    "./Errors/InvalidExternalData/InvalidExternalDataErrorLocalization.english";
export { default as InvalidParameterValueError } from "./Errors/InvalidParameterValue/InvalidParameterValueError";
export { default as InvalidParameterValueErrorLocalization__English } from
    "./Errors/InvalidParameterValue/InvalidParameterValueErrorLocalization.english";
export { default as ModuleDynamicLoadingFailedError } from
    "./Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedError";
export { default as ModuleDynamicLoadingFailedErrorLocalization__English } from
    "./Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedErrorLocalization.english";
export { default as UnexpectedEventError } from "./Errors/UnexpectedEvent/UnexpectedEventError";
export { default as UnexpectedEventErrorLocalization__English } from
    "./Errors/UnexpectedEvent/UnexpectedEventErrorLocalization.english";
export { default as UnsupportedScenarioError } from "./Errors/UnsupportedScenario/UnsupportedScenarioError";
export { default as UnsupportedScenarioErrorLocalization__English } from
    "./Errors/UnsupportedScenario/UnsupportedScenarioErrorLocalization.english";


/* === Tools ======================================================================================================== */
export { default as RawObjectDataProcessor } from "./RawObjectDataProcessor/RawObjectDataProcessor";
export { default as RawObjectDataProcessorLocalization__English } from
    "./RawObjectDataProcessor/RawObjectDataProcessorLocalization__English";
export { default as convertPotentialStringToNumberIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToNumberIfPossible";
export { default as convertPotentialStringToIntegerIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToIntegerIfPossible";
export { default as convertPotentialStringToFloatIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToFloatIfPossible";

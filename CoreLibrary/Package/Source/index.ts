/*!
 * @yamato-daiwa/es-extensions v1.8
 * (c) 2023 Yamato Daiwa Co., Ltd.
 * Released under the MIT License.
 */


/* ━━━ AJAX ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as AJAX_Service } from "./AJAX/AJAX_Service";
export { default as FetchAPI_Service } from "./AJAX/FetchAPI_Service";
export { default as serializeURI_QueryParameters } from "./AJAX/serializeURI_QueryParameters";
export type { default as URI_QueryParametersSerializer } from "./AJAX/URI_QueryParametersSerializer";


/* ━━━ Arrays ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as addElementsToArray } from "./Arrays/addElementsToArray";
export { default as addElementsToArrayIfTheyAreNotPresentOtherwiseRemove } from
    "./Arrays/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove";
export { default as createArrayOfNaturalNumbers } from "./Arrays/createArrayOfNaturalNumbers";
export { default as cropArray } from "./Arrays/cropArray";
export { default as getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from
    "./Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";
export { default as getIndexesOfArrayElementsWhichSatisfiesThePredicate } from
    "./Arrays/getIndexesOfArrayElementsWhichSatisfiesThePredicate";
export { default as getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from
    "./Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";
export { default as getLastElementOfArray } from "./Arrays/getLastElementOfArray";
export { default as moveArrayElementTo1Position } from "./Arrays/moveArrayElementTo1Position";
export { default as readonlyArrayToMutableOne } from "./Arrays/readonlyArrayToMutableOne";
export { default as removeArrayElementsByIndexes, type RemovingArrayElementsByIndexesOperation } from
    "./Arrays/removeArrayElementsByIndexes";
export { default as removeArrayElementsByPredicates, type RemovingArrayElementsByPredicatesOperation } from
    "./Arrays/removeArrayElementsByPredicates";
export { default as replaceArrayElementsByIndexesImmutably } from "./Arrays/replaceArrayElementsByIndexesImmutably";
export { default as replaceArrayElementsByPredicates, type ReplacingArrayElementsByPredicatesOperation } from
    "./Arrays/replaceArrayElementsByPredicates";
export { default as twoDimensionalizeArray } from "./Arrays/twoDimensionalizeArray";


/* ━━━ Constants and enumerations ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── HTTP ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as HTTP_Methods } from "./ConstantsAndEnumerations/HTTP/HTTP_Methods";
export {
  HTTP_StatusCodes,
  InformationalResponsesHTTP_StatusCodes,
  SuccessfulResponsesHTTP_StatusCodes,
  RedirectionResponsesHTTP_StatusCodes,
  ClientErrorsHTTP_StatusCodes,
  ServerErrorsHTTP_StatusCodes
} from "./ConstantsAndEnumerations/HTTP/HTTP_StatusCodes";

/* ─── Other ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as YDEE_BUG_REPORTING_PAGE_URI } from "./ConstantsAndEnumerations/YDEE_BUG_REPORTING_PAGE_URI";

/* ─── Re-exporting from "fundamental-constants" ──────────────────────────────────────────────────────────────────── */
export {
  HTTP_DEFAULT_PORT,
  HTTPS_DEFAULT_PORT,
  NETWORK_PORT_MAXIMAL_VALUE,
  NETWORK_PORT_MINIMAL_VALUE,
  DAYS_COUNT_IN_WEEK,
  DaysOfWeekNames,
  HOURS_COUNT_IN_STELLAR_DAY,
  MAXIMAL_DAYS_IN_MONTH,
  MINUTES_COUNT_IN_HOUR,
  MONTHS_COUNT_IN_YEAR,
  MonthsNames,
  SECONDS_COUNT_IN_MINUTE,
  CHARACTERS_COUNT_IN_DATE_PART_OF_ISO8601_STRING,
  CHARACTERS_COUNT_IN_FULL_ISO8601_STRING,
  EMAIL_ADDRESS_VALID_PATTERN,
  MAXIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS,
  MINIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS
} from "fundamental-constants";


/* ━━━ Data mocking ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as DataMocking } from "./DataMocking/DataMocking";
export { default as MockGatewayHelper } from "./DataMocking/MockGatewayHelpler/MockGatewayHelper";
export { default as MockGatewayHelperLocalization__English } from
    "./DataMocking/MockGatewayHelpler/MockGatewayHelperLocalization.english";


/* ━━━ Date & Time ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as CalendarBuilder } from "./DateTime/CalendarBuilder";
export { default as DateWithoutTime } from "./DateTime/DateWithoutTime";
export { default as getDaysCountInSpecificMonth } from "./DateTime/getDaysCountInSpecificMonth";
export { default as getISO8601StringWithoutTimePart } from "./DateTime/getISO8601StringWithoutTimePart";
export { default as getMonthNameByNumber } from "./DateTime/getMonthNameByNumber";
export { default as getMonthNumberByName } from "./DateTime/getMonthNumberByName";
export { default as getNextMonthNumber } from "./DateTime/getNextMonthNumber";
export { default as getPreviousMonthNumber } from "./DateTime/getPreviousMonthNumber";
export { default as getYearOfNextMonth } from "./DateTime/getYearOfNextMonth";
export { default as getYearOfPreviousMonth } from "./DateTime/getYearOfPreviousMonth";
export { default as hasTimeCome } from "./DateTime/hasTimeCome";
export { default as isValidISO8601DateAndPossiblyTimeDefinition } from
    "./DateTime/isValidISO8601DateAndPossiblyTimeDefinition";
export { default as isValidNativeDate } from "./DateTime/isValidNativeDate";
export { default as millisecondsToSeconds } from "./DateTime/millisecondsToSeconds";
export { default as secondsToMilliseconds } from "./DateTime/secondsToMilliseconds";
export { default as TimePoint } from "./DateTime/TimePoint";
export { default as Timer } from "./DateTime/Timer";

/* ━━━ Default value substituters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as substituteWhenNull } from "./DefaultValueSubstituters/substituteWhenNull";
export { default as substituteWhenUndefined } from "./DefaultValueSubstituters/substituteWhenUndefined";


/* ━━━ Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as AlgorithmMismatchError } from "./Errors/AlgorithmMismatch/AlgorithmMismatchError";
export { default as algorithmMismatchErrorLocalization__english } from
    "./Errors/AlgorithmMismatch/AlgorithmMismatchErrorLocalization.english";
export { default as ClassRedundantSubsequentInitializationError } from
    "./Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationError";
export { default as classRedundantSubsequentInitializationErrorLocalization__english } from
    "./Errors/ClassRedundantSubsequentInitialization/ClassRedundantSubsequentInitializationErrorLocalization.english";
export { default as ClassRequiredInitializationHasNotBeenExecutedError } from
    "./Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedError";
export { default as classRequiredInitializationHasNotBeenExecutedErrorLocalization__english } from
    "./Errors/ClassRequiredInitializationHasNotBeenExecuted/ClassRequiredInitializationHasNotBeenExecutedErrorLocalization.english";
export { default as ConfigFileNotFoundError } from "./Errors/ConfigFileNotFound/ConfigFileNotFoundError";
export { default as configFileNotFoundErrorLocalization__english } from
    "./Errors/ConfigFileNotFound/ConfigFileNotFoundErrorLocalization.english";
export { default as CrossBrowserIssueError } from "./Errors/CrossBrowserIssue/CrossBrowserIssueError";
export { default as crossBrowserIssueErrorLocalization__english } from
    "./Errors/CrossBrowserIssue/CrossBrowserIssueErrorLocalization.english";
export { default as DataRetrievingFailedError } from "./Errors/DataRetrievingFailed/DataRetrievingFailedError";
export { default as dataRetrievingFailedErrorLocalization__english } from
    "./Errors/DataRetrievingFailed/DataRetrievingFailedErrorLocalization.english";
export { default as DataSubmittingFailedError } from "./Errors/DataSubmittingFailed/DataSubmittingFailedError";
export { default as dataSubmittingFailedErrorLocalization__english } from
    "./Errors/DataSubmittingFailed/DataSubmittingFailedErrorLocalization.english";
export { default as DOM_ElementRetrievingFailedError } from
    "./Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedError";
export { default as DOM_ElementRetrievingFailedErrorLocalization__english } from
    "./Errors/DOM_ElementRetrievingFailed/DOM_ElementRetrievingFailedErrorLocalization.english";
export { default as FileReadingFailedError } from "./Errors/FileReadingFailed/FileReadingFailedError";
export { default as fileReadingFailedErrorLocalization__english } from
    "./Errors/FileReadingFailed/FileReadingFailedErrorLocalization.english";
export { default as FileWritingFailedError } from "./Errors/FileWritingFailed/FileWritingFailedError";
export { default as fileWritingFailedErrorLocalization__english } from
    "./Errors/FileWritingFailed/FileWritingFailedErrorLocalization.english";
export { default as HTTP_ResponseBodyParsingFailureError } from
    "./Errors/HTTP/ResponseBodyParsingFailure/HTTP_ResponseBodyParsingFailureError";
export { default as HTTP_ResponseBodyParsingFailureErrorLocalization__english } from
    "./Errors/HTTP/ResponseBodyParsingFailure/HTTP_ResponseBodyParsingFailureErrorLocalization.english";
export { default as ImproperUsageError } from "./Errors/ImproperUsage/ImproperUsageError";
export { default as improperUsageErrorLocalization__english } from
    "./Errors/ImproperUsage/ImproperUsageErrorLocalization.english";
export { default as IncompatiblePropertiesInObjectTypeParameterError } from
    "./Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterError";
export { default as incompatiblePropertiesInObjectTypeParameterErrorLocalization__english } from
    "./Errors/IncompatiblePropertiesInObjectTypeParameter/IncompatiblePropertiesInObjectTypeParameterErrorLocalization.english";
export { default as InterProcessInteractionFailedError } from
    "./Errors/InterProcessInteractionFailed/InterProcessInteractionFailedError";
export { default as interProcessInteractionFailedErrorLocalization__english } from
    "./Errors/InterProcessInteractionFailed/InterProcessInteractionFailedErrorLocalization.english";
export { default as InvalidConfigError } from "./Errors/InvalidConfig/InvalidConfigError";
export { default as invalidConfigErrorLocalization__english } from
    "./Errors/InvalidConfig/InvalidConfigErrorLocalization.english";
export { default as InvalidExternalDataError } from "./Errors/InvalidExternalData/InvalidExternalDataError";
export { default as invalidExternalDataErrorLocalization__english } from
    "./Errors/InvalidExternalData/InvalidExternalDataErrorLocalization.english";
export { default as InvalidParameterValueError } from "./Errors/InvalidParameterValue/InvalidParameterValueError";
export { default as invalidParameterValueErrorLocalization__english } from
    "./Errors/InvalidParameterValue/InvalidParameterValueErrorLocalization.english";
export { default as ModuleDynamicLoadingFailedError } from
    "./Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedError";
export { default as moduleDynamicLoadingFailedErrorLocalization__english } from
    "./Errors/ModuleDynamicLoadingFailed/ModuleDynamicLoadingFailedErrorLocalization.english";
export { default as UnexpectedEventError } from "./Errors/UnexpectedEvent/UnexpectedEventError";
export { default as unexpectedEventErrorLocalization__english } from
    "./Errors/UnexpectedEvent/UnexpectedEventErrorLocalization.english";
export { default as UnsupportedScenarioError } from "./Errors/UnsupportedScenario/UnsupportedScenarioError";
export { default as unsupportedScenarioErrorLocalization__english } from
    "./Errors/UnsupportedScenario/UnsupportedScenarioErrorLocalization.english";


/* ━━━ Files ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as encodeFileToBase64 } from "./Files/encodeFileToBase64";


/* ━━━ Linear Algebra ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Classes ────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as ColumnVector } from "./LinearAlgebra/Classes/ColumnVector";
export { default as Matrix } from "./LinearAlgebra/Classes/Matrix";
export { default as ReadonlyColumnVector } from "./LinearAlgebra/Classes/ReadonlyColumnVector";
export { default as ReadonlyRowVector } from "./LinearAlgebra/Classes/ReadonlyRowVector";
export { default as RowVector } from "./LinearAlgebra/Classes/ReadonlyRowVector";

/* ━━━ Logging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── PoliteErrorsMessageBuilder ─────────────────────────────────────────────────────────────────────────────────── */
export { default as PoliteErrorsMessagesBuilder } from "./Logging/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilder";
export { default as PoliteErrorsMessagesBuilder__English } from
      "./Logging/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilderLocalization.english";

/* ─── Rest ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
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
export { default as loggerLocalization__english } from "./Logging/LoggerLocalization.english";


/* ━━━ Maps ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as addEntriesToMap } from "./Maps/addEntriesToMap";
export { default as createMapBasedOnOtherMap } from "./Maps/createMapBasedOnOtherMap";
export { default as filterMap } from "./Maps/filterMap";
export { removeEntriesFromMap, type RemovingEntriesFromMapOperation } from "./Maps/removeEntriesFromMap";
export { default as replaceValuesInMap, type ReplaceOfValuesInMapOperation } from "./Maps/replaceValuesInMap";

/* ━━━ Numbers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as formatNumberWith4KetaKanji } from "./Numbers/formatNumberWith4KetaKanji";
export { default as getArithmeticMean } from "./Numbers/getArithmeticMean";
export { default as isStringifiedNonNegativeIntegerOfRegularNotation } from
    "./Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";
export { default as limitMaximalValue } from "./Numbers/limitMaximalValue";
export { default as limitMinimalValue } from "./Numbers/limitMinimalValue";
export { default as roundDownToSpecificIntegerPlaceValue } from "./Numbers/roundDownToSpecificIntegerPlaceValue";
export { default as roundToSpecificNearestIntegerPlaceValue } from "./Numbers/roundToSpecificNearestIntegerPlaceValue";
export { default as roundToSpecifiedNearestDecimalPlaceValue } from "./Numbers/roundToSpecifiedNearestDecimalPlaceValue";
export { default as roundUpToSpecificIntegerPlaceValue } from "./Numbers/roundUpToSpecificIntegerPlaceValue";
export { default as separateEach3DigitsGroupWithComma } from "./Numbers/separateEach3DigitsGroupWithComma";
export { default as separateEach4DigitsGroupWithComma } from "./Numbers/separateEach4DigitsGroupWithComma";


/* ━━━ Objects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as getObjectPropertySafely } from "./Objects/getObjectPropertySafely";


/* ━━━ Pagination ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as computeFirstItemNumberForSpecificPaginationPage } from
    "./Pagination/computeFirstItemNumberForSpecificPaginationPage";
export { default as computeLastItemNumberForSpecificPaginationPage } from
    "./Pagination/computeLastItemNumberForSpecificPaginationPage";
export { default as getItemsOfPaginationPage } from "./Pagination/getItemsOfPaginationPage";
export { default as PaginationCollection } from "./Pagination/PaginationCollection";


/* ━━━ Promises ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as PromisesQueue } from "./Promises/PromisesQueue";


/* ━━━ Random values generators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export {
  default as getRandomString,
  RandomStringsGenerator
} from "./RandomValuesGenerators/getRandomString/getRandomString";
export { default as getRandomArrayElement } from "./RandomValuesGenerators/getRandomArrayElement";
export { default as getRandomBoolean } from "./RandomValuesGenerators/getRandomBoolean";
export { default as getRandomInteger } from "./RandomValuesGenerators/getRandomInteger";
export { default as getRandomLatinCharacter } from "./RandomValuesGenerators/getRandomLatinCharacter";
export { default as getRandomObjectPropertyValue } from "./RandomValuesGenerators/getRandomObjectPropertyValue";
export { default as getRandomSubarray } from "./RandomValuesGenerators/getRandomSubarray";
export { default as getSpecificBooleanValueWithProbability } from
    "./RandomValuesGenerators/getSpecificBooleanValueWithProbability";
export { default as removeRandomArrayElement } from "./RandomValuesGenerators/removeRandomArrayElement";


/* ━━━ Raw object data processor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as RawObjectDataProcessor } from "./RawObjectDataProcessor/RawObjectDataProcessor";
export { default as rawObjectDataProcessorLocalization__english } from
    "./RawObjectDataProcessor/RawObjectDataProcessorLocalization.english";
export { default as convertPotentialStringToNumberIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToNumberIfPossible";
export { default as convertPotentialStringToIntegerIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToIntegerIfPossible";
export { default as convertPotentialStringToFloatIfPossible } from
    "./RawObjectDataProcessor/Helpers/convertPotentialStringToFloatIfPossible";


/* ━━━ Sets ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as createSetBasedOnOtherSet } from "./Sets/createSetBasedOnOtherSet";
export { default as addMultipleElementsToSet } from "./Sets/addMultipleElementsToSet";


/* ━━━ Strings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Characters assets ──────────────────────────────────────────────────────────────────────────────────────────── */
export { default as EscapeCharacters } from "./Strings/CharactersAssets/EscapeCharacters";
export { default as lowercaseLatinCharacters } from "./Strings/CharactersAssets/lowercaseLatinCharacters";
export { default as SpaceCharacters } from "./Strings/CharactersAssets/SpaceCharacters";
export { default as SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag } from
    "./Strings/CharactersAssets/SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag";
export { default as stringifiedDigits } from "./Strings/CharactersAssets/stringifiedDigits";
export { default as uppercaseLatinCharacters } from "./Strings/CharactersAssets/uppercaseLatinCharacters";


/* ─── Line separators ────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as getLineSeparatorType } from "./Strings/LineSeparators/getLineSeparatorType";
export { default as LineSeparators } from "./Strings/LineSeparators/LineSeparators";


/* ─── Regular expressions ────────────────────────────────────────────────────────────────────────────────────────── */
export { default as getMatchingWithFirstRegularExpressionCapturingGroup } from
    "./Strings/RegularExpressions/getMatchingWithFirstRegularExpressionCapturingGroup";
export {
  default as extractMatchingsWithRegularExpression,
  type ExtractingOfMatchingsWithRegularExpression
} from "./Strings/RegularExpressions/extractMatchingsWithRegularExpression";
export {
  default as replaceMatchesWithRegularExpressionToDynamicValue,
  type ReplacingOfMatchesWithRegularExpressionToDynamicValue
} from "./Strings/RegularExpressions/replaceMatchesWithRegularExpressionToDynamicValue";


/* ─── URI ────────────────────────────────────────────────────────────────────────────────────────────────────────── */
/* --- Files and directories ---------------------------------------------------------------------------------------- */
export { default as appendLastFileNameExtension } from "./Strings/URI/FilesAndDirectories/appendLastFileNameExtension";
export { default as extractAllFileNameExtensions } from "./Strings/URI/FilesAndDirectories/extractAllFileNameExtensions";
export { default as extractFileNameWithAllExtensionsFromPath } from
    "./Strings/URI/FilesAndDirectories/extractFileNameWithAllExtensionsFromPath";
export { default as extractFileNameWithoutAnyExtensions } from
    "./Strings/URI/FilesAndDirectories/extractFileNameWithoutAnyExtensions";
export { default as extractFileNameWithoutLastExtension } from
    "./Strings/URI/FilesAndDirectories/extractFileNameWithoutLastExtension";
export { default as extractLastExtensionOfFileName } from "./Strings/URI/FilesAndDirectories/extractLastExtensionOfFileName";
export { default as removeAllFileNameExtensions } from "./Strings/URI/FilesAndDirectories/removeAllFileNameExtensions";

/* --- Rest --------------------------------------------------------------------------------------------------------- */
export { default as appendFragmentToURI } from "./Strings/URI/appendFragmentToURI";
export { default as explodeURI_PathToSegments } from "./Strings/URI/explodeURI_PathToSegments";
export { default as getURI_Fragment } from "./Strings/URI/getURI_Fragment";
export { default as getURI_PartWithoutFragment } from "./Strings/URI/getURI_PartWithoutFragment";
export { default as removeSpecificSegmentsFromURI_Path } from "./Strings/URI/removeSpecificSegmentsFromURI_Path";
export { default as replaceLastURI_PathSegment } from "./Strings/URI/replaceLastURI_PathSegment";

/* ─── Rest ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as appendCharacterIfItDoesNotPresentInLastPosition } from
    "./Strings/appendCharacterIfItDoesNotPresentInLastPosition";
export { default as capitalizeFirstCharacter } from "./Strings/capitalizeFirstCharacter";
export { default as cropString } from "./Strings/cropString";
export { default as EmailAddress } from "./Strings/EmailAddress";
export { default as explodeCasedPhraseToWords } from "./Strings/explodeCasedPhraseToWords";
export { default as explodeStringToLines } from "./Strings/explodeStringToLines";
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
export { default as surroundLabelByOrnament } from "./Strings/surroundLabelByOrnament";
export { default as toLowerCamelCase } from "./Strings/toLowerCamelCase";
export { default as toScreamingSnakeCase } from "./Strings/toScreamingSnakeCase";
export { default as toUpperCamelCase } from "./Strings/toUpperCamelCase";
export { default as trimSpaces } from "./Strings/trimSpaces";


/* ━━━ Type Guards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Arrays ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isArrayOfCertainTypeElements } from "./TypeGuards/Arrays/isArrayOfCertainTypeElements";
export { default as isArrayOfLength, IsArrayOfLengthCheckingOperation } from "./TypeGuards/Arrays/isArrayOfLength";
export { default as isEmptyArray } from "./TypeGuards/Arrays/isEmptyArray";
export { default as isNonEmptyArray } from "./TypeGuards/Arrays/isNonEmptyArray";

/* ─── Nullables ──────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isNeitherUndefinedNorNull } from "./TypeGuards/Nullables/isNeitherUndefinedNorNull";
export { default as isEitherUndefinedOrNull } from "./TypeGuards/Nullables/isEitherUndefinedOrNull";
export { default as isNotNull } from "./TypeGuards/Nullables/isNotNull";
export { default as isNotUndefined } from "./TypeGuards/Nullables/isNotUndefined";
export { default as isNull } from "./TypeGuards/Nullables/isNull";
export { default as isUndefined } from "./TypeGuards/Nullables/isUndefined";

/* ─── Numbers ────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isDecimalFractionOfAnySign } from "./TypeGuards/Numbers/isDecimalFractionOfAnySign";
export { default as isNaturalNumber } from "./TypeGuards/Numbers/isNaturalNumber";
export { default as isNegativeDecimalFraction } from "./TypeGuards/Numbers/isNegativeDecimalFraction";
export { default as isNegativeInteger } from "./TypeGuards/Numbers/isNegativeInteger";
export { default as isNegativeIntegerOrZero } from "./TypeGuards/Numbers/isNegativeIntegerOrZero";
export { default as isNonNegativeInteger } from "./TypeGuards/Numbers/isNonNegativeInteger";
export { default as isNumber } from "./TypeGuards/Numbers/isNumber";
export { default as isPositiveDecimalFraction } from "./TypeGuards/Numbers/isPositiveDecimalFraction";

/* ─── Objects ────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isArbitraryObject } from "./TypeGuards/Objects/isArbitraryObject";
export { default as isEmptyObject } from "./TypeGuards/Objects/isEmptyObject";
export { default as isNonEmptyArbitraryObject } from "./TypeGuards/Objects/isNonEmptyArbitraryObject";
export { default as isNonEmptyObject } from "./TypeGuards/Objects/isNonEmptyObject";
export { default as isNonNullObject } from "./TypeGuards/Objects/isNonNullObject";

/* ─── ParsedJSON ─────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isPossiblyReadonlyParsedJSON } from "./TypeGuards/ParsedJSON/isPossiblyReadonlyParsedJSON";
export { default as isPossiblyReadonlyParsedJSON_Object } from "./TypeGuards/ParsedJSON/isPossiblyReadonlyParsedJSON_Object";

/* ─── Strings ────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as areStringifiedDigitsOnly } from "./TypeGuards/Strings/areStringifiedDigitsOnly";
export { default as isEmptyString } from "./TypeGuards/Strings/isEmptyString";
export { default as isNonEmptyString } from "./TypeGuards/Strings/isNonEmptyString";
export { default as isString } from "./TypeGuards/Strings/isString";
export { default as isStringOfLength, IsStringOfLengthCheckingOperation } from "./TypeGuards/Strings/isStringOfLength";

/* ─── Rest ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
export { default as isBoolean } from "./TypeGuards/isBoolean";
export { default as isElementOfEnumeration } from "./TypeGuards/isElementOfEnumeration";
export { default as isFunctionLike } from "./TypeGuards/isFunctionLike";


/* ━━━ Types ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
  ReadonlyParsedJSON_NestedProperty,
  PossiblyReadonlyParsedJSON
} from "./Types/ParsedJSON";
export type { PartialBy } from "./Types/PartialBy";


/* ━━━ Value transformers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as emptyStringToNull } from "./ValueTransformers/emptyStringToNull";
export { default as nullToEmptyString } from "./ValueTransformers/nullToEmptyString";
export { default as nullToUndefined } from "./ValueTransformers/nullToUndefined";
export { default as nullToZero } from "./ValueTransformers/nullToZero";
export { default as undefinedToEmptyArray } from "./ValueTransformers/undefinedToEmptyArray";
export { default as undefinedToEmptyString } from "./ValueTransformers/undefinedToEmptyString";
export { default as undefinedToNull } from "./ValueTransformers/undefinedToNull";

+ (( Core Package )) (( New )) Add **DateWithoutTime** class
+ (( Core Package )) (( New )) (( Date & Time )) Add **getISO8601StringWithoutTimePart** function
+ (( Core Package )) (( New )) (( Date & Time )) Add **isValidISO8601DateAndPossiblyTimeDefinition** function
+ (( Core Package )) (( New )) (( Date & Time )) Add **isValidNativeDate** function
+ (( Core Package )) (( New )) (( Date & Time )) Add **convert24HoursFormatTo12HoursFormat** function
+ (( Core Package )) (( Feature )) Now **RawObjectDataProcessor** class can substitute the `undefined` and `null` values to existing objects
+ (( Core Package ))(( Linear Algebra )) (( New )) Add **ColumnVector** class
+ (( Core Package ))(( Linear Algebra )) (( New )) Add **Matrix** class
+ (( Core Package ))(( Linear Algebra )) (( New )) Add **ReadonlyColumnVector** class
+ (( Core Package ))(( Linear Algebra )) (( New )) Add **ReadonlyRowVector** class
+ (( Core Package ))(( Linear Algebra )) (( New )) Add **RowVector** class
+ (( Core Package )) (( New )) Add **Matrix** class
+ (( Core Package )) (( Update )) Add overloading for numeric type parameter
+ (( Core Package )) (( Update )) Now **undefinedToEmptyArray** works can return `ReadonlyArray` if required
+ (( Core Package )) (( Breaking )) (( Arrays )) **getIndexesOfArrayElementsWhichSatisfiesThePredicate** has been renamed to **getIndexesOfSatisfiesThePredicateArrayElements**
+ (( Core Package )) (( Breaking )) (( Strings )) Update API of **getMatchingWithFirstRegularExpressionCapturingGroup**.
+ (( Core Package )) (( Breaking )) **RawObjectDataProcessor** now manipulating with source object as default
+ (( Core Package )) (( Breaking )) Update API of **TimePoint** class
+ (( Core Package )) (( Breaking )) Update API of **DataRetrievingFailedError** and **DataSubmittingFailedError** and localizations
+ (( Core Package )) (( Breaking )) Update API and refactor **AJAX_Service** and **FetchAPI_Service**
+ (( Core Package )) (( Breaking )) Remove class members related with localization from **TimePoint** class
+ (( Core Package )) (( Breaking )) Remove **TimePointLocalization__English** and **setLocalization** method from **TimePoint**
+ (( Core Package )) (( Breaking )) Update API of **ILogger** interface and **Logger** class
+ (( Core Package )) (( Non-breaking Change )) **createSetBasedOnOtherSet** now accepts **ReadonlySet** type
+ (( Core Package )) (( Fix )) (( Strings )) Now **getMatchingWithFirstRegularExpressionCapturingGroup** processes correctly the multi-line strings
+ (( Core Package )) (( Chore )) Update dependencies to the newest ones
+ (( BrowserJS package )) (( Chore )) Manually reflect the newest code of 1.7.0
+ (( Chore )) Update ESLint to newest, apply all breaking changes and fix the ESLint issues
+ (( Chore )) Remove Lerna and related files
+ (( BrowserJS Package )) (( New )) Add **extractAndValidateDatasetFromDOM_Element** function
+ (( BrowserJS Package )) (( Update )) Reflect changes of **ILogger** interface to **BasicFrontEndLogger** class
+ (( NodeJS Package )) (( Update )) Reflect changes of **ILogger** interface to **ConsoleApplicationLogger** class

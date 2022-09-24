## Main package

### New functionality

#### Strings

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/explodeCasedPhraseToWords.md">explodeCasedPhraseToWords</a></dt>
  <dd>Explodes the string containing grammatically normal or cased (camel case, snake case, etc.) expression to words and returns the array of them. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/isIPv4AddressLiesInRange.md">isIPv4AddressLiesInRange</a></dt>
  <dd>Check does specified IP address lies in specific range.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toLowerCamelCase.md">toLowerCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to (lower) camel case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toScreamingSnakeCase.md">toScreamingSnakeCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to screaming snake case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toUpperCamelCase.md">toUpperCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to upper camel case AKA Pascal case. Currently, 26 latin characters of English alphabet are supported.</dd>

</dl>


#### Objects

<dl>

 <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Objects/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getObjectPropertySafely.md">getObjectPropertySafely</a></dt>
  <dd>
    Works as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">optional chaining</a> but could be used for any fully-qualified name and returns value which being considered as <code>unknown</code>. 
    Intended to be used when the schema of value is not known enough (for example, because of lack of TypeScript type definition).
  </dd>

</dl>


#### Constants and enumerations

* [InformationalResponsesHTTP_StatusCodes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#information-responses)
* [SuccessfulResponsesHTTP_StatusCodes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#successful-responses)
* [RedirectionResponsesHTTP_StatusCodes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#redirection-messages)
* [ClientErrorsHTTP_StatusCodes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#client-error-responses)
* [ServerErrorsHTTP_StatusCodes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#server-error-responses)


#### Logging

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilder.md">PoliteErrorsMessagesBuilder</a></dt>
  <dd>Building the polite error message with standard idioms, requesting to report the issue with appended technical details and polite explanations.</dd>
</dl>


### Updates

* Add new statuses to [**HTTP_StatusCodes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#all) enumeration
* **ConfigFileNotFoundError** now supports the message with appended specific part. This change has been applied to all official localizations.


### Breaking changes
#### Constants and enumerations
##### HTTP_StatusCodes

Below elements has been renamed according [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status):

* requestEntityTooLarge → payloadTooLarge
* requestURL_TooLong → URI_TooLong
* requestedRangeNotSatisfiable → rangeNotSatisfiable


##### Strings

* The array **latinCharacters__lowercase** has been renamed to **lowercaseLatinCharacters**.
* The array **latinCharacters__uppercase** has been renamed to **uppercaseLatinCharacters**.


##### Errors classes

* `parameterNumber` property has been added to object-type parameter of default message template

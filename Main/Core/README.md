# Yamato Daiwa E(CMA)S(cript) Extensions [YDEE]

[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package)
[![MIT](https://img.shields.io/badge/MIT-green?style=for-the-badge)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)
![No third-party dependencies](https://img.shields.io/badge/Dependencies-No--third_party_dependencies-brightgreen.svg?style=flat)

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions?sponsor=1)
[![PAYPAL](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/tokugawatakeshi)
[![LIBERAPAY](	https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black)](https://liberapay.com/TokugawaT-YD)


Helper functions and classes aimed to reduce the routine code. 
Build-in TypeScript type safety without `any` type.
Oriented to TypeScript users investing the time to quality including type-safety.

![Hero image of @yamato-daiwa/es-extensions](https://repository-images.githubusercontent.com/376176365/ab848ff3-8bfb-4142-8b8f-fe191340bb3a)


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```

## Documentation
### Table of Contents

+ Get Started
  + [Installation](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#INSTALLATION--SECTION)
  + [Information About Distribution Size](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#DISTRIBUTIVE_VOLUME_NOTICE--SECTION)
  + [Precautions for Non-Users of TypeScript](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#NON_TYPE_SCRIPT_USAGE_WARNING--SECTION)
  + [Importing Functionality](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#IMPORTING_OF_FUNCTIONALITY--SECTION)
+ <a href="#AJAX">AJAX</a>
  + <a href="#AJAX_ServiceClass"><code>AJAX_Service</code> Class</a>
+ <a href="#Arrays">Arrays</a>

### Getting Started

+ [Installation](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#INSTALLATION--SECTION)
+ [Information About Distribution Size](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#DISTRIBUTIVE_VOLUME_NOTICE--SECTION)
+ [Precautions for Non-Users of TypeScript](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#NON_TYPE_SCRIPT_USAGE_WARNING--SECTION)
+ [Importing Functionality](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#IMPORTING_OF_FUNCTIONALITY--SECTION)

<h3 id="AJAX">AJAX</h3>
<h4 id="AJAX_ServiceClass"><code>AJAX_Service</code> Class</h4>

The facade for the convenient usage of [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX") with maximal 
  type-safety and less code.

+ Integrated with [RawObjectDataProcessor](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html)
    for validation and, if required, processing of the response data.
+ Needs some implementation, but there is [FetchAPI_Service](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html),
    the pre-made one.


##### Public Static Fields

<dl>

  <dt><code>implementation</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd><code>AJAX_Service | null</code></dd>
      <dt>Initial Value</dt>
      <dd><code>null</code></dd>
      <dt>Description</dt>
      <dd>
        Intended to be assigned with some inheritor of <code>AJAX_Service</code>, for example,
          <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html">FetchAPI_Service</a>.
        It must be done before any other usage of <code>AJAX_Service</code>.  
      </dd>
    </dl>
    
  </dd>

</dl>


##### Protected Static Fields

<dl>

  <dt><code>API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd><code>string | null</code></dd>
      <dt>Initial Value</dt>
      <dd><code>null</code></dd>
      <dt>Valid Value Example</dt>
      <dd><code>https://example.com/api</code></dd>
      <dt>Description</dt>
      <dd>
        Intended to be specified with the origin and, optioonally, partial path (like <code>/api</code>) via 
          <code>API_SERVER_URI_CONSTANT_PART</code>, the public static setter.
        <ul>
          <li>If not specified, the call some API, the full request URI must be specified each time.</li>
          <li>
            As it following from the property name, the trailing shash is not required, but even it presents,
              it will be correctly processed.
          </li>
        </ul>
      </dd>
    </dl>
  </dd>

  <dt><code>URI_QueryParametersSerializer</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd><code>(URI_QueryParameters: ReadonlyParsedJSON) => string</code></dd>
      <dt>Initial Value</dt>
      <dd><code>serializeURI_QueryParameters</code></dd>
      <dt>Description</dt>
      <dd>
        The function accepting the JSON-compatible object and returting the query string without leanding question mark.
        Currently, the default implementation does not support the serialization of nested object/arrays, but the
          <a href="https://www.npmjs.com/package/qs">qs</a> is the good option.
      </dd>
    </dl>
  </dd>

</dl>


##### Public Static Setters

<dl>

  <dt><code>API_SERVER_URI_CONSTANT_PART</code></dt>
  <dd>
    Intended to be specified with the origin and, optioonally, partial path (like <code>/api</code>) 
      <code>API_SERVER_URI_CONSTANT_PART</code>.
    The trailing slash is optional.
  </dd>

</dl>


##### Public Static Methods
###### `setup`

```
(
  properties: {
    implementation?: AJAX_Service;
    API_ServerURI_ConstantPart?: string;
    URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
  }
) => void
```

Allows to initialize the facade at once.
It is recommended to call this method in the entry point before any other usage.

<dl>

  <dt>Parameters</dt>
  <dd>
    <ol>
      <li>
        <dl>
          <dt>Generic Name</dt>
          <dd>Properties</dd>
          <dt>Type</dt>
          <dd><code>object</code></dd>
          <dt>Schema</dt>
          <dd>
            <pre><code>
{
  implementation?: AJAX_Service;
  API_ServerURI_ConstantPart?: string;
  URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
}
            </code></pre>
          </dd>
        </dl>
      </li>
    </ol>
  </dd>

  <dt>Is required</dt>
  <dd>No</dd>

  <dt>Schema<dt>
  <dd><pre><code>
{
  presetFileRelativePath?: string;
  enable?: boolean;
}
  </code></pre></dd>

</dl>


###### `retrieveData`

```
<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
  compoundParameter: AJAX_Service.ObjectDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.ObjectDataResponse<RawValidResponseData>>
```

Retrieving the data, then validates it by 
  [RawObjectDataProcessor](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html).

+ The data retrieving behavior is implementation-dependent, but the data validation behavior is common.
+ The implementation will fail the data retrieving with an error, the `DataRetrievingFailedError` will be thrown.
+ If the data will not pass the validation, the `InvalidExternalDataError` will be thrown.

The implementation must support the following options:

```typescript
type CompoundParameter =
  
    URI_PathRawDefinition &
    
    URI_QueryParametersDefinition &
    
    Readonly<{
      HTTP_Method?: HTTP_Methods;
      HTTP_Headers?: HTTP_Headers;
      validResponseDataSpecification: Readonly<RawObjectDataProcessor.ObjectDataSpecification>;
      mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
    }>;
```

where

```typescript
type URI_PathRawDefinition = Readonly<
  { alternatingURI_PathPart: string; } |
  { specificURI_UntilPath: string; }
>;

type URI_QueryParametersDefinition = Readonly<{
  URI_QueryParameters?: Readonly<ReadonlyParsedJSON_Object>;
  URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
}>;
```

The return value is represented by the object will following schema:

```typescript
type ObjectDataResponse<ResponseData extends PossiblyReadonlyParsedJSON = PossiblyReadonlyParsedJSON> =
  
    Readonly<(
      (
        {
          isSuccessful: true;
          data: ResponseData;
        } |
        (
          { isSuccessful: false; } &
          (
            { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
            { errorTextPayload: string; }
          )
        )
      ) &
      {
        HTTP_Status: number;
        HTTP_Headers: HTTP_Headers;
      }
    )>;
```


###### `submitData`

```
/* [ Overload No. 1 ] Validation of Response Data */
(
  compoundParameter: AJAX_Service.ObjectDataSubmitting.WithExpectedResponseData.CompoundParameter
) => Promise<AJAX_Service.ObjectDataResponse<RawValidResponseData>>;


/* [ Overload No. 2 ] No response data expected */
(
  compoundParameter: AJAX_Service.ObjectDataSubmitting.WithoutExpectedResponseData.CompoundParameter
) => Promise<AJAX_Service.ObjectDataResponse>
```

Submitting the data and, optionally, do the same things with response data as `retrieveData` method.

For the case with response data, the implementation must support the following options:

```typescript
export type CompoundParameter =
  URI_PathRawDefinition &
  URI_QueryParametersDefinition &
  Readonly<{
    HTTP_Method?: HTTP_Methods;
    HTTP_Headers?: HTTP_Headers;
    requestData: Readonly<ReadonlyParsedJSON_Object>;
    validResponseDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
    mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
  }>;
```

where 

```typescript
type URI_PathRawDefinition = Readonly<
  { alternatingURI_PathPart: string; } |
  { specificURI_UntilPath: string; }
>;

type URI_QueryParametersDefinition = Readonly<{
  URI_QueryParameters?: Readonly<ReadonlyParsedJSON_Object>;
  URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
}>;
```

For the case without response data, the parameter will not have `validResponseDataSpecification` property:

```typescript
export type CompoundParameter =
  URI_PathRawDefinition &
  URI_QueryParametersDefinition &
  Readonly<{
    HTTP_Method?: HTTP_Methods;
    HTTP_Headers?: HTTP_Headers;
    requestData: Readonly<ReadonlyParsedJSON_Object>;
    mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
  }>;
```

In any case, the return value is represented by the object of the following schema:

```typescript
export type ObjectDataResponse<ResponseData extends PossiblyReadonlyParsedJSON = PossiblyReadonlyParsedJSON> =
    Readonly<(
      (
        {
          isSuccessful: true;
          data: ResponseData;
        } |
        (
          { isSuccessful: false; } &
          (
            { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
            { errorTextPayload: string; }
          )
        )
      ) &
      {
        HTTP_Status: number;
        HTTP_Headers: HTTP_Headers;
      }
    )>;
```

This way, when `validResponseDataSpecification` not specified, the `data` property of the return value
  will have `PossiblyReadonlyParsedJSON` type.


###### `retrieveText`

```
(
  compoundParameter: AJAX_Service.TextDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.TextDataResponse>
```

Retrieve the text data including the HTML code.

The implementation must support the following options:

```typescript
export type CompoundParameter =
  URI_PathRawDefinition &
  URI_QueryParametersDefinition &
  Readonly<{
    HTTP_Method?: HTTP_Methods;
    HTTP_Headers?: HTTP_Headers;
    requestData?: ReadonlyParsedJSON_Object;
    mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
  }>;
```

The return value will be represented by the object of the following scema:

```typescript
export type TextDataResponse = Readonly<
  (
    {
      isSuccessful: true;
      text: string;
    } |
    (
      { isSuccessful: false; } &
      (
        { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
        { errorTextPayload: string; }
      )
    )
  ) &
  {
    HTTP_Status: number;
    HTTP_Headers: HTTP_Headers;
  }
>;
```


##### Protected Abstract Methods
###### `retrieveResponseWithRawObjectData`

```
(
  compoundParameter: AJAX_Service.RawObjectDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.RawObjectDataResponse>
```

The implementation of this method must retrieve the data corresponding to passed options without validation yet:

```typescript
namespace RawObjectDataRetrieving {

  export type CompoundParameter = {
    URI: string;
    HTTP_Method: HTTP_Methods;
    HTTP_Headers: HTTP_Headers;
    mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
  };

}
```

The response must have the following schema:

```typescript
type RawObjectDataResponse = 
  
  (
    {
      isSuccessful: true;
      data: PossiblyReadonlyParsedJSON;
    } |
    (
      { isSuccessful: false; } &
      (
        { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
        { errorTextPayload: string; }
      )
    )
  ) &
    
  {
    HTTP_Status: number;
    HTTP_Headers: HTTP_Headers;
  }
```
 
[Here is how this method has been implemented](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L15-L69) 
  in **FetchAPI_Service**, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based implementation.


###### `submitAndGetRawResponseDataIfAvailable`

```
(
  compoundParameter: AJAX_Service.GeneralizedObjectDataSubmitting.CompoundParameter
) => Promise<AJAX_Service.RawObjectDataResponse>
```

The implementation of this method must submit the data corresponding to passed options, then
  process the response data if presents, but without validation yet.

```typescript
namespace GeneralizedObjectDataSubmitting {

  export type CompoundParameter = {
    URI: string;
    HTTP_Method: HTTP_Methods;
    HTTP_Headers: HTTP_Headers;
    requestData: ReadonlyParsedJSON;
    mustExpectResponseData: boolean;
    mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
  };

}
```

The response must have the following schema:

```typescript
type RawObjectDataResponse = 
  
  (
    {
      isSuccessful: true;
      data: PossiblyReadonlyParsedJSON;
    } |
    (
      { isSuccessful: false; } &
      (
        { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
        { errorTextPayload: string; }
      )
    )
  ) &
    
  {
    HTTP_Status: number;
    HTTP_Headers: HTTP_Headers;
  }
```

If no response data come, provide the empty object.

[Here is how this method has been implemented](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L71-L130) 
  in **FetchAPI_Service**, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based implementation.


###### `retrieveResponseWithTextData`

```
(
  compoundParameter: AJAX_Service.TextDataRetrieving.NormalizedCompoundParameter
) => Promise<AJAX_Service.TextDataResponse>
```

The implementation of this method must retrieve the text data corresponding to passed options:

```typescript
namespace TextDataRetrieving {

  export type NormalizedCompoundParameter = {
    URI: string;
    HTTP_Method: HTTP_Methods;
    HTTP_Headers: HTTP_Headers;
    requestData?: ReadonlyParsedJSON_Object;
    mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
  };

}
```

The response must have the following schema:

```typescirpt
export type TextDataResponse =

  (
    {
      isSuccessful: true;
      text: string;
    } |
    (
      { isSuccessful: false; } &
      (
        { errorObjectPayload: PossiblyReadonlyParsedJSON; } |
        { errorTextPayload: string; }
      )
    )
  ) &
  
  {
    HTTP_Status: number;
    HTTP_Headers: HTTP_Headers;
  };
```

[Here is how this method has been implemented](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L132-L205) 
  in **FetchAPI_Service**, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based implementation.


<dl>

  <dt><code>alternatingURI_PathPart</code></dt>
  <dd>
    <dl>
    <dt>Type</dt>
    <dd><code>string</code></dd>
    <dt>Is required</dt>
    <dd>No</dd>
    <dt>Valid value example</dt>
    <dd><code>"api/products/2"</code></dd>
    <dt>Description</dt>
    <dd>
      Will be appended to <code>API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH</code> which may be defined via
        configuration.
      If <code>API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH</code> has not been defined but 
        <code>alternatingURI_PathPart</code> option has been used, the <code>InvalidConfigError</code> will be thrown.
    </dd>
    </dl>
  </dd>

</dl>


##### Public Instance Methods
###### `retrieveData`

[//]: # (TODO)


<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a></dt>
  <dd>
    <p>
      The facade for convenient usage of <a href="https://developer.mozilla.org/en-US/docs/Glossary/AJAX">AJAX</a> with
        maximal type-safety and less code.
    </p>
    <ul>
      <li>
        Integrated with <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html"><code>RawObjectDataProcessor</code></a>
          for validation and, if required, processing of response data.
      </li>
      <li>
        Needs some implementation, but there is
          <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html"><code>FetchAPI_Service</code></a>,
          the pre-made one.
      </li>
    </ul>
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html"><code>FetchAPI_Service</code></a></dt>
  <dd>
    The implementation of <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a>
      abstract class based on <a href="https://developer.mozilla.org/ru/docs/Web/API/Fetch_API">Fetch API</a>. 
    Works with all modern browsers, and also stable in Node.js since version <strong>22</strong>. 
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/URI_QueryParametersSerializer/URI_QueryParametersSerializer.english.html"><code>URI_QueryParametersSerializer</code></a><dt>
  <dd>
    The function-like <a href="https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#reusable-types-type-aliases">TypeScript type</a>
      used by <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a>
      and intended be used to implement the custom serializing algorithm for URI query parameters.  
  </dd>

</dl>

<h3 id="Arrays">Arrays</h3>

#### Creating

<dl>

  <dt>
    <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/00-Creating/createArrayOfNaturalNumbers/createArrayOfNaturalNumbers.english.html">
      <code>createArrayOfNaturalNumbers</code>
    </a>
  </dt>

  <dd>

 As it is obvious from the function name, it creates an array of natural numbers.
 Elements’ count, ascending/descending and starting number can be specified.

   ```
   (
     compoudParameter: {
  
       /** @description Must be the natural number. */
       elementsCount: number;
  
       /** @default false */
       isDescendingOrder?: boolean;
  
       /** @default 1 */
       startingNumber?: number;
  
     }
   ): Array<number>
   ```

  </dd>

</dl>


#### Retrieving of Elements


<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html"><code>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</code></a></dt>
  <dd>

   Returns the element of a specified array matching with the predicate if such an element is exactly one, 
     otherwise error will be thrown or null will be returned depending on dedicated option's value.
    
   ```
   /** @description [ 1st overload ] Returns null when element satisfying the predicate is not exatcly one. */
   <ArrayElement>(
     targetArray: Array<ArrayElement>, 
     predicate: (arrayElement: ArrayElement) => boolean
   ): ArrayElement | null
   
   /** @description [ 2nd overload ] Throws a error when element satisfying the predicate is not exatcly one. */ 
   <ArrayElement>(
     targetArray: Array<ArrayElement>,
     predicate: (arrayElement: ArrayElement) => boolean,
     options: { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }
   ): ArrayElement
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getLastElementOfArray/getLastElementOfArray.english.html"><code>getLastElementOfArray</code></a></dt>
  <dd>

 Returns the last element of an array if such the element exists, otherwise error will be thrown as default, 
      or null will be returned if the dedicated option has been specified.

   ```
   /** @description [ 1st overload ] Returns null when target array is empty. */
   <ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement | null;
    
   /** @description [ 2nd overload ] Throws error when target array is empty. */
   <ArrayElement>(
     targetArray: Array<ArrayElement>,
     options: { mustThrowErrorIfArrayIsEmpty: true; }
   ): ArrayElement
   ```

  </dd>

</dl>


#### Retrieving of Indexes

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/getIndexesOfSatisfiesThePredicateArrayElements.english.html"><code>getIndexesOfSatisfiesThePredicateArrayElements</code></a></dt>
  <dd>

 Obviously from the function name, returns the array of indexes of array elements which are satisfied to specified 
      predicate function.

   ```
   <ArrayElement>(
     targetArray: Array<ArrayElement>, 
     predicate: (arrayElement: ArrayElement) => boolean
   ): Array<number>
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html"><code>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</code></a></dt>
  <dd>

 Returns the index of the array element satisfies the predicate if such element is exactly one, otherwise error will 
      be thrown or null will be returned depending on dedicated option's value.

   ```
   /** @description [ 1st overload ] 
    * Returns null when there is no matches with the predicate or such matches are more than one */
   <ArrayElement>(
     targetArray: Array<ArrayElement>, 
     predicate: (arrayElement: ArrayElement) => boolean
   ): number | null;
    
    /** @description [ 2st overload ] 
    * Throws the error when there is no matches with the predicate or such matches are more than one */
   <ArrayElement>(
     targetArray: Array<ArrayElement>,
     predicate: (arrayElement: ArrayElement) => boolean,
     options: { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }
   ): number;
   ```
  </dd>

</dl>


#### Retrieving of Subarrays

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/03-RetrievingOfSubarrays/cropArray/cropArray.english.html"><code>cropArray</code></a></dt>
  <dd>
   <p>
      Creates the subarray of the specified array.
      In comparison with native <code>slice</code> and <code>splice</code> methods, suggests the extremely flexible API:
   </p>
   <ul>
     <li>Mutable and immutable cropping</li>
     <li>Specifying of starting element and ending element either from the start or from the end of an array</li>
     <li>Absolute and relative specifying of starting and ending elements of subarray</li>
     <li>Inclusive and exclusive absolute specifying of last element of subarray</li>
   </ul>

   ```
   <ArrayElement>(
   
     compoundParameter:
     
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         
         (
           (
             { fromStart: true; } &
             (
               { startingElementNumber__numerationFrom0: number; } |
               { startingElementNumber__numerationFrom1: number; } |
               { fromFirstElement: true; }
             ) &
             (
               { endingElementNumber__numerationFrom0__including: number; } |
               { endingElementNumber__numerationFrom1__including: number; } |
               { endingElementNumber__numerationFrom0__notIncluding: number; } |
               { endingElementNumber__numerationFrom1__notIncluding: number; } |
               { elementsCount: number; } |
               { untilLastElement: true; }
             )
           ) |
           
           (
             { fromEnd: true; } &
             (
               { rightElementNumber__numerationFrom0_AndRight: number; } |
               { rightElementNumber__numerationFrom1_AndRight: number; } |
               { fromRightmostElement: true; }
             ) &
             (
               { leftElementNumber__numerationFrom0_AndRight__including: number; } |
               { leftElementNumber__numerationFrom1_AndRight__including: number; } |
               { leftElementNumber__numerationFrom0_AndRight__notIncluding: number; } |
               { leftElementNumber__numerationFrom1_AndRight__notIncluding: number; } |
               { elementsCount: number; } |
               { untilLeftmostElement: true; }
             )
           )
         ) &
         
         { mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: boolean; }

   ): Array<ArrayElement> 
```

  </dd>

</dl>


#### Adding of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/04-AddingOfElements/addElementsToArray/addElementsToArray.english.html"><code>addElementsToArray</code></a></dt>
  <dd>

 Adds one or more elements to the start, end or specified position of the target array, herewith the adding can be 
      mutable or not depending on dedicated property of the named parameters object.

  ```
  <ArrayElement>(

    compoundParameter:

          { newElements: ReadonlyArray<ArrayElement>; } &
          
          (
            {
              mutably: true;
              targetArray: Array<ArrayElement>;
            } |
            {
              mutably: false;
              targetArray: ReadonlyArray<ArrayElement>;
            }
          ) &
          
          (
            { toStart: true; } |
            { toEnd: true; } |
            { toPosition__numerationFrom0: number; } |
            { toPosition__numerationFrom1: number; }
          )

    ): Array<ArrayElement>
   ```

  </dd>

</dl>


#### Replacing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.english.html"><code>replaceArrayElementsByIndexesImmutably</code></a></dt>
  <dd>

 Creates the swallow copy of the target array and replaces the elements by specified indexes.
    
  ```
  <ArrayElement>(

    sourceDataAndOptions:

        { targetArray: ReadonlyArray<ArrayElement>; } &

        (
          {
            index: number;
            newElement: ArrayElement;
          } |
          {
            replacements: ReadonlyArray<{
              index: number;
              newElement: ArrayElement;
            }>;
          }
        )

  ): Array<ArrayElement>
  ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.english.html"><code>replaceArrayElementsByPredicates</code></a></dt>
  <dd>

 Replaces array elements by one or more predicates, herewith the replacing can be mutable or no depending on dedicated option.

  ```
  <ArrayElement>(
    sourceDataAndOptions:

        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        ) &
        (
          Replacement<ArrayElement> |
          { replacements: Array<Replacement<ArrayElement>>; }
        )

  ): 
      {
        updatedArray: Array<ArrayElement>;
        indexesOfReplacedElements: Array<number>;
      }
  ```

  ```ts
  type Replacement<ArrayElement> = Readonly<
    { predicate: (arrayElement: ArrayElement) => boolean; } &
    (
      { newValue: ArrayElement; } |
      { replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }
    )
  >;
  ```
  </dd>

</dl>


#### Permutations of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/moveArrayElementToOnePosition/moveArrayElementToOnePosition.english.html"><code>moveArrayElementToOnePosition</code></a></dt>
  <dd>

 Moves specified by an index element to left or to right, herewith the ousted element will be placed to position of target one.
    Mutable and immutable swapping are available.

   ```
   <ArrayElement>(

     sourceDataAndOptions:
      
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         (
           { targetElementNumber__numerationFrom0: number; } |
           { targetElementNumber__numerationFrom1: number; }
         ) &
         {
           toLeft: boolean;
           errorMustBeThrownIf: {
             elementsCountIsLessThan2: boolean;
             targetElementNumberIsOutOfRange: boolean;
           }
         }
       
   ): Array<ArrayElement>
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/swapArrayElements/swapArrayElements.english.html"><code>swapArrayElements</code></a></dt>
  <dd>

 <p>Swaps two array elements, not obligatory the siblings.</p>
    <ul>
      <li>Each element can be specified by index, by number from 1 or via predicate.</li>
      <li>Mutable and immutable swapping are available</li>
    </ul>

   ```
   <ArrayElement>(

     sourceDataAndOptions:

         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &

         {
         
           oneElement: 
           
               {
                 position__numerationFrom0: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               {
                 position__numerationFrom1: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               { isLastOne: true; } |
               {
                 finder: (arrayElement: ArrayElement) => boolean;
                 mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
               };
           
           otherElement: 
           
               {
                 position__numerationFrom0: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               {
                 position__numerationFrom1: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               { isLastOne: true; } |
               {
                 finder: (arrayElement: ArrayElement) => boolean;
                 mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
               }
           
         } &
          
         {
           mustThrowErrorIfTargetArrayIsEmpty: boolean;
           mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: boolean;
         }

   ): Array<ArrayElement>
   ```

  </dd>

</dl>


#### Removing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByIndexes/removeArrayElementsByIndexes.english.html"><code>removeArrayElementsByIndexes</code></a></dt>
  <dd>

 Removes array elements by indexes, herewith the removing can be mutable or no depending on the dedicated option.

   ```
   (
     compoundParameter:
      
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         { indexes: number | ReadonlyArray<number>; }
     
   ): 
       {
         updatedArray: Array<ArrayElement>;
         removedElements: Array<ArrayElement>;
       }
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByPredicates/removeArrayElementsByPredicates.english.html"><code>removeArrayElementsByPredicates</code></a></dt>
  <dd>

 Removes array elements by one or more predicates, herewith the removing can be mutable or not depending on the dedicated option.

   ```
   <ArrayElement>(
   
     compoundParameter:
     
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         
         (
           { predicate: (arrayElement: ArrayElement) => boolean; } |
           { predicates: ReadonlyArray<(arrayElement: ArrayElement) => boolean>; }
         )
     
   ): 
   
       {
         updatedArray: Array<ArrayElement>;
         removedElements: Array<ArrayElement>;
         indexesOfRemovedElements: Array<number>;
       }    
   ```

  </dd>

</dl>


#### Restructuring

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/08-Restructuring/twoDimensionalizeArray/twoDimensionalizeArray.english.html"><code>twoDimensionalizeArray</code></a></dt>
  <dd>
    
 Converts a flat array to a 2-dimensional array with nested arrays of fixed elements count.
  
   ```
   <ArrayElement>(
     {
       targetFlatArray,
       elementsCountPerNestedArray
     }: 
         {
           targetFlatArray: Array<ArrayElement>;
           elementsCountPerNestedArray: number;
         }
   ): 
      Array<Array<ArrayElement>>
   ```     
    
</dd>

</dl>


##### Other

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.english.html"><code>addElementsToArrayIfTheyAreNotPresentOtherwiseRemove</code></a></dt>
  <dd>

 <p>Obviously from the function name, adds elements to an array if they do not present otherwise remove them.</p>
    <ul>
      <li>
        For all types of elements except numbers, bigints, strings and booleans the element finding predicate must be
          specified.
      </li>
       <li>Mutable and immutable manipulations are available</li>
    </ul>

   ```
   /** @description [ 1st overload ] The array of primitive type elements */
   <ArrayElement extends number | bigint | string | boolean>(
   
     compoundParameter:
       
         (
           { targetElement: ArrayElement; } |
           { targetElements: ReadonlyArray<ArrayElement>; }
         ) &
         
         (
           { addingToStart: true; } |
           { addingToEnd: true; } |
           { addingToPosition__numerationFrom0: number; } |
           { addingToPosition__numerationFrom1: number; }
         ) &
         
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         )
       
   ): Array<ArrayElement>

    /** @description [ 1st overload ] The array of non-primitive type elements */
   <ArrayElement extends Exclude<unknown, number | bigint | string | boolean>>(
   
     compoundParameter:
    
         (
           {
             targetElement: ArrayElement;
             targetElementFinder: (arrayElement: ArrayElement) => boolean;
           } |
           {
             targetElements: ReadonlyArray<ArrayElement>;
             targetElementsFinder: (arrayElement: ArrayElement) => boolean;
           }
         ) &
         
         (
           { addingToStart: true; } |
           { addingToEnd: true; } |
           { addingToPosition__numerationFrom0: number; } |
           { addingToPosition__numerationFrom1: number; }
         ) &
         
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         )
    
   ): Array<ArrayElement>;
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/readonlyArrayToMutableOne/readonlyArrayToMutableOne.english.html"><code>readonlyArrayToMutableOne</code></a></dt>
  <dd>

 <ul>
      <li>
        From the viewpoint of TypeScript, allows to mutate the <code>ReadonlyArray</code> what basically not recommeded
          but in some particular cases almost inevitably.
      </li>
      <li>From the viewpoint of JavaScript, does nothing.</li>
    </ul>

   ```
   <ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): Array<ArrayElement>
   ```

  </dd>

</dl>


### Data Mocking

#### `DataMocking` Class/Namespace

+ The class is abstract, the instance can be created only with violating of the TypeScript type checking.
+ The namespace stores `OptionalPropertiesDecisionStrategies` enumeration.


##### Public Static Methods
###### `decideOptionalValue`

```
<ValueType>(
  sourceDataAndOptions: Readonly<{
    strategy: DataMocking.OptionalPropertiesDecisionStrategies;
    randomValueGenerator: () => ValueType;
    preDefinedValue?: ValueType;
  }>
): ValueType | undefined
```

When mocking the object with optional properties, for each optional property you can do one of the following:

+ Generate the value for the optional property
+ Do not generate the value for the optional property
+ Generate the value for the optional property with or not generate it randomly with specific probability

Additionally, the value for the optional property can be specified explicitly instead of generating of random value.
It is useful when you want to test, for example, the searching of some item by its description.

`decideOptionalValue` method allows to generate or not generate the value for random optional property
  depending on selected strategy.
This method has the single parameter of the object type with the following properties:

<dl>

  <dt><code>strategy</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd><code>DataMocking.OptionalPropertiesDecisionStrategies</code></dd>
      <dt>Is required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>
        Specifying the strategy basing on which the optoinal property must be provided or not provided.
        <dl>
          <dt><code>OptionalPropertiesDecisionStrategies.mustGenerateAll</code></dt>
          <dd>If <code>preDefinedValue</code> not specified, the random value will be generated.</dd>
          <dt><code>OptionalPropertiesDecisionStrategies.mustGenerateWith50PercentageProbability</code></dt>
          <dd>The random value will be generated with 50% probability herewith <code>preDefinedValue</code> will not be used even if defined.</dd>
          <dt><code>OptionalPropertiesDecisionStrategies.mustSkipIfHasNotBeenPreDefined</code></dt>
          <dd>If <code>preDefinedValue</code> not specified, the random value will not be generated.</dd>
        </dl>
      </dd>
    </dl>
  </dd>

  <dt><code>randomValueGenerator</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Signature</dt>
      <dd><code>() => ValueType;</code></dd>
      <dt>Is required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>Must generate the random value, but will be invoked only when this value actually must be generated.</dd>
    </dl>
  </dd>

  <dt><code>preDefinedValue</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>(As specified via generic parameter)</dd>
      <dt>Is required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>Will be used instead of generating of a random value.</dd>
    </dl>
  </dd>

</dl>


#### `MockGatewayHelper` Class/Namespace 

Mocking the data, usually we need more that just the data.
Additionally, we may need:

+ Simulate the data retrieving state, herewith adjust the time (for example, to check is loading placeholder displays correctly)
+ Simulate the data retrieving failure to check does application handles the error correctly.

This is for what `MockGatewayHelper` class designed.


##### Public Static Fields
###### `localization`

<dl>

  <dt>Type</dt>
  <dd><code>MockGatewayHelper.Localization</code></dd>

  <dt>Is required</dt>
  <dd>Yes</dd>

  <dt>Default Value<dt>
  <dd><code>MockGatewayHelperLocalization__English</code></dd>

</dl>

Used for generating of the messages to output them to console.
Although the English reading skills are required in software development, the usage of native language will make 
  professional growing faster for the engineers which are not English native speakers.

```typescript
type Localization = Readonly<{

  generateErrorSimulationCompletedLog: (
    compoundParameter: Localization.ErrorSimulationCompletedLog.CompoundParameter
  ) => string;

  generateDataRetrievingSimulationCompletedLog: (
    compoundParameter: Localization.DataRetrievingSimulationCompletedLog.CompoundParameter
  ) => Localization.DataRetrievingSimulationCompletedLog;

  generateDataSubmittingSimulationCompletedLog: (
    compoundParameter: Localization.DataSubmittingSimulationCompletedLog.CompoundParameter
  ) => Localization.DataSubmittingSimulationCompletedLog;

}>;

namespace Localization {

  export namespace ErrorSimulationCompletedLog {

    export type CompoundParameter = Readonly<{
      gatewayName: string;
      transactionName: string;
    }>;

  }


  export type DataRetrievingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

  export namespace DataRetrievingSimulationCompletedLog {

    export type CompoundParameter = Readonly<{
      gatewayName: string;
      transactionName: string;
      formattedRequestParameters?: string;
      formattedResponseData?: string;
    }>;

  }


  export type DataSubmittingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

  export namespace DataSubmittingSimulationCompletedLog {

    export type CompoundParameter = Readonly<{
      gatewayName: string;
      transactionName: string;
      formattedRequestData?: string;
      formattedResponseData?: string;
    }>;

  }

}
```

##### Public Static Methods
###### `simulateDataRetrieving`

```
(
  dataRetrievingSimulationConfiguration: MockGatewayHelper.
      DataRetrievingSimulationConfiguration<RequestParameters, ResponseData>
) => Promise<ResponseData>
```

Simulates the data retrieving; here the simulation means that your mock data will be returned
  asynchronously (within the period depending on adjusted minimal and maximal value) as when it
  comes from the server.
Additionally, the error can be simulated.

The single parameter has the object type of the following schema:

<dl>

  <dt><code>requestParameters</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Object</dd>
      <dt>Schema</dt>
      <dd>Generic</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>Will be used only for logging when the logging is enabled.</dd>
    </dl>
  </dd>

  <dt><code>getResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>Your response data (intended to be mocked)</dd>
      <dt>Description</dt>
      <dd>
        This function will be executed only when <code>mustSimulateError</code> option set to <code>false</code> 
          (or not set).
      </dd>
    </dl>
  </dd>

  <dt><code>minimalPendingPeriod__seconds</code></dt>
  <dt><code>maximalPendingPeriod__seconds</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Number</dd>
      <dt>Number Set</dt>
      <dd>Any positive number</dd>
      <dt>Default value</dt>
      <dd>
        <code>1</code> for <code>minimalPendingPeriod__seconds</code> and  
          <code>2</code> for <code>maximalPendingPeriod__seconds</code>
      </dd>
      <dt>Description</dt>
      <dd>
        Used to simulate the asynchronous behavior (delay) during the data retrieving.
        Actual period will be a random integer, but not smaller than <code>minimalPendingPeriod__seconds</code>
          and not greater than <code>maximalPendingPeriod__seconds</code>. 
        <code>getResponseData</code> function will be invoked once this period will elapsed.
      </dd>
    </dl>
  </dd>

  <dt><code>mustSimulateError</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then <code>DataRetrievingFailedError</code> will be thrown
          once simulated loading will end, and <code>getResponseData</code> will not be invoked.
        Intended to be used for the testing how your application will react on error.
      </dd>
    </dl>
  </dd>

  <dt><code>mustLogResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then formatted response data will be output to console, but this fromatted
          data can to loo large and possibly truncated by the console.
      </dd>
    </dl>
  </dd>

  <dt><code>gatewayName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should represent the meaningful name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of class or interfance related with exchage of specifc data, e. g. 
          <code>ProductGateway</code>, <code>UserGateway</code> etc.  
      </dd>
    </dl>
  </dd>

  <dt><code>transactionName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should represent the meaningful name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of function/method which retrieving the data, or the name of transaction, e. g.
          "productRetrieving", "Retrieving of User By ID" etc.
      </dd>
    </dl>
  </dd>

</dl>


###### `simulateDataSubmitting`

```
(
  dataSubmittingSimulationConfiguration: MockGatewayHelper.
      DataSubmittingSimulationConfiguration<RequestData, ResponseData>
) => Promise<ResponseData>
```

Simulates the data submitting and, optionally, retrieving of response data; here the simulation means that your mock 
  data will be returned asynchronously (within the period depending on adjusted minimal and maximal value) as when it
  comes from the server.
Additionally, the error can be simulated.

Well, this method doing same this as `simulateDataRetrieving` - the difference is the naming rather than
  behavior.
For instance, the argument of `simulateDataRetrieving` has `requestParameters` property while the
  argument of `simulateDataSubmitting` has `requestData` property.
The logging message also will be a little bit different.

The single parameter has the object type of the following schema:

<dl>

  <dt><code>requestData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Object</dd>
      <dt>Schema</dt>
      <dd>Generic</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>Will be used only for logging when the logging is enabled.</dd>
    </dl>
  </dd>

  <dt><code>getResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>Your response data (intended to be mocked)</dd>
      <dt>Description</dt>
      <dd>
        This function will be executed only when <code>mustSimulateError</code> option set to <code>false</code> 
          (or not set).
        If the transaction intended only to submit the data but not expect any response data, return the null, or empty
          array, or like.
      </dd>
    </dl>
  </dd>

  <dt><code>minimalPendingPeriod__seconds</code></dt>
  <dt><code>maximalPendingPeriod__seconds</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Number</dd>
      <dt>Number Set</dt>
      <dd>Any positive number</dd>
      <dt>Default value</dt>
      <dd>
        <code>1</code> for <code>minimalPendingPeriod__seconds</code> and  
          <code>2</code> for <code>maximalPendingPeriod__seconds</code>
      </dd>
      <dt>Description</dt>
      <dd>
        Used to simulate the asynchronous behavior (delay) during the data retrieving.
        Actual period will be a random integer, but not smaller than <code>minimalPendingPeriod__seconds</code>
          and not greater than <code>maximalPendingPeriod__seconds</code>. 
        <code>getResponseData</code> function will be invoked once this period will elapsed.
      </dd>
    </dl>
  </dd>

  <dt><code>mustSimulateError</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then <code>DataRetrievingFailedError</code> will be thrown
          once simulated loading will end, and <code>getResponseData</code> will not be invoked.
        Intended to be used for the testing how your application will react on error.
      </dd>
    </dl>
  </dd>

  <dt><code>mustLogResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then formatted response data will be output to console, but this fromatted
          data can to loo large and possibly truncated by the console.
      </dd>
    </dl>
  </dd>

  <dt><code>gatewayName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should represent the meaningful name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of class or interfance related with exchage of specifc data, e. g. 
          <code>ProductGateway</code>, <code>UserGateway</code> etc.  
      </dd>
    </dl>
  </dd>

  <dt><code>transactionName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should represent the meaningful name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of function/method which retrieving the data, or the name of transaction, e. g.
          "productAdding", "Updating of User By ID" etc.
      </dd>
    </dl>
  </dd>

</dl>


### Date and Time
#### `CalendarBuilder` class

To display all days any month of any year, you need 6 rows × 7 columns = 42 cell table.
Each cell will include the data (number of day in month) - mostly of current month, but maybe also 
  the last days of previous month and/or first days of next month.
You may want to display them if developing the calendar for the GUI application, or just compute something
  based on these days - anyway first you need the array of above numbers, and this is on what `CalendarBuilder`
  specialized.


##### Public Static Methods
###### `generateDataFor42DaysMatrix`

```
(
  compoundParameter: 
      { targetYear: number; } &
      (
        { targetMonthNumber__numerationFrom0: number; } |
        { targetMonthNumber__numerationFrom1: number; } |
        { targetMonthName: MonthsNames; }
      ) &
      (
        { firstDayOfWeek__numerationFrom0ForSunday: number; } |
        { firstDayOfWeek__numerationFrom1ForSunday: number; } |
        { firstDayOfWeek: DaysOfWeekNames; }
      )
) => 
    Array<{
      year: number;
      monthNumber__numerationFrom0: number;
      monthNumber__numerationFrom1: number;
      monthName: MonthsNames;
      dayOfMonth: number;
      dayOfWeekName: DaysOfWeekNames;
      dayOfWeekNumber__numerationFrom0ForSunday: number;
    }>
```

Returns the array with data of 42 dates for specified year, month and first day of week
  (not all countries has Sunday as standardized first day of week).
The data for each date includes the year, month, day of month and day of week represented with difference forms.


###### `generateDataFor6x7DaysMatrix`

```
(
  compoundParameter: 
      { targetYear: number; } &
      (
        { targetMonthNumber__numerationFrom0: number; } |
        { targetMonthNumber__numerationFrom1: number; } |
        { targetMonthName: MonthsNames; }
      ) &
      (
        { firstDayOfWeek__numerationFrom0ForSunday: number; } |
        { firstDayOfWeek__numerationFrom1ForSunday: number; } |
        { firstDayOfWeek: DaysOfWeekNames; }
      )
) => 
    Array<
      Array<{
        year: number;
        monthNumber__numerationFrom0: number;
        monthNumber__numerationFrom1: number;
        monthName: MonthsNames;
        dayOfMonth: number;
        dayOfWeekName: DaysOfWeekNames;
        dayOfWeekNumber__numerationFrom0ForSunday: number;
      }>
    >
```

Returns same data as `generateDataFor42DaysMatrix` but exploded to 6 array of 7 elements corresponding to calendar cells.


##### `convert24_HoursFormatTo12_HoursFormat`

```
(hoursAmount__24Format: number) => 
    {
      hoursAmount__12HoursFormat: number;
      isBeforeNoon: boolean;
      isAfterNoon: boolean;
    }
```

As it obvious from the name, converts the hours amount from 24-hour format to 12-hour format.
Of course, besides the amount it also will be returned the boolean values to identify is amount corresponding to
  before or after midnight.

The type definition of return value available as `ConvertingOf24_HoursFormatTo12_HoursFormat.Result`.


##### `DateWithoutTime`

An alternative of native <code>Date</code> (which actually is not only the Date but also the time).
As it obvious from the name, works only with date not associated with specific time zone and does not work with time.
The most demanded functionality is <code>format</code> static method allows defining the arbitrary formatting of 
  target date with optimized computing.

[📖 Main Article](Documentation/DateTime/DateWithoutTime.md)


[//]: # (再開)

<dl>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getDaysCountInSpecificMonth.md">
      <code>getDaysCountInSpecificMonth</code>
    </a>
  </dt>
  <dd>Returns days count in specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/getISO8601_StringWithoutTimePart.ts">
      <code>getISO8601_StringWithoutTimePart</code>
    </a>
  </dt>
  <dd>
    Obviously to function name, returns the date definition without time in ISO8601 format.
    The parameters can be defined by various methods.
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNameByNumber.md">
      <code>getMonthNameByNumber</code>
    </a>
  </dt>
  <dd>Converts the month number (from 0 or 1) to element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md"><code>MonthsNames</code> enumeration</a>.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNumberByName.md">
      <code>getMonthNumberByName</code>
    </a>
  </dt>
  <dd>Converts the element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md"><code>MonthsNames</code> enumeration</a> to number of month (from 0 or 1).</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getNextMonthNumber.md">
      <code>getNextMonthNumber</code>
    </a>
  </dt>
  <dd>Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getPreviousMonthNumber.md">
      <code>getPreviousMonthNumber</code>
    </a>
  </dt>
  <dd>Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfNextMonth.md">
      <code>getYearOfNextMonth</code>
    </a>
  </dt>
  <dd>Returns the year of next month in relation to specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfPreviousMonth.md">
      <code>getYearOfPreviousMonth</code>
    </a>
  </dt>
  <dd>Returns the year of previous month in relation to specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/hasTimeCome.ts">
      <code>hasTimeCome</code>
    </a>
  </dt>
  <dd>
    Returns boolean value indicates has specified date and time come. 
    Native <code>Date</code> and <b>ISO8601</b> formats supported.
  </dd>
  
  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/isValidNativeDate.ts">
      <code>isValidNativeDate</code>
    </a>
  </dt>
  <dd>Returns boolean value indicates does specified <code>Date</code> represents the valid date and time.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/millisecondsToSeconds.md">
      <code>millisecondsToSeconds</code>
    </a>
  </dt>
  <dd>Converts milliseconds amount to amount of seconds.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/secondsToMilliseconds.md">
      <code>secondsToMilliseconds</code>
    </a>
  </dt>
  <dd>Converts seconds amount to amount of milliseconds.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md"><code>TimePoint</code></a></dt>
  <dd>
    An alternative of native <code>Date</code> (which actually is not only the Date but also the time).
    <ul>
      <li>
        Has similar API with <code>DateWithoutTime</code>, but it also has the conceptual difference: is 
          <code>DateWithoutTime</code> is the date not associated with specific time zone and does not work with time,
          <code>TimePoint</code> work with time and also has the accusation with specific time zone 
      </li>
      <li>
        The most demanded functionality is <code>format</code> static method allows defining the arbitrary formatting of 
          target date with optimized computing.
      </li>
    </ul>
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/Timer.ts">
      <code>Timer</code>
    </a>
  </dt>
  <dd>Abstract class indented to be inherited and implemented with environment-dependent functionality.</dd>

</dl>


### Default value Subsituters

Although the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  makes the below functions redundant, they still could be used in the environments with old ECMAScript versions.

<dl>

  <dt>substituteWhenNull</dt>
  <dd>Substitutes the second argument's value when first one is null.</dd>

  <dt>substituteWhenUndefined</dt>
  <dd>Substitutes the second argument's value when first one is <b>undefined</b>.</dd>

</dl>


#### Errors

<dl>

  <dt><code>AlgorithmMismatchError</code></dt>
  <dd>Intended to be used in general cases when actual behavior does not match with desired.</dd>

  <dt><code>ClassRedundantSubsequentInitializationError</code></dt>
  <dd>Intended to be used when the class developed as singleton has been attempted to initialize twice.</dd>

  <dt><code>ClassRequiredInitializationHasNotBeenExecutedError</code></dt>
  <dd>Intended to be used when the class beside the constructor requires the initialization but the initializing method has not been called.</dd>

  <dt><code>ConfigFileNotFoundError</code></dt>
  <dd>Intended to be used when some utility requires the config file, but it has not been found.</dd>

  <dt><code>CrossBrowserIssueError</code></dt>
  <dd>Intended to be used when some processing could not be executed because of certain browser's limitations.</dd>

  <dt><code>DataRetrievingFailedError</code></dt>
  <dd>Intended to be used when the data retrieving from some external resource (server, database, file, etc.) failed.</dd>

  <dt><code>DataSubmittingFailed</code></dt>
  <dd>Intended to be used when the data submitting to any external resource (server, database, etc.) failed.</dd>

  <dt><code>DOM_ElementRetrievingFailedError</code></dt>
  <dd>
    Intended to used when expected to be existing DOM element has not been retrieved.
    Related not only with browser JavaScript but also with processing of HTML code at server side.
  </dd>

  <dt><code>FileReadingFailedError</code></dt>
  <dd>Intended to be used when the file reading has not gone as expected</dd>

  <dt><code>FileWritingFailedError</code></dt>
  <dd>Intended to be used when the file writing has not gone as expected</dd>

  <dt><code>ImproperUsageError</code></dt>
  <dd>
    Intended to be used when the class/function has been attempted to use improperly. 
    Herewith, try to name the function/methods such as it will be obvious how to use it and also limit the usage by 
      TypeScript typing.
  </dd>

  <dt><code>IncompatiblePropertiesInObjectTypeParameterError</code></dt>
  <dd>
    Intended to be used when in parameter <b>exampleParameter</b> of object type one of properties 
    <b>exampleParameter.propertyA</b> and <b>exampleParameter.propertyB</b> must be omitted but both has been specified.
  </dd>

  <dt><code>InterProcessInteractionFailedError</code></dt>
  <dd>
    Intended to be used when the interaction between NodeJS processed is not going as expected. 
    Could be actual, for example, for the Electron.js where the main process and render process are exchanges by data.
  </dd>

  <dt><code>InvalidConfigError</code></dt>
  <dd>
    Intended to be used when config validation was not passed.
    Appending of the validation errors messages to <b>InvalidConfigError</b>'s message is strongly recommended.
  </dd>

  <dt><code>InvalidExternalDataError</code></dt>
  <dd>
    Intended to be used when the data from the external data source does not match with expected. 
    Appending of the validation errors messages to <b>InvalidExternalDataError</b>'s message is strongly recommended.</dd>

  <dt><code>InvalidParameterValueError</code></dt>
  <dd>
    Intended to be used when the parameter's does not fit to some limitations.
    Although the TypeScript allows to define and check the parameter's type, no type check will not be executed
    once TypeScript will be compiled to JavaScript. Also, is the parameter has limitations like smallest numerical 
    value or maximal characters count, <b>InvalidParameterValueError</b> has been developed for such cases.
  </dd>

  <dt><code>ModuleDynamicLoadingFailedError</code></dt>
  <dd>Recommended to throw when the module dynamical loading failed. Actual for bundlers like Webpack.</dd>

  <dt><code>UnexpectedEventError</code></dt>
  <dd>
    Intended to be used when the probability of the occurrence of some "else if" branch is very small and 
      impossible for normal operation of the program.
  </dd>

  <dt><code>UnsupportedScenarioError</code></dt>
  <dd>Intended to be used when occurred some scenario which is not supported yet.</dd>

</dl>


##### HTTPS

<dl>

  <dt><code>HTTP_ResponseBodyParsingFailureError</code></dt>
  <dd>Intended to be used when HTTP response body has not been parsed successfully.</dd>

</dl>

[//]: # (todo =========================================================================================================&#41;)

#### RawObjectDataProcessor

The tool for the validation and processing of unknown at advance external data (from HTTP requests/responses, files, etc.).

* [📖 Quick example](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
* [📖 Problem overview](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#problem-overview)
* [📖 Theoretical minimum](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#theoretical-minimum)
* [📖 Getting started](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#getting-started)


##### Pre-made pre-validation modifiers

Intended to be used when some property is expected to be the string but also expected to be a valid number if to parse it.

<dl>

  <dt>convertPotentialStringToFloatIfPossible</dt>
  <dd>Tries to convert the string to decimal fraction; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToIntegerIfPossible</dt>
  <dd>Tries to convert the string to integer; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToNumberIfPossible</dt>
  <dd>
    Tries to convert the string to integer or decimal fraction (depending on decimal part separator presence); 
    returns the number in success case otherwise returns the initial value.
  </dd>

</dl>


#### Numbers

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/formatNumberWith4KetaKanji/formatNumberWith4KetaKanji.md">formatNumberWith4KetaKanji</a></dt>
  <dd>Formats number with 4-digits Kanji 万, 億, 兆, 系 (CJK ideographic characters)</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/getArithmeticMean.md">getArithmeticMean</a></dt>
  <dd>Computed the arithmetic mean of arbitrary quantity of number.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/isStringifiedNonNegativeIntegerOfRegularNotation/isStringifiedNonNegativeIntegerOfRegularNotation.md">isStringifiedNonNegativeIntegerOfRegularNotation</a></dt>
  <dd>Checks is the value of string contains the number of non-scientific notation.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundDownToSpecificIntegerPlaceValue.md">roundDownToSpecificIntegerPlaceValue</a></dt>
  <dd>Rounds up the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundToSpecificNearestIntegerPlaceValue.md">roundToSpecificNearestIntegerPlaceValue</a></dt>
  <dd>Rounds the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundToSpecifiedNearestDecimalPlaceValue/roundToSpecifiedNearestDecimalPlaceValue.md">roundToSpecifiedNearestDecimalPlaceValue</a></dt>
  <dd>Rounds the number to specific decimal place (tens, hundreds, thousands, etc.).</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundUpToSpecificIntegerPlaceValue.md">roundUpToSpecificIntegerPlaceValue</a></dt>
  <dd>Rounds the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/separateEach3DigitsGroupWithComma/separateEach3DigitsGroupWithComma.md">separateEach3DigitsGroupWithComma</a></dt>
  <dd>Formats the number separating each 3 digits group with comma</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/separateEach4DigitsGroupWithComma/separateEach4DigitsGroupWithComma.md">separateEach4DigitsGroupWithComma</a></dt>
  <dd>Formats the number separating each 4 digits group with comma</dd>

</dl>


#### Strings

All functions working with strings are supporting the [surrogate pairs](https://stackoverflow.com/questions/31986614/what-is-a-surrogate-pair).
If some function works incorrectly with surrogate pairs, it means the bug; please feel free to open issue in this case.

<dl>

  <dt>areStringifiedDigitsOnly</dt>
  <dd>Checks is string value consists exclusively from the digits.</dd>

  <dt>capitalizeFirstCharacter</dt>
  <dd>Capitalizes first character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/EmailAddress.md">EmailAddress</a></dt>
  <dd>Class working with email addresses. Currently, consists from validating function and regular expression of valid emails.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/explodeCasedPhraseToWords.md">explodeCasedPhraseToWords</a></dt>
  <dd>Explodes the string containing grammatically normal or cased (camel case, snake case, etc.) expression to words and returns the array of them. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt>getLastCharacter</dt>
  <dd>Returns the last character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/getPositionsOfAllSubstringOccurrences.md">getPositionsOfAllSubstringOccurrences</a></dt>
  <dd>Returns the positions of each occurrence of specified substring.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/hasStringOnlySpecificCharacters.md">hasStringOnlySpecificCharacters</a></dt>
  <dd>Checks does string including specified characters only without regular expression</dd>

  <dt>removeAllSpecifiedCharacters</dt>
  <dd>Removes specified characters from the string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeLastCharacter.md">removeLastCharacter</a></dt>
  <dd>Removes last character.</dd>

  <dt>removeNonDigitsCharacters</dt>
  <dd>Removes all characters from the string except digits.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeNthCharacter.md">removeNthCharacter</a></dt>
  <dd>Removes the character in specified position from the string. Supports the surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeSpecificCharacterFromCertainPosition.md">removeSpecificCharacterFromCertainPosition</a></dt>
  <dd>Removes specific character from the specific position.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replace2OrMoreSpacesTo1.md">replace2OrMoreSpacesTo1</a></dt>
  <dd>Replaces 2 or more spaces to 1.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replaceBrHTML_TagToNewLineEscapeSequence.md">replaceBrHTML_TagToNewLineEscapeSequence</a></dt>
  <dd>Replaces the "br" HTML tag to new line (line feed) escape sequence.</dd>

  <dt>insertSubstring</dt>
  <dd>Insets nullable substring with optional condition and transformations.</dd>

  <dt>insertSubstringIf</dt>
  <dd>Insets substring conditionally.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/isIPv4AddressLiesInRange.md">isIPv4AddressLiesInRange</a></dt>
  <dd>Check does specified IP address lies in specific range.</dd>

  <dt>reverseString</dt>
  <dd>Reverses the characters sequence in string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/splitString.md">splitString</a></dt>
  <dd>Alternative of native <code>String.prototype.split()</code>; unlike it supports the UTF16 surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/stringifyAndFormatArbitraryValue/stringifyAndFormatArbitraryValue.md">stringifyAndFormatArbitraryValue</a></dt>
  <dd>Converts to readable string and formats if possible any type of data.</dd>

  <dt>replaceDoubleBackslashesWithForwardSlashes</dt>
  <dd>Replaces double backslashes with forward slashes.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toLowerCamelCase.md">toLowerCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to (lower) camel case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toScreamingSnakeCase.md">toScreamingSnakeCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to screaming snake case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toUpperCamelCase.md">toUpperCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to upper camel case AKA Pascal case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/trimSpaces/trimSpaces.md">trimSpaces</a></dt>
  <dd>Trims prepended and/or appended space characters; unlike native <code>String.prototype.trim()</code> acts selectively on specified spaces kinds.</dd>
 
</dl>


#### Objects

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Objects/getObjectPropertySafely.md">getObjectPropertySafely</a></dt>
  <dd>
    Works as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">optional chaining</a> but could be used for any fully-qualified name and returns value which being considered as <code>unknown</code>. 
    Intended to be used when the schema of value is not known enough (for example, because of lack of TypeScript type definition).
  </dd>
</dl>

#### Sets

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Sets/addMultipleElementsToSet/addMultipleElementsToSet.md">addMultipleElementsToSet</a></dt>
  <dd>Adds multiple elements to set.</dd>
</dl>



#### Maps

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/addMultiplePairsToMap/addMultiplePairsToMap.md">addMultiplePairsToMap</a></dt>
  <dd>Adds multiple entries to map.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/createMapBasedOnOtherMap/createMapBasedOnOtherMap.md">createMapBasedOnOtherMap</a></dt>
  <dd>Creates map based on other map.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/filterMap/filterMap.md">filterMap</a></dt>
  <dd>Filters map by specified predicate.</dd>

</dl>


#### Types

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/ParsedJSON/ParsedJSON.md"><b>ParsedJSON</b> and related</a></dt>
  <dd>The native object including the Array case which could be the result of JSON parsing.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/InheritEnumerationKeys.md">InheritEnumerationKeys</a></dt>
  <dd>Allows to create the object with same keys as reference enumeration.</dd>

  <dt>PartialBy</dt>
  <dd>Makes specified properties of base type optional.</dd>

</dl>


#### Type guards

* [Numbers](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Numbers/NumberTypeGuards.md)
* [Strings](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Strings/StringTypeGuards.md)
* [Objects](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Objects/ObjectTypeGuards.md)
* [Arrays](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Arrays/ArrayTypeGuards.md)
* [Nullables](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Nullables/NullableTypeGuards.md)
* [Other](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Others/OtherTypeGuards.md)



#### Value transformers

* emptyStringToNull
* nullToEmptyString
* nullToUndefined
* nullToZero
* undefinedToEmptyArray
* undefinedToEmptyString
* undefinedToNull


#### Random values generators

<dl>

  <dt>getRandomArrayElement</dt>
  <dd>Returns the random element of specified array.</dd>

  <dt>getRandomBoolean</dt>
  <dd>Returns "true" or "false" randomly.</dd>

  <dt>getRandomInteger</dt>
  <dd>Returns random integer not less than specified **minimalValue** and more than **maximalValue**.</dd>

  <dt>getRandomLatinCharacter</dt>
  <dd>Returns random latin character.</dd>

  <dt>getRandomObjectPropertyValue</dt>
  <dd>Returns random object property value.</dd>

  <dt>getRandomSubarray</dt>
  <dd>Returns the selection of elements of specified array; minimal and maximal elements count could be specified.</dd>

  <dt>getSpecificBooleanValueWithProbability</dt>
  <dd>Returns specific boolean value with specified probability.</dd>

</dl>


#### Constants and enumerations

##### Date and time

<dl>

  <dt>CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING</dt>
  <dd>
    The character count represents the date without time in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO8601 string</a>. 
    Has value <b>10</b>; for example, in the <code>2013-03-10T02:00:00Z</code> case the first 10 characters will be <code>2013-03-10</code>.
    If you need to extract this date part from ISO8601 string (not just know the characters count), use <a href="Documentation/DateTime/getISO8601_StringWithoutTimePart.md"><code>getISO8601_StringWithoutTimePart</code></a> function.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md">DaysOfWeek</a></dt>
  <dd>Allows to refer to the day of week by name, not by number what usually confusing with numeration from 0 (and also, first day of week is location dependent).</dd>

  <dt>HOURS_PER_STELLAR_DAY</dt>
  <dd>
    Has value <b>24</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MAXIMAL_DAYS_IN_MONTH</dt>
  <dd>
    Has value <b>31</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MINUTES_PER_HOUR</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MONTHS_PER_YEAR</dt>
  <dd>
    Has value <b>12</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md">MonthsNames</a></dt>
  <dd>Allows to refer to the month by name, not by number what usually confusing with numeration from 0.</dd>

  <dt>SECONDS_PER_MINUTE</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

</dl>


##### HTTP

* [HTTP_Methods](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_Methods.md)
* [HTTP Status codes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md)
  * [All](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#http_statuscodes---all-http-status-codes)
  * [Information responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#informationalresponseshttp_statuscodes---information-responses)
  * [Successful responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#successfulresponseshttp_statuscodes---successful-responses)
  * [Redirection messages](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#redirectionresponseshttp_statuscodes---redirection-messages)
  * [Client error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#clienterrorshttp_statuscodes---client-error-responses)
  * [Server error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#servererrorshttp_statuscodes---server-error-responses)


#### Pagination

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Pagination/computeFirstItemNumberForSpecificPaginationPage/computeFirstItemNumberForSpecificPaginationPage.md">computeFirstItemNumberForSpecificPaginationPage</a></dt>
  <dd>Computes the first item number for specified pagination page.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Pagination/computeLastItemNumberForSpecificPaginationPage/computeLastItemNumberForSpecificPaginationPage.md">computeLastItemNumberForSpecificPaginationPage</a></dt>
  <dd>Computes the last item number for specified pagination page.</dd>

</dl>


#### Logging

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md"><b>Logger</b> facade</a></dt>
  <dd>Basic facade for providing of the high-quality logging with customizable output destinations, formatting and limitations.</dd>

  <dt>Pre-made errors</dt>
  <dd>
    <dl>
      <dt>AlgorithmMismatchError</dt>
      <dd>Intended to be used in general cases when actual behaviour does not match with desired.</dd>
      <dt>ClassRedundantSubsequentInitializationError</dt>
      <dd>Intended to be used when the class developed as singleton has been attempted to initialize twice.</dd>
      <dt>ClassRequiredInitializationHasNotBeenExecutedError</dt>
      <dd>Intended to be used when the class besides the construction requires the initialization but the initializing method has not been called.</dd>
      <dt>ConfigFileNotFoundError</dt>
      <dd>Intended to be used when some utility requires the config file but it has not been found.</dd>
      <dt>CrossBrowserIssueError</dt>
      <dd>Intended to be used when some processing could not be executed because of certain browsers's limitations.</dd>
      <dt>DataRetrievingFailedError</dt>
      <dd>Intended to be used when the data retrieving from some external resource (server, database, file, etc.) failed.</dd>
      <dt>DataSubmittingFailed</dt>
      <dd>Intended to be used when the data submitting to any external resource (server, database, etc.) failed.</dd>
      <dt>DOM_ElementRetrievingFailedError</dt>
      <dd>
        Intended be used when some element retrieving from the DOM has been failed.
        It could occur not only on client side but also on server side, during rendering or HTML code processing.
      </dd>
      <dt>FileReadingFailedError</dt>
      <dd>Intended to be used when the file reading was not go as expected</dd>
      <dt>ImproperUsageError</dt>
      <dd>
        Intended to be used when the class/function has been attempted to use improperly. 
        Herewith, try to name the function/methods such as it will be obvious how to use it and also limit the usage by TypeScript typing.
      </dd>
      <dt>IncompatiblePropertiesInObjectTypeParameterError</dt>
      <dd>
        Intended to be used when in parameter <b>exampleParameter</b> of object type one of properties 
        <b>exampleParameter.propertyA</b> and <b>exampleParameter.propertyB</b> must be omitted but both has been specified.
      </dd>
      <dt>InterProcessInteractionFailedError</dt>
      <dd>
        Intended to be used when the interaction between NodeJS processed is not going as expected. 
        Could be actual, for example, for the Electron.js where the main process and render process are exchanges by data.
      </dd>
      <dt>InvalidConfigError</dt>
      <dd>
        Intended to be used when config validation was not passed.
        Appending of the validation errors messages to <b>InvalidConfigError</b>'s message is strongly recommended.
      </dd>
      <dt>InvalidExternalDataError</dt>
      <dd>
        Intended to be used when the data from the external data source does not match with expected. 
        Appending of the validation errors messages to <b>InvalidExternalDataError</b>'s message is strongly recommended.</dd>
      <dt>InvalidParameterValueError</dt>
      <dd>
        Intended to be used when the parameter's does not fit to some limitations.
        Although the TypeScript allows to define and check the parameter's type, no type check will not be executed
        once TypeScript will be compiled to JavaScript. Also, is the parameter has limitations like smallest numerical 
        value or maximal characters count, <b>InvalidParameterValueError</b> has been developed for such cases.
      </dd>
      <dt>ModuleDynamicLoadingFailedError</dt>
      <dd>Recommended to throw when the module dynamical loading failed. Actual for bundlers like Webpack.</dd>
      <dt>UnexpectedEventError</dt>
      <dd>
        Intended to be used when the probability of the occurrence of some "else if" branch is very small and 
        impossible for normal operation of the program.
      </dd>
      <dt>UnsupportedScenarioError</dt>
      <dd>Intended to be used when occurred some scenario which is not supported yet.</dd>
    </dl>
  </dd>
</dl>

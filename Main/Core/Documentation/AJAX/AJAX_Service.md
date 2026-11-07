# `AJAX_Service` Class

The facade for the convenient usage of [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX") with maximal 
  type-safety and less code.

+ Integrated with [RawObjectDataProcessor](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html)
    for validation and, if required, processing of the response data.
+ Needs some implementation, but there is [FetchAPI_Service](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html),
    the pre-made one.


## Static Fields
### Public

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


### Protected

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


## Public Static Setters

<dl>

  <dt><code>API_SERVER_URI_CONSTANT_PART</code></dt>
  <dd>
    Intended to be specified with the origin and, optioonally, partial path (like <code>/api</code>) 
      <code>API_SERVER_URI_CONSTANT_PART</code>.
    The trailing slash is optional.
  </dd>

</dl>


## Public Static Methods
### `setup`

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


### Facade Methods

The static methods delegating the execution to the eponymous instance methods.
The usage of these methods frees from the need to manage the instance of `AJAX_Service` class(which cannot be created without
  the TypeScript error because the `AJAX_Service` the abstract class), but before use these methods it is required to 
  set the implementation via `implementation` static class field or 
  `setup` static method.
  

#### `retrieveData`

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


#### `submitData`

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


#### `retrieveText`

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


## Protected Abstract Methods

The implementations of `AJAX_Server` abstract class are intended to be different only by how they retrieves the data
  (Fetch API, Axios, XMLHttpRequest etc.) but have common mechanism of the response data validation.
The implementations of the abstract methods of `AJAX_Server` class are narrowly specialized on the data retrieving part. 


### `retrieveResponseWithRawObjectData`

```
(
  compoundParameter: AJAX_Service.RawObjectDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.RawObjectDataResponse>
```

Intended to be implemented with the retrieving of data.

Must support all options of the object type parameter:

```typescript
type CompoundParameter = Readonly<{
  URI: string;
  HTTP_Method: HTTP_Methods;
  HTTP_Headers: HTTP_Headers;
  mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
}>;
```

Must return the object of following schema for response of any HTTP status (including the errored HTTP statuses):

```typescript
type RawObjectDataResponse = 
    Readonly<(
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
    )>;
```

The data may come for any type of HTTP status (including the errored ones), so:

+ For the successful responses case, the data must be stored to the `data` field.
+ For the errored responses case, the data must be stored to either `errorObjectPayload` or `errorTextPayload` depending
    on what server has returned.

Here is [how this method has been implemented in `FetchAPI_Service`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L18-L83).


### `submitAndGetRawResponseDataIfAvailable`

```
(
  compoundParameter: AJAX_Service.GeneralizedObjectDataSubmitting.CompoundParameter
) => Promise<AJAX_Service.RawObjectDataResponse>
```

Intended to be implemented with the submitting of data and also retrieving of response data
  when `mustExpectResponseData` specified `true`.

Must support all options of the object type parameter:

```typescript
type CompoundParameter = Readonly<{
  URI: string;
  HTTP_Method: HTTP_Methods;
  HTTP_Headers: HTTP_Headers;
  requestData: ReadonlyParsedJSON;
  mustExpectResponseData: boolean;
  mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
}>;
```

Must return the object of following schema for response of any HTTP status (including the errored HTTP statuses):

```typescript
type RawObjectDataResponse = 
    Readonly<(
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
    )>;
```

The data may come for any type of HTTP status (including the errored ones), so:

+ For the successful responses case, the data must be stored to the `data` field, herewith if no response data expected
  specify an empty object instead.  
+ For the errored responses case, the data must be stored to either `errorObjectPayload` or `errorTextPayload` depending
    on what server has returned.

Here is [how this method has been implemented in `FetchAPI_Service`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L88-L160).


### `retrieveResponseWithTextData`

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

[Here is how this method has been implemented](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/Main/Core/Source/AJAX/FetchAPI_Service.ts#L162-L250) 
  in **FetchAPI_Service**, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based implementation.


## Protected Methods

Rarely needed for the library uses — only in the cases when going to add more functionality when extending the 
  `AJAX_Service`.


### Instance

#### `retrieveData`

```
<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
  compoundParameter: AJAX_Service.ObjectDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.ObjectDataResponse<RawValidResponseData>>
```

Have save signature as the [eponymous static method](#retrievedata) and, moreover, all what the static method doing is
  delegates the execution to this instance method.


#### `submitData`

```
/* [ Overload No. 1 ] Validation of Response Data */
(
  compoundParameter: AJAX_Service.ObjectDataSubmitting.WithExpectedResponseData.CompoundParameter
) => Promise<AJAX_Service.ObjectDataResponse<RawValidResponseData>>;


/* [ Overload No. 2 ] No response data expected */
(
  compoundParameter: AJAX_Service.ObjectDataSubmitting.WithoutExpectedResponseData.CompoundParameter
) => Promise<AJAX_Servic
```

Have save signature as the [eponymous static method](#submitdata) and, moreover, all what the static method doing is
  delegates the execution to this instance method.


#### `retrieveText`

```
(
  compoundParameter: AJAX_Service.TextDataRetrieving.CompoundParameter
) => Promise<AJAX_Service.TextDataResponse>
```

Have save signature as the [eponymous static method](#retrievetext) and, moreover, all what the static method doing is
  delegates the execution to this instance method.
Once an instance has been initialized and stored inside `AJAX_Service` (via [`setup` static method](#setup) or 
  `implementation` static field), there is not need to take care about instance management across the files,
  so the recommended usage way is the static version of `retrieveText`.
If you are not want to follow this recommendation, you can use this instance version of `retrieveText`.


#### `normalizeURI`

```
(compoundParameter: AJAX_Service.URI_PathRawDefinition & AJAX_Service.URI_QueryParametersDefinition) => string
```

Building the URI string based the following properties:

<dl>

  <dt><code>alternatingURI_PathPart</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>string</dd>
      <dt>Is Required (neither undefined nor null allowed)</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>
        The part of URI starting via path.
        Can be specified only when <code>API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH</code> static field has been 
          preliminary initialized (via <code>API_SERVER_URI_CONSTANT_PART</code> static setter or <code>setup</code> static
          method).
        This way, if the URI constant path is something like <code>"https://example.com/api"</code>, the
          <code>alternatingURI_PathPart</code> can be something like <code>"foo/bar/baz"</code>.
      </dd>
    </dl>
  </dd>

  <dt><code>specificURI_UntilPath</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>string</dd>
      <dt>Required If</dt>
      <dd><code>alternatingURI_PathPart</code> is not specified</dd>
      <dt>Description</dt>
      <dd>
        Full URI (like <code>"https://example.com/api/foo/bar"</code>) of where the HTTP will be ocurred.
      </dd>
    </dl>
  </dd>

  <dt><code>URI_QueryParameters</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>ReadonlyParsedJSON_Object</dd>
      <dt>Is Required (neither undefined nor null allowed)</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>
        The URI query parameters represented by an object with JSON-compatable values.
        How they will be serialized (represented as the string) 
      </dd>
    </dl>
  </dd>

  <dt><code>URI_QueryParametersSerializer</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Signature</dt>
      <dd><code>(URI_QueryParameters: ReadonlyParsedJSON) => string</code></dd>
      <dt>Description</dt>
      <dd>
        If specified with the function accepts the JSON-comparable object and return a string then
          this function will be used instead of default <code>URI_QueryParametersSerializer</code>.
        If your application uses single serializing/deserializing algorith, then usage of default
          `URI_QueryParametersSerializer` preliminary initialized (via <code>API_SERVER_URI_CONSTANT_PART</code> static 
          setter or <code>setup</code> static method will be enough.
      </dd>
    </dl>
  </dd>

</dl>


#### `normalizeURI_UntilPath`

```
(URI_PathRawDefinition: AJAX_Service.URI_PathRawDefinition) => string
```

Decides which of `URI_PathRawDefinition.alternatingURI_PathPart` or `URI_PathRawDefinition.specificURI_UntilPath` to use
  and also dealing with the dangling slashes if any.


### Static
#### `normalizeRawObjectDataResponse`

```
<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
  rawObjectDataResponse: AJAX_Service.RawObjectDataResponse,
  validResponseDataSpecification: Readonly<RawObjectDataProcessor.ObjectDataSpecification>
) => AJAX_Service.ObjectDataResponse<RawValidResponseData>
```

As if obvious from the above signature, transforms an object of the following type:

```typescript
type RawObjectDataResponse = Readonly<(
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
)>;
```

to and object of the following type:

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

The main job done by this method is the validation of the response data when response is successful.
Even response is successful, the `InvalidExternalDataError` will be thrown is the response data is invalid.


#### `getExpectedToBeInitializedImplementation`

```
() => AJAX_Service
```

Using for the convenient access to the `implementation` public static field inside `AJAX_Service` class and its inheritors.    

`implementation` field has the `AJAX_Service | null` where `AJAX_Service` actually means "the instance eof inheritor of 
  `AJAX_Service` class" because `AJAX_Service` is abstract.
Initially, this filed is `null` and need to be initialized either directly or via `setup` static method.

When accessing to `AJAX_Service.implementation` directly, the non-null check must be executed.
`getExpectedToBeInitializedImplementation` method takes care about it, so return type is non-nullable but
  if the `implementation` field has not been initialized, the error with `ImplementationHasNotBeenSetError` name 
  ([`name` field](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)).

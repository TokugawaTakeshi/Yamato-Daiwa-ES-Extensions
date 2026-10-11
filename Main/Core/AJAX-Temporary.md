### AJAX
#### `AJAX_Service` Class


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
      <dt>Valida Value Example</dt>
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
): void
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
): Promise<AJAX_Service.ObjectDataResponse<RawValidResponseData>> {
  return AJAX_Service.getExpectedToBeInitializedImplementation().retrieveData(compoundParameter);
}
```

Retrieving the data, then validated it.

+ The data retrieving behavior is implementation-dependent, but the data validation behavior is common.
+ The the implementation will fail the data retrieving with an error, the `DataRetrievingFailedError` will be thrown.
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

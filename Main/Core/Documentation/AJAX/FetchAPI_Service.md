# `FetchAPI_Service` Class

The implementation of [`AJAX_Service` abstract class](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html). 
  abstract class based on [`Fetch API`](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API). 
Works with all modern browsers, and also stable in Node.js since version **22**. 


## Protected Instance Methods
### Implementations of Abstract Methods of `AJAX_Service`

+ `retrieveResponseWithRawObjectData`
+ `submitAndGetRawResponseDataIfAvailable`
+ `retrieveResponseWithTextData`

Retrieves the data via [`Fetch API`](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API);


## Protected Static Methods

You may need these methods only if going to inherit `FetchAPI_Service` class to improve.


### `extractRawObjectDataFromResponse`

```
(response: Response) => Promise<PossiblyReadonlyParsedJSON>
```

The [`json()` method](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) of 
  [`Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response) return the 
  promise the `any`-types payload.
`extractRawObjectDataFromResponse` resolves this promise, then check is response data is actually an object.



### `extractErrorPayloadFromResponse`

```
(response: Response) => 
    Promise<{ errorObjectPayload: PossiblyReadonlyParsedJSON; } | { errorTextPayload: string; }>
```

Even the errored response has been returned, it still may include the response data.
It can be represented either the serialized object or a text, herewith once 
  [`json()` method](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) or
  [`text()` method](https://developer.mozilla.org/en-US/docs/Web/API/Response/text) has been invoked,
  the subsequent invocation of any them will cause an error because the response body has been decoded
  and its encoded data is not available anymore.
To understand how to decode the response data, the `content-type` HTTP header must be checked.
It is exactly what `extractErrorPayloadFromResponse` doing.

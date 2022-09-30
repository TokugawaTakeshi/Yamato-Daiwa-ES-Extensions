# HTTP_StatusCodes enumeration
## All

The enumeration **HTTP_StatusCodes** contains all HTTP status code documented in 
[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

If you are going to pass the HTTP status code as parameter, you may want accept not every HTTP status code.
For example, if you are developing the method like **respondWithError**, from the viewpoint of logic the HTTP status
code must be between 400 and 505. If so, use one or more [subsets](#subsets).

```typescript
console.log(HTTP_StatusCodes.continue) // 100
console.log(HTTP_StatusCodes.switchingProtocols) // 101
console.log(HTTP_StatusCodes.processing) // 102
console.log(HTTP_StatusCodes.earlyHints) // 103

console.log(HTTP_StatusCodes.OK) // 200
console.log(HTTP_StatusCodes.created) // 201
console.log(HTTP_StatusCodes.accepted) // 202
console.log(HTTP_StatusCodes.nonAuthoritativeInformation) // 203
console.log(HTTP_StatusCodes.noContent) // 204
console.log(HTTP_StatusCodes.resetContent) // 205
console.log(HTTP_StatusCodes.partialContent) // 206
console.log(HTTP_StatusCodes.multiStatus) // 207
console.log(HTTP_StatusCodes.alreadyReported) // 208
console.log(HTTP_StatusCodes.IM_Used) // 226

console.log(HTTP_StatusCodes.multipleChoices) // 300
console.log(HTTP_StatusCodes.movedPermanently) // 301
console.log(HTTP_StatusCodes.found) // 302
console.log(HTTP_StatusCodes.seeOther) // 303
console.log(HTTP_StatusCodes.notModified) // 304
console.log(HTTP_StatusCodes.useProxy) // 305
console.log(HTTP_StatusCodes.unused) // 306
console.log(HTTP_StatusCodes.temporaryRedirect) // 307
console.log(HTTP_StatusCodes.permanentRedirect) // 308

console.log(HTTP_StatusCodes.badRequest) // 400
console.log(HTTP_StatusCodes.unauthorized) // 401
console.log(HTTP_StatusCodes.paymentRequired) // 402
console.log(HTTP_StatusCodes.forbidden) // 403
console.log(HTTP_StatusCodes.notFound) // 404
console.log(HTTP_StatusCodes.methodNotAllowed) // 405
console.log(HTTP_StatusCodes.notAcceptable) // 406
console.log(HTTP_StatusCodes.proxyAuthenticationRequired) // 407
console.log(HTTP_StatusCodes.requestTimeout) // 408
console.log(HTTP_StatusCodes.conflict) // 409
console.log(HTTP_StatusCodes.gone) // 410
console.log(HTTP_StatusCodes.lengthRequired) // 411
console.log(HTTP_StatusCodes.preconditionFailed) // 412
console.log(HTTP_StatusCodes.payloadTooLarge) // 413
console.log(HTTP_StatusCodes.URI_TooLong) // 414
console.log(HTTP_StatusCodes.unsupportedMediaType) // 415
console.log(HTTP_StatusCodes.rangeNotSatisfiable) // 416
console.log(HTTP_StatusCodes.expectationFailed) // 417
console.log(HTTP_StatusCodes.IAmATeapot) // 418
console.log(HTTP_StatusCodes.misdirectedRequest) // 421
console.log(HTTP_StatusCodes.unprocessableEntity) // 422
console.log(HTTP_StatusCodes.locked) // 423
console.log(HTTP_StatusCodes.failedDependency) // 424
console.log(HTTP_StatusCodes.tooEarly) // 425
console.log(HTTP_StatusCodes.upgradeRequired) // 426
console.log(HTTP_StatusCodes.preconditionRequired) // 428
console.log(HTTP_StatusCodes.tooManyRequests) // 429
console.log(HTTP_StatusCodes.requestHeaderFieldsTooLarge) // 431
console.log(HTTP_StatusCodes.unavailableForLegalReasons) // 451

console.log(HTTP_StatusCodes.internalServerError) // 500
console.log(HTTP_StatusCodes.notImplemented) // 501
console.log(HTTP_StatusCodes.badGateway) // 502
console.log(HTTP_StatusCodes.serviceUnavailable) // 503
console.log(HTTP_StatusCodes.gatewayTimeout) // 504
console.log(HTTP_StatusCodes.HTTP_VersionNotSupported) // 505
console.log(HTTP_StatusCodes.variantAlsoNegotiates) // 506
console.log(HTTP_StatusCodes.insufficientStorage) // 507
console.log(HTTP_StatusCodes.loopDetected) // 508
console.log(HTTP_StatusCodes.notExtended) // 510
console.log(HTTP_StatusCodes.networkAuthenticationRequired) // 511
```


## Subsets

### Information responses

```typescript
console.log(InformationalResponsesHTTP_StatusCodes.continue) // 100
console.log(InformationalResponsesHTTP_StatusCodes.switchingProtocols) // 101
console.log(InformationalResponsesHTTP_StatusCodes.processing) // 102
console.log(InformationalResponsesHTTP_StatusCodes.earlyHints) // 103
```

[📖 More about information responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses)


### Successful responses

```typescript
console.log(SuccessfulResponsesHTTP_StatusCodes.OK) // 200
console.log(SuccessfulResponsesHTTP_StatusCodes.created) // 201
console.log(SuccessfulResponsesHTTP_StatusCodes.accepted) // 202
console.log(SuccessfulResponsesHTTP_StatusCodes.nonAuthoritativeInformation) // 203
console.log(SuccessfulResponsesHTTP_StatusCodes.noContent) // 204
console.log(SuccessfulResponsesHTTP_StatusCodes.resetContent) // 205
console.log(SuccessfulResponsesHTTP_StatusCodes.partialContent) // 206
console.log(SuccessfulResponsesHTTP_StatusCodes.multiStatus) // 207
console.log(SuccessfulResponsesHTTP_StatusCodes.alreadyReported) // 208
console.log(SuccessfulResponsesHTTP_StatusCodes.IM_Used) // 226
```

[📖 More about successful responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses)


### Redirection messages

```typescript
console.log(RedirectionResponsesHTTP_StatusCodes.multipleChoices) // 300
console.log(RedirectionResponsesHTTP_StatusCodes.movedPermanently) // 301
console.log(RedirectionResponsesHTTP_StatusCodes.found) // 302
console.log(RedirectionResponsesHTTP_StatusCodes.seeOther) // 303
console.log(RedirectionResponsesHTTP_StatusCodes.notModified) // 304
console.log(RedirectionResponsesHTTP_StatusCodes.useProxy) // 305
console.log(RedirectionResponsesHTTP_StatusCodes.unused) // 306
console.log(RedirectionResponsesHTTP_StatusCodes.temporaryRedirect) // 307
console.log(RedirectionResponsesHTTP_StatusCodes.permanentRedirect) // 308
```

[📖 More about redirection messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)


### Client error responses

```typescript
console.log(ClientErrorsHTTP_StatusCodes.badRequest) // 400
console.log(ClientErrorsHTTP_StatusCodes.unauthorized) // 401
console.log(ClientErrorsHTTP_StatusCodes.paymentRequired) // 402
console.log(ClientErrorsHTTP_StatusCodes.forbidden) // 403
console.log(ClientErrorsHTTP_StatusCodes.notFound) // 404
console.log(ClientErrorsHTTP_StatusCodes.methodNotAllowed) // 405
console.log(ClientErrorsHTTP_StatusCodes.notAcceptable) // 406
console.log(ClientErrorsHTTP_StatusCodes.proxyAuthenticationRequired) // 407
console.log(ClientErrorsHTTP_StatusCodes.requestTimeout) // 408
console.log(ClientErrorsHTTP_StatusCodes.conflict) // 409
console.log(ClientErrorsHTTP_StatusCodes.gone) // 410
console.log(ClientErrorsHTTP_StatusCodes.lengthRequired) // 411
console.log(ClientErrorsHTTP_StatusCodes.preconditionFailed) // 412
console.log(ClientErrorsHTTP_StatusCodes.payloadTooLarge) // 413
console.log(ClientErrorsHTTP_StatusCodes.URI_TooLong) // 414
console.log(ClientErrorsHTTP_StatusCodes.unsupportedMediaType) // 415
console.log(ClientErrorsHTTP_StatusCodes.rangeNotSatisfiable) // 416
console.log(ClientErrorsHTTP_StatusCodes.expectationFailed) // 417
console.log(ClientErrorsHTTP_StatusCodes.IAmATeapot) // 418
console.log(ClientErrorsHTTP_StatusCodes.misdirectedRequest) // 421
console.log(ClientErrorsHTTP_StatusCodes.unprocessableEntity) // 422
console.log(ClientErrorsHTTP_StatusCodes.locked) // 423
console.log(ClientErrorsHTTP_StatusCodes.failedDependency) // 424
console.log(ClientErrorsHTTP_StatusCodes.tooEarly) // 425
console.log(ClientErrorsHTTP_StatusCodes.upgradeRequired) // 426
console.log(ClientErrorsHTTP_StatusCodes.preconditionRequired) // 428
console.log(ClientErrorsHTTP_StatusCodes.tooManyRequests) // 429
console.log(ClientErrorsHTTP_StatusCodes.requestHeaderFieldsTooLarge) // 431
console.log(ClientErrorsHTTP_StatusCodes.unavailableForLegalReasons) // 451
```

[📖 More about client error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)


### Server error responses

```typescript
console.log(ServerErrorsHTTP_StatusCodes.internalServerError) // 500
console.log(ServerErrorsHTTP_StatusCodes.notImplemented) // 501
console.log(ServerErrorsHTTP_StatusCodes.badGateway) // 502
console.log(ServerErrorsHTTP_StatusCodes.serviceUnavailable) // 503
console.log(ServerErrorsHTTP_StatusCodes.gatewayTimeout) // 504
console.log(ServerErrorsHTTP_StatusCodes.HTTP_VersionNotSupported) // 505
console.log(ServerErrorsHTTP_StatusCodes.variantAlsoNegotiates) // 506
console.log(ServerErrorsHTTP_StatusCodes.insufficientStorage) // 507
console.log(ServerErrorsHTTP_StatusCodes.loopDetected) // 508
console.log(ServerErrorsHTTP_StatusCodes.notExtended) // 510
console.log(ServerErrorsHTTP_StatusCodes.networkAuthenticationRequired) // 511
```

[📖 More about server error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)

/* [ Reference ] https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */

export enum HTTP_StatusCodes {

  continue = 100,
  switchingProtocols = 101,
  processing = 102,
  earlyHints = 103,

  OK = 200,
  created = 201,
  accepted = 202,
  nonAuthoritativeInformation = 203,
  noContent = 204,
  resetContent = 205,
  partialContent = 206,
  multiStatus = 207,
  alreadyReported = 208,
  IM_Used = 226,

  multipleChoices = 300,
  movedPermanently = 301,
  found = 302,
  seeOther = 303,
  notModified = 304,
  useProxy = 305,
  unused = 306,
  temporaryRedirect = 307,
  permanentRedirect = 308,

  badRequest = 400,
  unauthorized = 401,
  paymentRequired = 402,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  notAcceptable = 406,
  proxyAuthenticationRequired = 407,
  requestTimeout = 408,
  conflict = 409,
  gone = 410,
  lengthRequired = 411,
  preconditionFailed = 412,
  payloadTooLarge = 413,
  URI_TooLong = 414,
  unsupportedMediaType = 415,
  rangeNotSatisfiable = 416,
  expectationFailed = 417,
  IAmATeapot = 418,
  misdirectedRequest = 421,
  unprocessableEntity = 422,
  locked = 423,
  failedDependency = 424,
  tooEarly = 425,
  upgradeRequired = 426,
  preconditionRequired = 428,
  tooManyRequests = 429,
  requestHeaderFieldsTooLarge = 431,
  unavailableForLegalReasons = 451,

  internalServerError = 500,
  notImplemented = 501,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
  HTTP_VersionNotSupported = 505,
  variantAlsoNegotiates = 506,
  insufficientStorage = 507,
  loopDetected = 508,
  notExtended = 510,
  networkAuthenticationRequired = 511
}

export enum InformationalResponsesHTTP_StatusCodes {
  continue = 100,
  switchingProtocols = 101,
  processing = 102,
  earlyHints = 103
}

export enum SuccessfulResponsesHTTP_StatusCodes {
  OK = 200,
  created = 201,
  accepted = 202,
  nonAuthoritativeInformation = 203,
  noContent = 204,
  resetContent = 205,
  partialContent = 206,
  multiStatus = 207,
  alreadyReported = 208,
  IM_Used = 226
}

export enum RedirectionResponsesHTTP_StatusCodes {
  multipleChoices = 300,
  movedPermanently = 301,
  found = 302,
  seeOther = 303,
  notModified = 304,
  useProxy = 305,
  unused = 306,
  temporaryRedirect = 307,
  permanentRedirect = 308
}

export enum ClientErrorsHTTP_StatusCodes {
  badRequest = 400,
  unauthorized = 401,
  paymentRequired = 402,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  notAcceptable = 406,
  proxyAuthenticationRequired = 407,
  requestTimeout = 408,
  conflict = 409,
  gone = 410,
  lengthRequired = 411,
  preconditionFailed = 412,
  payloadTooLarge = 413,
  URI_TooLong = 414,
  unsupportedMediaType = 415,
  rangeNotSatisfiable = 416,
  expectationFailed = 417,
  IAmATeapot = 418,
  misdirectedRequest = 421,
  unprocessableEntity = 422,
  locked = 423,
  failedDependency = 424,
  tooEarly = 425,
  upgradeRequired = 426,
  preconditionRequired = 428,
  tooManyRequests = 429,
  requestHeaderFieldsTooLarge = 431,
  unavailableForLegalReasons = 451
}


export enum ServerErrorsHTTP_StatusCodes {
  internalServerError = 500,
  notImplemented = 501,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
  HTTP_VersionNotSupported = 505,
  variantAlsoNegotiates = 506,
  insufficientStorage = 507,
  loopDetected = 508,
  notExtended = 510,
  networkAuthenticationRequired = 511
}

enum HTTP_StatusCodes {

  continue = 100,
  switchingProtocols = 101,

  OK = 200,
  created = 201,
  nonAuthoritativeInformation = 203,
  noContent = 204,
  resetContent = 205,
  partialContent = 206,

  multipleChoices = 300,
  movedPermanently = 301,
  found = 302,
  seeOther = 303,
  notModified = 304,
  useProxy = 305,
  unused = 306,
  temporaryRedirect = 307,

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
  requestEntityTooLarge = 413,
  requestURL_TooLong = 414,
  unsupportedMediaType = 415,
  requestedRangeNotSatisfiable = 416,
  expectationFailed = 417,

  internalServerError = 500,
  notImplemented = 501,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
  HTTP_VersionNotSupported = 505
}

export default HTTP_StatusCodes;

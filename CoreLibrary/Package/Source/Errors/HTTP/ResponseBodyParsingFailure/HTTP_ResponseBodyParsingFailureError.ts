import HTTP_ResponseBodyParsingFailureErrorLocalization__english from
    "./HTTP_ResponseBodyParsingFailureErrorLocalization.english";


class HTTP_ResponseBodyParsingFailureError extends Error {

  public static readonly NAME: string = "HTTP_ResponseBodyParsingFailureError";

  public static localization: HTTP_ResponseBodyParsingFailureError.Localization =
      HTTP_ResponseBodyParsingFailureErrorLocalization__english;


  public constructor(message: string) {

    super();

    this.name = HTTP_ResponseBodyParsingFailureError.NAME;
    this.message = message;

  }
}


namespace HTTP_ResponseBodyParsingFailureError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default HTTP_ResponseBodyParsingFailureError;

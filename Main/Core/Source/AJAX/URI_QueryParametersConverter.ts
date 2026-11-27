import isString from "../TypeGuards/Strings/isString";
import splitString from "../Strings/splitString";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import type { DeepPartial } from "../Types/PartialObjects/DeepPartial";
import type { ParsedJSON, ReadonlyParsedJSON } from "../Types/ParsedJSON";


export abstract class URI_QueryParametersConverter {

  private static options: URI_QueryParametersConverter.CompleteOptions =
      {
        numbers: {
          mustTryParseNumberForEachValue: true
        },
        booleans: {
          mustConsiderOmittedValueAsBooleanTrueValue: true,
          mustConsiderStringifiedTrueAsBooleanTrue: true,
          mustConsiderStringifiedFalseAsBooleanFalse: true
        }
      };


  public static setDefaultOptions(options: URI_QueryParametersConverter.SelectiveOptions): void {
    URI_QueryParametersConverter.options =
        {
          numbers: { ...URI_QueryParametersConverter.options.numbers, ...options.numbers },
          booleans: { ...URI_QueryParametersConverter.options.booleans, ...options.booleans }
        };
  }


  public static serialize(URI_QueryParameters: ReadonlyParsedJSON): string {

    const stringifiedKeysAndValueParis: Array<string> = [];

    for (const [ key, value ] of Object.entries(URI_QueryParameters)) {

      if (isString(value)) {

        if (value === "") {
          stringifiedKeysAndValueParis.push(key);
          continue;
        }


        stringifiedKeysAndValueParis.push(`${ key }=${ value }`);

      }

    }

    return stringifiedKeysAndValueParis.join("&");

  }

  public static deserialize(queryParameters: string): ReadonlyParsedJSON {

    const deserializedQueryParameters: ParsedJSON = {};

    for (const stringifiedPair of splitString(queryParameters, "&")) {

      const [ key, value ]: ReadonlyArray<string> = splitString(stringifiedPair, "=");


      /* [ Theory ]
       * ● Undefined value is possible when there is no "=" thus the value.
       * ● Empty string is possible when there is "=" character but no value. */
      if (isUndefined(value) || value.length === 0) {

        deserializedQueryParameters[key] =
            this.options.booleans.mustConsiderOmittedValueAsBooleanTrueValue ?
                true : "";

        continue;

      }


      if (value === "true") {

        deserializedQueryParameters[key] =
            this.options.booleans.mustConsiderStringifiedTrueAsBooleanTrue ?
                true : "true";

        continue;

      }


      if (value === "false") {

        deserializedQueryParameters[key] =
            this.options.booleans.mustConsiderStringifiedFalseAsBooleanFalse ?
                false : "false";

        continue;

      }


      deserializedQueryParameters[key] = value;

    }

    return deserializedQueryParameters;

  }

}


export namespace URI_QueryParametersConverter {

  export type CompleteOptions =
      Readonly<{
        numbers: Options.Numbers;
        booleans: Options.Booleans;
      }>;

  export type SelectiveOptions = DeepPartial<CompleteOptions>;

  export namespace Options {

    export type Numbers =
        Readonly<{
          mustTryParseNumberForEachValue: boolean;
        }>;

    export type Booleans =
        Readonly<{
          mustConsiderOmittedValueAsBooleanTrueValue: boolean;
          mustConsiderStringifiedTrueAsBooleanTrue: boolean;
          mustConsiderStringifiedFalseAsBooleanFalse: boolean;
        }>;
  }

}


export default URI_QueryParametersConverter;

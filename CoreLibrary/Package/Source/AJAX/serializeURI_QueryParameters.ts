import type { ReadonlyParsedJSON } from "../Types/ParsedJSON";
import type URI_QueryParametersSerializer from "./URI_QueryParametersSerializer";
import isString from "../TypeGuards/Strings/isString";
import { isBoolean, isNumber } from "../index";


/** @experimental */
const serializeURI_QueryParameters: URI_QueryParametersSerializer = (URI_QueryParameters: ReadonlyParsedJSON): string => {

  const stringifiedKeysAndValueParis: Array<string> = [];

  for (const [ key, value ] of Object.entries(URI_QueryParameters)) {

    if (isString(value) || isNumber(value, { mustConsiderNaN_AsNumber: true }) || isBoolean(value)) {
      stringifiedKeysAndValueParis.push(`${ key }=${ value }`);
    }

  }


  return stringifiedKeysAndValueParis.join("&");

};


export default serializeURI_QueryParameters;

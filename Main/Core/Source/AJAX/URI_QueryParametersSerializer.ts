import type { ReadonlyParsedJSON } from "../Types/ParsedJSON";


export type URI_QueryParametersSerializer = (URI_QueryParameters: ReadonlyParsedJSON) => string;

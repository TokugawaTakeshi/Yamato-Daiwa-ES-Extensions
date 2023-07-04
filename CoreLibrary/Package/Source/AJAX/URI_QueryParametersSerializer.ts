import type { ReadonlyParsedJSON } from "../Types/ParsedJSON";


type URI_QueryParametersSerializer = (URI_QueryParameters: ReadonlyParsedJSON) => string;


export default URI_QueryParametersSerializer;

export type ParsedJSON = ParsedJSON_Object | ParsedJSON_Array;

export type ParsedJSON_Object = {
  [key: string]: ParsedJSON_NestedProperty;
};

export type ParsedJSON_Array = Array<ParsedJSON_NestedProperty>;


/* 〔 Theory 〕
 *    In indexed type does not respect the 'undefined' value like '{ [key: string]: string; }' it means 'any property
 *    which will be called is definitely exists', that is impossible. Thus, the 'ParsedJSON_NestedProperty' as very wide
 *    type must respect the cases when called property does not exist. 'null' is also possible scenario.
 */
export type ParsedJSON_NestedProperty =
    | number
    | string
    | boolean
    | null
    | ParsedJSON_Object
    | ParsedJSON_Array
    | undefined;

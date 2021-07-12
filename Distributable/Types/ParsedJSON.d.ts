export declare type ParsedJSON = ParsedJSON_Object | ParsedJSON_Array;
export declare type ParsedJSON_Object = {
    [key: string]: ParsedJSON_NestedProperty;
};
export declare type ParsedJSON_Array = Array<ParsedJSON_NestedProperty>;
export declare type ParsedJSON_NestedProperty = number | string | boolean | null | ParsedJSON_Object | ParsedJSON_Array | undefined;

export declare namespace IsStringOfLengthCheckingOperation {
    type Options__ExactSymbolsCountCase = {
        exactSymbolsCount: number;
        minimalSymbolsCount?: undefined;
        maximalSymbolsCount?: undefined;
    };
    type Options__MinimalSymbolsCountCase = {
        minimalSymbolsCount: number;
        maximalSymbolsCount?: undefined;
        exactSymbolsCount?: undefined;
    };
    type Options__MaximalSymbolsCountCase = {
        maximalSymbolsCount: number;
        minimalSymbolsCount?: undefined;
        exactSymbolsCount?: undefined;
    };
    type Options__MinimalAndMaximalSymbolsCountCase = {
        minimalSymbolsCount: number;
        maximalSymbolsCount: number;
        exactSymbolsCount?: undefined;
    };
    type Options = Options__ExactSymbolsCountCase | Options__MinimalSymbolsCountCase | Options__MaximalSymbolsCountCase | Options__MinimalAndMaximalSymbolsCountCase;
    function isStringOfLength(potentialString: unknown, options: Options): potentialString is string;
}
declare const _default: typeof IsStringOfLengthCheckingOperation.isStringOfLength;
export default _default;

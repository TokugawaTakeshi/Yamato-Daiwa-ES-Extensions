export declare namespace IsArrayOfLengthCheckingOperation {
    type Options__ExactElementsCountCase = {
        exactElementsCount: number;
        minimalElementsCount?: undefined;
        maximalElementsCount?: undefined;
    };
    type Options__MinimalElementsCountCase = {
        minimalElementsCount: number;
        maximalElementsCount?: undefined;
        exactElementsCount?: undefined;
    };
    type Options__MaximalElementsCountCase = {
        maximalElementsCount: number;
        minimalElementsCount?: undefined;
        exactElementsCount?: undefined;
    };
    type Options__MinimalAndMaximalElementsCountCase = {
        minimalElementsCount: number;
        maximalElementsCount: number;
        exactElementsCount?: undefined;
    };
    type Options = Options__ExactElementsCountCase | Options__MinimalElementsCountCase | Options__MaximalElementsCountCase | Options__MinimalAndMaximalElementsCountCase;
    function isArrayOfLength<ArrayElement>(potentialArray: unknown, options: Options): potentialArray is Array<ArrayElement>;
}
declare const _default: typeof IsArrayOfLengthCheckingOperation.isArrayOfLength;
export default _default;

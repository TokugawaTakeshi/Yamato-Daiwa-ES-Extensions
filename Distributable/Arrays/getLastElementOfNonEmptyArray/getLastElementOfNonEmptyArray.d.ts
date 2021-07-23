export declare namespace GetLastElementOfNonEmptyArrayOperation {
    type Localization = {
        elementNotFoundErrorMessage: string;
    };
    function setLocalization(newLocalization: Localization): void;
    function getLastElementOfNonEmptyArray<ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement;
}
declare const _default: typeof GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray;
export default _default;

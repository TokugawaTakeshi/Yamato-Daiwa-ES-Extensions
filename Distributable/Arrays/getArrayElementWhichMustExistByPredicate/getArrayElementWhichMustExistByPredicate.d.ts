export declare namespace GetArrayElementWhichMustExistByPredicateOperation {
    type Localization = {
        elementNotFoundErrorMessage: string;
    };
    function setLocalization(newLocalization: Localization): void;
    function getArrayElementWhichMustExistByPredicate<ArrayElement>(targetArray: Array<ArrayElement>, predicate: (element: ArrayElement) => boolean): ArrayElement;
}
declare const _default: typeof GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate;
export default _default;

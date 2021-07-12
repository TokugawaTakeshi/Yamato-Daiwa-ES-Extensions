declare class ClassRedundantSubsequentInitializationError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: ClassRedundantSubsequentInitializationError.Localization): void;
    constructor(parametersObject: ClassRedundantSubsequentInitializationError.ConstructorParametersObject);
}
declare namespace ClassRedundantSubsequentInitializationError {
    type ConstructorParametersObject = {
        customMessage: string;
    } | {
        className: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            className: string;
        };
    }
}
export default ClassRedundantSubsequentInitializationError;

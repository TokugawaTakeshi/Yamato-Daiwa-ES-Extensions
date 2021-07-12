declare class ClassRequiredInitializationHasNotBeenExecutedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: ClassRequiredInitializationHasNotBeenExecutedError.Localization): void;
    constructor(parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.ConstructorParametersObject);
}
declare namespace ClassRequiredInitializationHasNotBeenExecutedError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            className: string;
            initializingMethodName: string;
        };
    }
}
export default ClassRequiredInitializationHasNotBeenExecutedError;

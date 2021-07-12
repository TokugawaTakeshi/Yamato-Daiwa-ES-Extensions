declare class ModuleDynamicLoadingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: ModuleDynamicLoadingFailedError.Localization): void;
    constructor(parametersObject: ModuleDynamicLoadingFailedError.ConstructorParametersObject);
}
declare namespace ModuleDynamicLoadingFailedError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            modulePath: string;
        };
    }
}
export default ModuleDynamicLoadingFailedError;

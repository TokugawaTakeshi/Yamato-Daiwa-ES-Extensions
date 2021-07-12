declare class InvalidConfigError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    static localization: InvalidConfigError.Localization;
    static setLocalization(localization: InvalidConfigError.Localization): void;
    constructor(parametersObject: InvalidConfigError.ConstructorParametersObject);
}
declare namespace InvalidConfigError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            mentionToConfig: string;
        };
    }
}
export default InvalidConfigError;

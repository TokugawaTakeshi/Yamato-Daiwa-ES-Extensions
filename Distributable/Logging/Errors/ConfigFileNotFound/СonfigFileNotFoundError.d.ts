declare class ConfigFileNotFoundError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: ConfigFileNotFoundError.Localization): void;
    constructor(parametersObject: ConfigFileNotFoundError.ConstructorParametersObject);
}
declare namespace ConfigFileNotFoundError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            targetTechnologyName: string;
            configFilePathOrMultipleOfThem: string | Array<string>;
        };
    }
}
export default ConfigFileNotFoundError;

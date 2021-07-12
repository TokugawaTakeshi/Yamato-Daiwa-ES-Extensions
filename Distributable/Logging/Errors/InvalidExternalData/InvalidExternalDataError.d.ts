declare class InvalidExternalDataError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: InvalidExternalDataError.Localization): void;
    constructor(parametersObject: InvalidExternalDataError.ConstructorParametersObject);
}
declare namespace InvalidExternalDataError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            mentionToExpectedData: string;
            messageSpecificPart?: string;
        };
    }
}
export default InvalidExternalDataError;

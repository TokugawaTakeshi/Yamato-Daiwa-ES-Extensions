declare class InvalidParameterValueError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: InvalidParameterValueError.Localization): void;
    constructor(parametersObject: InvalidParameterValueError.ConstructorParametersObject);
}
declare namespace InvalidParameterValueError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            parameterName: string;
            messageSpecificPart?: string;
        };
    }
}
export default InvalidParameterValueError;

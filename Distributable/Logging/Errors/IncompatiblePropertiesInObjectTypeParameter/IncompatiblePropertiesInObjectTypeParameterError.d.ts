declare class IncompatiblePropertiesInObjectTypeParameterError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: IncompatiblePropertiesInObjectTypeParameterError.Localization): void;
    constructor(parametersObject: IncompatiblePropertiesInObjectTypeParameterError.ConstructorParametersObject);
}
declare namespace IncompatiblePropertiesInObjectTypeParameterError {
    type ConstructorParametersObject = {
        customMessage: string;
    } | Localization.GenericDescriptionPartTemplateParameters;
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            parameterName: string;
            conflictingPropertyName: string;
            incompatiblePropertiesNames: Array<string>;
        };
    }
}
export default IncompatiblePropertiesInObjectTypeParameterError;

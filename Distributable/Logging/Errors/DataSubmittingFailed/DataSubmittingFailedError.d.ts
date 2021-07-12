declare class DataSubmittingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: DataSubmittingFailedError.Localization): void;
    constructor(parametersObject: DataSubmittingFailedError.ConstructorParametersObject);
}
declare namespace DataSubmittingFailedError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            mentionToData: string;
        };
    }
}
export default DataSubmittingFailedError;

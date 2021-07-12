declare class DataRetrievingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: DataRetrievingFailedError.Localization): void;
    constructor(parametersObject: DataRetrievingFailedError.ConstructorParametersObject);
}
declare namespace DataRetrievingFailedError {
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
export default DataRetrievingFailedError;

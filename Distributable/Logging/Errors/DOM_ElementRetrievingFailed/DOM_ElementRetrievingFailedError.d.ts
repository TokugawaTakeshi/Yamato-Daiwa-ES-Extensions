declare class DOM_ElementRetrievingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: DOM_ElementRetrievingFailedError.Localization): void;
    constructor(parametersObject: DOM_ElementRetrievingFailedError.ConstructorParametersObject);
}
declare namespace DOM_ElementRetrievingFailedError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            selector: string;
        };
    }
}
export default DOM_ElementRetrievingFailedError;

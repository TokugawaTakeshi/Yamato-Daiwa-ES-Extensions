declare class FileWritingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: FileWritingFailedError.Localization): void;
    constructor(parametersObject: FileWritingFailedError.ConstructorParametersObject);
}
declare namespace FileWritingFailedError {
    type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | {
        customMessage: string;
    };
    type Localization = {
        readonly defaultTitle: string;
        readonly genericDescriptionPartTemplate: (parametersObject: Localization.GenericDescriptionPartTemplateParameters) => string;
    };
    namespace Localization {
        type GenericDescriptionPartTemplateParameters = {
            filePath: string;
        };
    }
}
export default FileWritingFailedError;

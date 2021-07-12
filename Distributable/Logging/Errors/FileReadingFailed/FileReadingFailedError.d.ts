declare class FileReadingFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: FileReadingFailedError.Localization): void;
    constructor(parametersObject: FileReadingFailedError.ConstructorParametersObject);
}
declare namespace FileReadingFailedError {
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
export default FileReadingFailedError;

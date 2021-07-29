import FileWritingFailedErrorLocalization__English from "./FileWritingFailedErrorLocalization__English";
class FileWritingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = FileWritingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = FileWritingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return FileWritingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        FileWritingFailedError.localization = localization;
    }
}
FileWritingFailedError.NAME = "FileWritingFailedError";
FileWritingFailedError.localization = FileWritingFailedErrorLocalization__English;
export default FileWritingFailedError;

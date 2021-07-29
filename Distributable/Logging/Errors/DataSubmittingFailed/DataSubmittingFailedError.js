import DataSubmittingFailedErrorLocalization__English from "./DataSubmittingFailedErrorLocalization__English";
class DataSubmittingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = DataSubmittingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = DataSubmittingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return DataSubmittingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        DataSubmittingFailedError.localization = localization;
    }
}
DataSubmittingFailedError.NAME = "DataSubmittingFailedError";
DataSubmittingFailedError.localization = DataSubmittingFailedErrorLocalization__English;
export default DataSubmittingFailedError;

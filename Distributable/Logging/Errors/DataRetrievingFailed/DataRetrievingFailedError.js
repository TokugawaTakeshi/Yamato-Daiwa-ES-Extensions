import DataRetrievingFailedErrorLocalization__English from "./DataRetrievingFailedErrorLocalization__English";
class DataRetrievingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = DataRetrievingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = DataRetrievingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return DataRetrievingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        DataRetrievingFailedError.localization = localization;
    }
}
DataRetrievingFailedError.NAME = "DataRetrievingFailedError";
DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__English;
export default DataRetrievingFailedError;

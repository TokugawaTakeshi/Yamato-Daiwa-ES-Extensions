"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataRetrievingFailedErrorLocalization__English_1 = require("./DataRetrievingFailedErrorLocalization__English");
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
DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__English_1.default;
exports.default = DataRetrievingFailedError;

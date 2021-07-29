import DOM_ElementRetrievingFailedErrorLocalization__English from "./DOM_ElementRetrievingFailedErrorLocalization__English";
class DOM_ElementRetrievingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = DOM_ElementRetrievingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = DOM_ElementRetrievingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return DOM_ElementRetrievingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        DOM_ElementRetrievingFailedError.localization = localization;
    }
}
DOM_ElementRetrievingFailedError.NAME = "DOM_ElementRetrievingFailedError";
DOM_ElementRetrievingFailedError.localization = DOM_ElementRetrievingFailedErrorLocalization__English;
export default DOM_ElementRetrievingFailedError;

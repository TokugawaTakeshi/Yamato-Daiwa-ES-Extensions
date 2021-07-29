import ModuleDynamicLoadingFailedErrorLocalization__English from "./ModuleDynamicLoadingFailedErrorLocalization__English";
class ModuleDynamicLoadingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = ModuleDynamicLoadingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = ModuleDynamicLoadingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return ModuleDynamicLoadingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        ModuleDynamicLoadingFailedError.localization = localization;
    }
}
ModuleDynamicLoadingFailedError.NAME = "ModuleDynamicLoadingFailure";
ModuleDynamicLoadingFailedError.localization = ModuleDynamicLoadingFailedErrorLocalization__English;
export default ModuleDynamicLoadingFailedError;

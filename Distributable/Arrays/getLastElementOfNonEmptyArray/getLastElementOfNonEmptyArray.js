import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Logging/Errors/UnexpectedEvent/UnexpectedEventError";
import GetLastElementOfNonEmptyArrayOperationLocalization__English from "./GetLastElementOfNonEmptyArrayOperationLocalization__English";
export var GetLastElementOfNonEmptyArrayOperation;
(function (GetLastElementOfNonEmptyArrayOperation) {
    let localization = GetLastElementOfNonEmptyArrayOperationLocalization__English;
    function setLocalization(newLocalization) {
        localization = newLocalization;
    }
    GetLastElementOfNonEmptyArrayOperation.setLocalization = setLocalization;
    function getLastElementOfNonEmptyArray(targetArray) {
        if (targetArray.length === 0) {
            Logger.throwErrorAndLog({
                errorInstance: new UnexpectedEventError(localization.elementNotFoundErrorMessage),
                title: UnexpectedEventError.DEFAULT_TITLE,
                occurrenceLocation: "getLastElementOfNonEmptyArray(targetArray)"
            });
        }
        return targetArray[targetArray.length - 1];
    }
    GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray = getLastElementOfNonEmptyArray;
})(GetLastElementOfNonEmptyArrayOperation || (GetLastElementOfNonEmptyArrayOperation = {}));
export default GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray;

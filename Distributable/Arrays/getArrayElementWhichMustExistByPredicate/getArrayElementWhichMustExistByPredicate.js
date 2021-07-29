import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Logging/Errors/UnexpectedEvent/UnexpectedEventError";
import GetArrayElementWhichMustExistByPredicateOperationLocalization__English from "./GetArrayElementWhichMustExistByPredicateOperationLocalization__English";
export var GetArrayElementWhichMustExistByPredicateOperation;
(function (GetArrayElementWhichMustExistByPredicateOperation) {
    let localization = GetArrayElementWhichMustExistByPredicateOperationLocalization__English;
    function setLocalization(newLocalization) {
        localization = newLocalization;
    }
    GetArrayElementWhichMustExistByPredicateOperation.setLocalization = setLocalization;
    function getArrayElementWhichMustExistByPredicate(targetArray, predicate) {
        const desiredElement = targetArray.find(predicate);
        if (typeof desiredElement === "undefined") {
            Logger.throwErrorAndLog({
                errorInstance: new UnexpectedEventError(localization.elementNotFoundErrorMessage),
                title: UnexpectedEventError.DEFAULT_TITLE,
                occurrenceLocation: "getArrayElementWhichMustExistByPredicate(targetArray, predicate)"
            });
        }
        return desiredElement;
    }
    GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate = getArrayElementWhichMustExistByPredicate;
})(GetArrayElementWhichMustExistByPredicateOperation || (GetArrayElementWhichMustExistByPredicateOperation = {}));
export default GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate;

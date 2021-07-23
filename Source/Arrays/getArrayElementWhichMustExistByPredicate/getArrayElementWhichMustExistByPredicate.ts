import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Logging/Errors/UnexpectedEvent/UnexpectedEventError";
import GetArrayElementWhichMustExistByPredicateOperationLocalization__English
  from "./GetArrayElementWhichMustExistByPredicateOperationLocalization__English";


export namespace GetArrayElementWhichMustExistByPredicateOperation {

  export type Localization = {
    elementNotFoundErrorMessage: string;
  };

  let localization: Localization = GetArrayElementWhichMustExistByPredicateOperationLocalization__English;

  export function setLocalization(newLocalization: Localization): void {
    localization = newLocalization;
  }

  export function getArrayElementWhichMustExistByPredicate<ArrayElement>(
    targetArray: Array<ArrayElement>, predicate: (element: ArrayElement) => boolean
  ): ArrayElement {

    const desiredElement: ArrayElement | undefined = targetArray.find(predicate);

    if (typeof desiredElement === "undefined") {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(localization.elementNotFoundErrorMessage),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getArrayElementWhichMustExistByPredicate(targetArray, predicate)"
      });
    }

    return desiredElement;
  }
}


export default GetArrayElementWhichMustExistByPredicateOperation.getArrayElementWhichMustExistByPredicate;

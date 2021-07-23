import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Logging/Errors/UnexpectedEvent/UnexpectedEventError";
import GetLastElementOfNonEmptyArrayOperationLocalization__English
  from "./GetLastElementOfNonEmptyArrayOperationLocalization__English";


export namespace GetLastElementOfNonEmptyArrayOperation {

  export type Localization = {
    elementNotFoundErrorMessage: string;
  };

  let localization: Localization = GetLastElementOfNonEmptyArrayOperationLocalization__English;

  export function setLocalization(newLocalization: Localization): void {
    localization = newLocalization;
  }

  export function getLastElementOfNonEmptyArray<ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement {

    if (targetArray.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(localization.elementNotFoundErrorMessage),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getLastElementOfNonEmptyArray(targetArray)"
      });
    }

    return targetArray[targetArray.length - 1];
  }
}


export default GetLastElementOfNonEmptyArrayOperation.getLastElementOfNonEmptyArray;

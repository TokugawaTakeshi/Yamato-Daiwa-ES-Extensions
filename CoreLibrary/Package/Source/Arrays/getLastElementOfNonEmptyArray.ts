import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Logging/Errors/UnexpectedEvent/UnexpectedEventError";


export default function getLastElementOfNonEmptyArray<ArrayElement>(targetArray: Array<ArrayElement>): ArrayElement {

  if (targetArray.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        "The array is empty thus it has not last element. As it follows from the function name, the empty arrays are " +
        "being considered as error."
      ),
      title: UnexpectedEventError.DEFAULT_TITLE,
      occurrenceLocation: "getLastElementOfNonEmptyArray(targetArray)"
    });
  }


  return targetArray[targetArray.length - 1];
}

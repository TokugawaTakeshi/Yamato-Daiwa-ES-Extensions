import isUndefined from "../../TypeGuards/Nullables/isUndefined";
import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getLastElementOfArray<ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): ArrayElement | null;

export default function getLastElementOfArray<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  options: Readonly<{ mustThrowErrorIfArrayIsEmpty: true; }>
): ArrayElement;


export default function getLastElementOfArray<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  options?: Readonly<{ mustThrowErrorIfArrayIsEmpty: true; }>
): ArrayElement | null {

  const lastElementOfTargetArray: ArrayElement | undefined = targetArray[targetArray.length - 1];

  if (isUndefined(lastElementOfTargetArray)) {

    if (options?.mustThrowErrorIfArrayIsEmpty === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, target array is empty thus there is no the last element could be accessed."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getLastElementOfArray(targetArray, options)"
      });
    }


    return null;

  }


  return lastElementOfTargetArray;

}

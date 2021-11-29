import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Logging/Errors/UnexpectedEvent/UnexpectedEventError";


export namespace GetArrayElementMatchingWithPredicateIfSuchElementExactlyOneOperation {

  export type Localization = {
    elementNotFoundErrorMessage: string;
    elementSatisfiedToPredicateIsNotSingle: string;
  };

  export const Localization__English: Localization = {
    elementNotFoundErrorMessage: "Array element satisfied to specified predicate not found.",
    elementSatisfiedToPredicateIsNotSingle: "Array element satisfied to specified predicate not found. As is follows " +
        "from the function name, two or more matches case is being considered as unexpected event."
  };

  export let localization: Localization = Localization__English;

  export function setLocalization(newLocalization: Localization): void {
    localization = newLocalization;
  }
}


export function getArrayElementMatchingWithPredicateIfSuchElementExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): ArrayElement | null;

export function getArrayElementMatchingWithPredicateIfSuchElementExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { throwErrorIfElementNotFoundOrMoreThan1: true; }
): ArrayElement;


export default function getArrayElementMatchingWithPredicateIfSuchElementExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  { throwErrorIfElementNotFoundOrMoreThan1 }: { throwErrorIfElementNotFoundOrMoreThan1?: true; } = {}
): ArrayElement | null {

  const allElementsMatchingWithPredicate: Array<ArrayElement> = targetArray.filter(predicate);

  if (allElementsMatchingWithPredicate.length === 0) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          GetArrayElementMatchingWithPredicateIfSuchElementExactlyOneOperation.localization.elementNotFoundErrorMessage
        ),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(targetArray, predicate, options)"
      });
    }

    return null;
  }


  if (allElementsMatchingWithPredicate.length > 1) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          GetArrayElementMatchingWithPredicateIfSuchElementExactlyOneOperation.localization.elementNotFoundErrorMessage
        ),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(targetArray, predicate, options)"
      });
    }

    return null;
  }


  return allElementsMatchingWithPredicate[0];
}

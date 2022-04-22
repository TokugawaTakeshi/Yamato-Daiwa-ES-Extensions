import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Logging/Errors/UnexpectedEvent/UnexpectedEventError";


export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): ArrayElement | null;

export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { throwErrorIfElementNotFoundOrMoreThan1: true; }
): ArrayElement;


export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  { throwErrorIfElementNotFoundOrMoreThan1 }: { throwErrorIfElementNotFoundOrMoreThan1?: true; } = {}
): ArrayElement | null {

  const allElementsMatchingWithPredicate: Array<ArrayElement> = targetArray.filter(predicate);

  if (allElementsMatchingWithPredicate.length === 0) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError("Array element satisfies to specified predicate not found."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(targetArray, predicate, options)"
      });
    }


    return null;
  }


  if (allElementsMatchingWithPredicate.length > 1) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          "There are multiple element satisfies the predicate. As is follows from the function name, two or " +
          "more matches case is being considered as unexpected event."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(targetArray, predicate, options)"
      });
    }

    return null;
  }


  return allElementsMatchingWithPredicate[0];
}

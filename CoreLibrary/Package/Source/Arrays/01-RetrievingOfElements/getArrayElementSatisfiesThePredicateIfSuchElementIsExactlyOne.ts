import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): ArrayElement | null;

export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: Readonly<{ mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }>
): ArrayElement;

export default function getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: Readonly<{ mustThrowErrorIfElementNotFoundOrMatchesAreMultiple?: true; }> = {}
): ArrayElement | null {

  const allElementsMatchingWithPredicate: Array<ArrayElement> = targetArray.filter(predicate);

  if (allElementsMatchingWithPredicate.length === 0) {

    if (options.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError("Array element satisfies the specified predicate not found."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(targetArray, predicate, options)"
      });
    }


    return null;

  }


  if (allElementsMatchingWithPredicate.length > 1) {

    if (options.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "There are multiple elements satisfies the predicate. " +
          "As it follows from the function name, two or more matches case is being considered as the unexpected event."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(targetArray, predicate, options)"
      });
    }


    return null;

  }


  return allElementsMatchingWithPredicate[0];

}

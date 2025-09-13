import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): number | null;

export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: Readonly<{ mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }>
): number;


export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: Readonly<{ mustThrowErrorIfElementNotFoundOrMatchesAreMultiple?: true; }> = {}
): number | null {

  const indexesOfAllElementsSatisfiesThePredicate: Array<number> = [];

  for (const [ index, element ] of targetArray.entries()) {
    if (predicate(element)) {
      indexesOfAllElementsSatisfiesThePredicate.push(index);
    }
  }

  if (indexesOfAllElementsSatisfiesThePredicate.length === 0) {

    if (options.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError("Array element satisfies to specified predicate not found."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne" +
            "(targetArray, predicate, options)"
      });
    }


    return null;

  }


  if (indexesOfAllElementsSatisfiesThePredicate.length > 1) {

    if (options.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "There are multiple elements satisfies the predicate. As it follows from the function name, two or more " +
          "matches case is being considered as unexpected event."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne" +
            "(targetArray, predicate, options)"
      });
    }


    return null;

  }


  return indexesOfAllElementsSatisfiesThePredicate[0];

}

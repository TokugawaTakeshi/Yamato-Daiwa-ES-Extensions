import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Logging/Errors/UnexpectedEvent/UnexpectedEventError";


export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): number | null;

export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { throwErrorIfElementNotFoundOrMoreThan1: true; }
): number;


export default function getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  { throwErrorIfElementNotFoundOrMoreThan1 }: { throwErrorIfElementNotFoundOrMoreThan1?: true; } = {}
): number | null {

  const indexesOfAllElementsSatisfiesThePredicate: Array<number> = [];

  for (const [ index, element ] of targetArray.entries()) {
    if (predicate(element)) {
      indexesOfAllElementsSatisfiesThePredicate.push(index);
    }
  }

  if (indexesOfAllElementsSatisfiesThePredicate.length === 0) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError("Array element satisfies to specified predicate not found."),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne" +
            "(targetArray, predicate, options)"
      });
    }


    return null;
  }


  if (indexesOfAllElementsSatisfiesThePredicate.length > 1) {

    if (throwErrorIfElementNotFoundOrMoreThan1 === true) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
            "There are multiple element satisfies the predicate. As is follows from the function name, two or " +
            "more matches case is being considered as unexpected event."
        ),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne" +
            "(targetArray, predicate, options)"
      });
    }

    return null;
  }


  return indexesOfAllElementsSatisfiesThePredicate[0];
}

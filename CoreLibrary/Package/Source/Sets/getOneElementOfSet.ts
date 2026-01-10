import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getOneElementOfSet<Element>(targetSet: ReadonlySet<Element>): Element | undefined;

export default function getOneElementOfSet<Element>(
  targetSet: ReadonlySet<Element>,
  options: Readonly<{ mustThrowErrorIfSetIsEmpty: true; }>
): Element;


export default function getOneElementOfSet<Element>(
  targetSet: ReadonlySet<Element>,
  options?: Readonly<{ mustThrowErrorIfSetIsEmpty: true; }>
): Element | undefined {

  const element: Element | undefined = targetSet[Symbol.iterator]().next().value;

  if (isUndefined(element)) {

    if (options?.mustThrowErrorIfSetIsEmpty === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, target set is empty thus there is no the element can be got."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getOneElementOfSet(targetSet, options)"
      });
    }

  }


  return element;

}

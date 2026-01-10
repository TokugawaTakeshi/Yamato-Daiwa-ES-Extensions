import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";


export namespace RemoveOfOneElementFromSet {

  /* ━━━ Parameter ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type CompoundParameter<Element> =
      CompoundParameter.MutableAdding<Element> |
      CompoundParameter.ImmutableAdding<Element>;

  export namespace CompoundParameter {

    export type MutableAdding<Element> =
        MutableAdding.PossiblyEmptySet<Element> |
        MutableAdding.ExpectedToBeNonEmptySet<Element>;

    export namespace MutableAdding {

      export type PossiblyEmptySet<Element> = Readonly<{
        targetSet: Set<Element>;
        mutably: true;
        mustThrowErrorIfSetIsEmpty: false;
      }>;

      export type ExpectedToBeNonEmptySet<Element> = Readonly<{
        targetSet: Set<Element>;
        mutably: true;
        mustThrowErrorIfSetIsEmpty: true;
      }>;

    }


    export type ImmutableAdding<Element> =
        ImmutableAdding.PossiblyEmptySet<Element> |
        ImmutableAdding.ExpectedToBeNonEmptySet<Element>;

    export namespace ImmutableAdding {

      export type PossiblyEmptySet<Element> = Readonly<{
        targetSet: ReadonlySet<Element>;
        mutably: false;
        mustThrowErrorIfSetIsEmpty: false;
      }>;

      export type ExpectedToBeNonEmptySet<Element> = Readonly<{
        targetSet: ReadonlySet<Element>;
        mutably: false;
        mustThrowErrorIfSetIsEmpty: true;
      }>;

    }

  }


  /* ━━━ Result ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Result<Element> =
      Result.ForExpectedToBeNonEmptySets<Element> |
      Result.ForPossiblyEmptySets<Element>;

  export namespace Result {

    export type ForPossiblyEmptySets<Element> = Readonly<{
      removedElement?: Element;
      updatedSet: Set<Element>;
    }>;

    export type ForExpectedToBeNonEmptySets<Element> = Readonly<{
      removedElement: Element;
      updatedSet: Set<Element>;
    }>;

  }

}


export default function removeOneElementFromSet<Element>(
  compoundParameter:
      RemoveOfOneElementFromSet.CompoundParameter.MutableAdding.PossiblyEmptySet<Element> |
      RemoveOfOneElementFromSet.CompoundParameter.ImmutableAdding.PossiblyEmptySet<Element>
): RemoveOfOneElementFromSet.Result.ForPossiblyEmptySets<Element>;

export default function removeOneElementFromSet<Element>(
  compoundParameter:
      RemoveOfOneElementFromSet.CompoundParameter.MutableAdding.ExpectedToBeNonEmptySet<Element> |
      RemoveOfOneElementFromSet.CompoundParameter.ImmutableAdding.ExpectedToBeNonEmptySet<Element>
): RemoveOfOneElementFromSet.Result.ForExpectedToBeNonEmptySets<Element>;


export default function removeOneElementFromSet<Element>(
  {
    targetSet,
    mustThrowErrorIfSetIsEmpty,
    mutably
  }: RemoveOfOneElementFromSet.CompoundParameter<Element>
): RemoveOfOneElementFromSet.Result<Element> {

  const element: Element | undefined = targetSet[Symbol.iterator]().next().value;

  if (isUndefined(element)) {

    if (mustThrowErrorIfSetIsEmpty) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, target set is empty thus there is no the element can be deleted."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "removeOneElementOfSet(compoundParameter)"
      });
    }

    return { updatedSet: mutably ? targetSet : new Set([ ...targetSet ]) };

  }


  if (mutably) {

    targetSet.delete(element);

    return {
      removedElement: element,
      updatedSet: targetSet
    };

  }


  const swallowCopy: Set<Element> = new Set([ ...targetSet ]);
  swallowCopy.delete(element);

  return {
    removedElement: element,
    updatedSet: swallowCopy
  };

}

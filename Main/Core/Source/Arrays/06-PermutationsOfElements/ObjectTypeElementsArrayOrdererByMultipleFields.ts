import type { ArbitraryObject } from "../../Types/ArbitraryObject";


export abstract class ObjectTypeElementsArrayOrdererByMultipleFields {

  public static order<ObjectTypeElement extends ArbitraryObject>(
    {
      targetArray,
      mutably,
      elementsComparers,
      finalElementsStableComparer
    }: Readonly<

      (
        {
          targetArray: ReadonlyArray<ObjectTypeElement>;
          mutably: false;
        } |
        {
          targetArray: Array<ObjectTypeElement>;
          mutably: true;
        }
      ) &

      {
        elementsComparers: ReadonlyArray<ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer<ObjectTypeElement>>;
        finalElementsStableComparer: ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer<ObjectTypeElement>;
      }
    >
  ): Array<ObjectTypeElement> {

    const arrayWorkpiece: Array<ObjectTypeElement> = mutably ? targetArray : [ ...targetArray ];

    if (arrayWorkpiece.length < 2 || elementsComparers.length === 0) {
      return arrayWorkpiece;
    }


    let similarElementsGroups: Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<ObjectTypeElement>> =
        ObjectTypeElementsArrayOrdererByMultipleFields.assignMultipleElementsToGroups(arrayWorkpiece, elementsComparers[0]);

    for (const compareElements of elementsComparers.slice(1)) {
      similarElementsGroups =
          ObjectTypeElementsArrayOrdererByMultipleFields.updateGroups(similarElementsGroups, compareElements);
    }

    similarElementsGroups =
        ObjectTypeElementsArrayOrdererByMultipleFields.updateGroups(similarElementsGroups, finalElementsStableComparer);

    return similarElementsGroups.flatMap(
      (group: ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<ObjectTypeElement>): Array<ObjectTypeElement> =>
          group.elements
    );

  }

  private static updateGroups<TargetEntity>(
    groups: Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<TargetEntity>>,
    compareElements:
        ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer<TargetEntity> |
        ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer<TargetEntity>
  ): Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<TargetEntity>> {

    const updatedGroups: Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<TargetEntity>> = [];

    for (const group of groups) {

      if (group.elements.length === 1) {
        updatedGroups.push({ elements: [ ...group.elements ] });
        continue;
      }


      updatedGroups.push(
        ...ObjectTypeElementsArrayOrdererByMultipleFields.assignMultipleElementsToGroups(group.elements, compareElements)
      );

    }

    return updatedGroups;

  }

  private static assignMultipleElementsToGroups<TargetEntity>(
    elementsOfParentGroup: ReadonlyArray<TargetEntity>,
    compareElements:
        ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer<TargetEntity> |
        ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer<TargetEntity>
  ): Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<TargetEntity>> {

    const groups: Array<ObjectTypeElementsArrayOrdererByMultipleFields.SimilarElementsGroup<TargetEntity>> =
        [ { elements: [ elementsOfParentGroup[0] ] } ];

    for (let index: number = 1; index < elementsOfParentGroup.length; index++) {

      const targetElement: TargetEntity = elementsOfParentGroup[index];
      let hasCurrentElementBeenAssignedToGroup: boolean = false;

      let wasFirstElementGreaterThanSecondOne: boolean = false;

      for (const [ groupIndex, group ] of groups.entries()) {

        const comparisonResult:
            ObjectTypeElementsArrayOrdererByMultipleFields.ElementsComparer.Result |
            ObjectTypeElementsArrayOrdererByMultipleFields.ElementsStableComparer.Result =
                compareElements(targetElement, group.elements[0]);

        if (Reflect.get(comparisonResult, "firstElementIsStrictlyGreater") === true) {

          wasFirstElementGreaterThanSecondOne = true;

        } else if ("elementsAreEquals" in comparisonResult) {

          group.elements.push(targetElement);
          hasCurrentElementBeenAssignedToGroup = true;
          break;

        } else {

          if (wasFirstElementGreaterThanSecondOne) {
            groups.splice(groupIndex, 0, { elements: [ targetElement ] });
            hasCurrentElementBeenAssignedToGroup = true;
            break;
          }

        }

      }

      if (!hasCurrentElementBeenAssignedToGroup) {
        if (wasFirstElementGreaterThanSecondOne) {
          groups.push({ elements: [ targetElement ] });
        } else {
          groups.unshift({ elements: [ targetElement ] });
        }
      }

    }

    return groups;

  }

}

export namespace ObjectTypeElementsArrayOrdererByMultipleFields {

  export type ElementsComparer<ArrayElement> =
      (oneElement: ArrayElement, otherElement: ArrayElement) => ElementsComparer.Result;

  export namespace ElementsComparer {
    export type Result = Readonly<
      { firstElementIsStrictlyGreater: true; } |
      { elementsAreEquals: true; } |
      { firstElementIsStrictlySmaller: true; }
    >;
  }

  export type SimilarElementsGroup<ArrayElement> = { elements: Array<ArrayElement>; };


  export type ElementsStableComparer<ArrayElement> =
      (oneElement: ArrayElement, otherElement: ArrayElement) => ElementsStableComparer.Result;

  export namespace ElementsStableComparer {
    export type Result = Readonly<{ firstElementIsStrictlyGreater: boolean; }>;
  }

}


export default ObjectTypeElementsArrayOrdererByMultipleFields.order;

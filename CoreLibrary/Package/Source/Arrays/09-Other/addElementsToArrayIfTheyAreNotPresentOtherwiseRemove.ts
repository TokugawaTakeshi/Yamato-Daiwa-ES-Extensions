import getIndexesOfSatisfiesThePredicateArrayElements from
    "../02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements";
import removeArrayElementsByIndexes from "../07-RemovingOfElements/removeArrayElementsByIndexes";
import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function addElementsToArrayIfTheyAreNotPresentOtherwiseRemove<
  ArrayElement extends number | bigint | string | boolean
>(
  compoundParameter:
      Readonly<
        (
          { targetElement: ArrayElement; } |
          { targetElements: ReadonlyArray<ArrayElement>; }
        ) &
        (
          {
            addingToStart: true;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToEnd: true;
            addingToStart?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom0: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom1: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
          }
        ) &
        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        )
      >
): Array<ArrayElement>;

export default function addElementsToArrayIfTheyAreNotPresentOtherwiseRemove<
  ArrayElement extends Exclude<unknown, number | bigint | string | boolean>
>(
  compoundParameter:
      Readonly<
        (
          {
            targetElement: ArrayElement;
            targetElementFinder: (arrayElement: ArrayElement) => boolean;
          } |
          {
            targetElements: ReadonlyArray<ArrayElement>;
            targetElementsFinder: (arrayElement: ArrayElement) => boolean;
          }
        ) &
        (
          {
            addingToStart: true;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToEnd: true;
            addingToStart?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom0: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom1: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
          }
        ) &
        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        )
      >
): Array<ArrayElement>;


export default function addElementsToArrayIfTheyAreNotPresentOtherwiseRemove<ArrayElement>(
  compoundParameter:
      Readonly<
        (
          {
            targetElement: ArrayElement;
            targetElementFinder?: (arrayElement: ArrayElement) => boolean;
          } |
          {
            targetElements: ReadonlyArray<ArrayElement>;
            targetElementsFinder?: (arrayElement: ArrayElement) => boolean;
          }
        ) &
        (
          {
            addingToStart: true;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToEnd: true;
            addingToStart?: undefined;
            addingToPosition__numerationFrom0?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom0: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom1?: undefined;
          } |
          {
            addingToPosition__numerationFrom1: number;
            addingToStart?: undefined;
            addingToEnd?: undefined;
            addingToPosition__numerationFrom0?: undefined;
          }
        ) &
        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        )
      >
): Array<ArrayElement> {

  const indexesOfTargetElements: ReadonlyArray<number> = getIndexesOfSatisfiesThePredicateArrayElements(
    compoundParameter.targetArray,
    "targetElement" in compoundParameter ?
        compoundParameter.targetElementFinder ??
            ((element: ArrayElement): boolean => element === compoundParameter.targetElement) :
        compoundParameter.targetElementsFinder ??
          ((element: ArrayElement): boolean => compoundParameter.targetElements.includes(element))
  );

  const workpiece: Array<ArrayElement> = compoundParameter.mutably ?
      compoundParameter.targetArray : [ ...compoundParameter.targetArray ];

  if (indexesOfTargetElements.length > 0) {
    return removeArrayElementsByIndexes({
      targetArray: workpiece,
      indexes: indexesOfTargetElements,
      mutably: compoundParameter.mutably
    }).updatedArray;
  }


  const newElements: ReadonlyArray<ArrayElement> =
      "targetElements" in compoundParameter ? compoundParameter.targetElements : [ compoundParameter.targetElement ];

  if ("addingToStart" in compoundParameter) {
    workpiece.unshift(...newElements);
    return workpiece;
  }


  if ("addingToEnd" in compoundParameter) {
    workpiece.push(...newElements);
    return workpiece;
  }


  let positionOfNewElement__numerationFrom0: number;

  if (isNaturalNumberOrZero(compoundParameter.addingToPosition__numerationFrom0)) {
    positionOfNewElement__numerationFrom0 = compoundParameter.addingToPosition__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.addingToPosition__numerationFrom1)) {
    positionOfNewElement__numerationFrom0 = compoundParameter.addingToPosition__numerationFrom1 - 1;
  } else {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "The target position for new element has been incorrectly specified. " +
            "The valid alternatives are:\n" +
            "● \"addingToStart\": must be the boolean herewith \"true\" only\n" +
            "● \"addingToEnd\": must be the boolean herewith \"true\" only\n" +
            "● \"addingToPosition__numerationFrom0\": must be the natural number or zero\n" +
            "● \"addingToPosition__numerationFrom1\": must be the natural number"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "addElementsToArrayIfTheyAreNotPresentOtherwiseRemove(compoundParameter)"
    });
  }

  workpiece.splice(positionOfNewElement__numerationFrom0, 0, ...newElements);

  return workpiece;

}

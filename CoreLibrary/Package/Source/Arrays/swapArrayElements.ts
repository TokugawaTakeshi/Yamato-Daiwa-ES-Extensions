import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function swapArrayElements<ArrayElement>(
  compoundParameter:
      Readonly<
        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        ) &
        {
          oneElement: Readonly<(
            {
              position__numerationFrom0: number;
              position__numerationFrom1?: undefined;
              isLastOne?: undefined;
              finder?: undefined;
              mustThrowErrorIfNotFound: boolean;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1: number;
              isLastOne?: undefined;
              finder?: undefined;
              mustThrowErrorIfNotFound: boolean;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1?: undefined;
              isLastOne: true;
              finder?: undefined;
              mustThrowErrorIfNotFound?: undefined;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1?: undefined;
              isLastOne?: undefined;
              finder: (arrayElement: ArrayElement) => boolean;
              mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
            }
          )>;
          otherElement: Readonly<(
            {
              position__numerationFrom0: number;
              position__numerationFrom1?: undefined;
              isLastOne?: undefined;
              finder?: undefined;
              mustThrowErrorIfNotFound: boolean;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1: number;
              isLastOne?: undefined;
              finder?: undefined;
              mustThrowErrorIfNotFound: boolean;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1?: undefined;
              isLastOne: true;
              finder?: undefined;
              mustThrowErrorIfNotFound?: undefined;
            } |
            {
              position__numerationFrom0?: undefined;
              position__numerationFrom1?: undefined;
              isLastOne?: undefined;
              finder: (arrayElement: ArrayElement) => boolean;
              mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
            }
          )>;
        } & {
          mustThrowErrorIfTargetArrayIsEmpty: boolean;
          mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: boolean;
        }
      >
): Array<ArrayElement> {

  if (
    compoundParameter.targetArray.length === 0 &&
    compoundParameter.mustThrowErrorIfTargetArrayIsEmpty
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "compoundParameter",
        parameterNumber: 1,
        messageSpecificPart:
            "Target array is empty; nothing to swap. " +
            "This error has been thrown because the `mustThrowErrorIfTargetArrayIsEmpty` has been set to true."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "swapArrayElements(compoundParameter)"
    });
  }

  const workpiece: Array<ArrayElement> = compoundParameter.mutably ?
      compoundParameter.targetArray : [ ...compoundParameter.targetArray ];

  let oneElementPosition__numerationFrom0: number;

  if (isNonNegativeInteger(compoundParameter.oneElement.position__numerationFrom0)) {
    oneElementPosition__numerationFrom0 = compoundParameter.oneElement.position__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.oneElement.position__numerationFrom1)) {
    oneElementPosition__numerationFrom0 = compoundParameter.oneElement.position__numerationFrom1 - 1;
  } else if (compoundParameter.oneElement.isLastOne === true) {

    if (workpiece.length === 0) {
      return workpiece;
    }


    oneElementPosition__numerationFrom0 = workpiece.length - 1;

  } else if (isNotUndefined(compoundParameter.oneElement.finder)) {

    oneElementPosition__numerationFrom0 = workpiece.
        findIndex(compoundParameter.oneElement.finder);

    if (oneElementPosition__numerationFrom0 === -1) {

      if (compoundParameter.oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple) {

      }


      return workpiece;

    }

  }


  let otherElementPosition__numerationFrom0: number;

  if (isNonNegativeInteger(compoundParameter.otherElement.position__numerationFrom0)) {
    otherElementPosition__numerationFrom0 = compoundParameter.otherElement.position__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.otherElement.position__numerationFrom1)) {
    otherElementPosition__numerationFrom0 = compoundParameter.otherElement.position__numerationFrom1 - 1;
  } else if (compoundParameter.otherElement.isLastOne === true) {

    if (workpiece.length === 0) {
      return workpiece;
    }


    otherElementPosition__numerationFrom0 = workpiece.length - 1;

  } else if (isNotUndefined(compoundParameter.otherElement.finder)) {

    otherElementPosition__numerationFrom0 = workpiece.
        findIndex(compoundParameter.otherElement.finder);

    if (otherElementPosition__numerationFrom0 === -1) {

    }


    return workpiece;

  }


  if (oneElementPosition__numerationFrom0 === otherElementPosition__numerationFrom0) {

    if (compoundParameter.mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition) {

    }


    return workpiece;

  }


  const oneElement: ArrayElement = workpiece[oneElementPosition__numerationFrom0];
  const otherElement: ArrayElement = workpiece[otherElementPosition__numerationFrom0];

  workpiece[oneElementPosition__numerationFrom0] = otherElement;
  workpiece[otherElementPosition__numerationFrom0] = oneElement;

  return workpiece;

}

import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNotUndefined from "../../TypeGuards/EmptyTypes/isNotUndefined";
import isNull from "../../TypeGuards/EmptyTypes/isNull";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";
import getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne from
    "../02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";


export default function swapArrayElements<ArrayElement>(
  sourceDataAndOptions:
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

  if (sourceDataAndOptions.targetArray.length === 0) {

    if (sourceDataAndOptions.mustThrowErrorIfTargetArrayIsEmpty) {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceDataAndOptions",
          parameterNumber: 1,
          messageSpecificPart:
              "Target array is empty, nothing to swap. " +
              "This error has been thrown because the `mustThrowErrorIfTargetArrayIsEmpty` option has been set to true."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
      });

    }


    return sourceDataAndOptions.mutably ? sourceDataAndOptions.targetArray : [];

  }


  const workpiece: Array<ArrayElement> = sourceDataAndOptions.mutably ?
      sourceDataAndOptions.targetArray : [ ...sourceDataAndOptions.targetArray ];

  let oneElementPosition__numerationFrom0: number;

  if (isNaturalNumberOrZero(sourceDataAndOptions.oneElement.position__numerationFrom0)) {
    oneElementPosition__numerationFrom0 = sourceDataAndOptions.oneElement.position__numerationFrom0;
  } else if (isNaturalNumber(sourceDataAndOptions.oneElement.position__numerationFrom1)) {
    oneElementPosition__numerationFrom0 = sourceDataAndOptions.oneElement.position__numerationFrom1 - 1;
  } else if (sourceDataAndOptions.oneElement.isLastOne === true) {
    oneElementPosition__numerationFrom0 = workpiece.length - 1;
  } else if (isNotUndefined(sourceDataAndOptions.oneElement.finder)) {

    const oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne: number | null =
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          workpiece, sourceDataAndOptions.oneElement.finder
        );

    if (isNull(oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne)) {

      /* [ Approach ] ※
       * Non-standard method of accessing to property but
       *   `sourceDataAndOptions.oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` is the invalid
       *    TypeScript and
       *    ```
       *    "mustThrowErrorIfElementNotFoundOrMatchesAreMultiple" in sourceDataAndOptions.oneElement &&
       *       sourceDataAndOptions.oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple
       *     ```
       *     requires two more checks one of which is redundant from the viewpoint of JavaScrit. */
      if (Reflect.get(sourceDataAndOptions.oneElement, "mustThrowErrorIfElementNotFoundOrMatchesAreMultiple") === true) {

        Logger.throwErrorWithFormattedMessage({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceDataAndOptions",
            parameterNumber: 1,
            messageSpecificPart:
                "The elements count satisfying to `oneElement.finder` predicate are not exactly one. " +
                "This error has been thrown because the `oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` " +
                  "option has been set to true."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
        });

      }


      return workpiece;

    }


    oneElementPosition__numerationFrom0 = oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne;

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterName: "sourceDataAndOptions",
        parameterNumber: 1,
        messageSpecificPart:
            "No valid option has specified about how to get the first element of array. " +
            "The valid alternatives are:\n" +
            "● \"position__numerationFrom0\": must be the natural number or zero" +
            "● \"position__numerationFrom1\": must be the natural number" +
            "● \"isLastOne\": must be the boolean herewith \"true\" only" +
            "● \"finder\": must be the predicate herewith for this option you must additionally specify " +
              "`mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` with boolean value\n"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
    });

  }


  let otherElementPosition__numerationFrom0: number;

  if (isNaturalNumberOrZero(sourceDataAndOptions.otherElement.position__numerationFrom0)) {
    otherElementPosition__numerationFrom0 = sourceDataAndOptions.otherElement.position__numerationFrom0;
  } else if (isNaturalNumber(sourceDataAndOptions.otherElement.position__numerationFrom1)) {
    otherElementPosition__numerationFrom0 = sourceDataAndOptions.otherElement.position__numerationFrom1 - 1;
  } else if (sourceDataAndOptions.otherElement.isLastOne === true) {
    otherElementPosition__numerationFrom0 = workpiece.length - 1;
  } else if (isNotUndefined(sourceDataAndOptions.otherElement.finder)) {

    const otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne: number | null =
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          workpiece, sourceDataAndOptions.otherElement.finder
        );

    if (isNull(otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne)) {

      /* [ Approach ] See ※. */
      if (Reflect.get(sourceDataAndOptions.otherElement, "mustThrowErrorIfElementNotFoundOrMatchesAreMultiple") === true) {

        Logger.throwErrorWithFormattedMessage({
          errorInstance: new InvalidParameterValueError({
            parameterName: "sourceDataAndOptions",
            parameterNumber: 1,
            messageSpecificPart:
                "The elements count satisfying to `otherElement.finder` predicate are not exactly one. " +
                "This error has been thrown because the `otherElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` " +
                  "option has been set to true."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
        });

      }


      return workpiece;

    }

    otherElementPosition__numerationFrom0 = otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne;

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterName: "sourceDataAndOptions",
        parameterNumber: 1,
        messageSpecificPart:
            "No valid option has specified about how to get the second element of array. " +
            "The valid alternatives are:\n" +
            "● \"position__numerationFrom0\": must be the natural number or zero" +
            "● \"position__numerationFrom1\": must be the natural number" +
            "● \"isLastOne\": must be the boolean herewith \"true\" only" +
            "● \"finder\": must be the predicate herewith for this option you must additionally specify " +
              "`mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` with boolean value\n"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
    });

  }


  if (oneElementPosition__numerationFrom0 === otherElementPosition__numerationFrom0) {

    if (sourceDataAndOptions.mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition) {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterName: "sourceDataAndOptions",
          parameterNumber: 1,
          messageSpecificPart:
              "The specified positions of both elements are referring to same position. " +
              "This error has been thrown because the `oneElement.mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition` " +
                "option has been set to true."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "swapArrayElements(sourceDataAndOptions)"
      });

    }


    return workpiece;

  }


  const oneElement: ArrayElement = workpiece[oneElementPosition__numerationFrom0];
  const otherElement: ArrayElement = workpiece[otherElementPosition__numerationFrom0];

  workpiece[oneElementPosition__numerationFrom0] = otherElement;
  workpiece[otherElementPosition__numerationFrom0] = oneElement;

  return workpiece;

}

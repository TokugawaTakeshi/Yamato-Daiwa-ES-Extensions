import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNotUndefined from "../../TypeGuards/Nullables/isNotUndefined";
import isNull from "../../TypeGuards/Nullables/isNull";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";
import getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne from
    "../02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";


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

  if (compoundParameter.targetArray.length === 0) {

    if (compoundParameter.mustThrowErrorIfTargetArrayIsEmpty) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter",
          parameterNumber: 1,
          messageSpecificPart:
              "Target array is empty, nothing to swap. " +
              "This error has been thrown because the `mustThrowErrorIfTargetArrayIsEmpty` option has been set to true."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "swapArrayElements(compoundParameter)"
      });

    }


    return compoundParameter.mutably ? compoundParameter.targetArray : [];

  }


  const workpiece: Array<ArrayElement> = compoundParameter.mutably ?
      compoundParameter.targetArray : [ ...compoundParameter.targetArray ];

  let oneElementPosition__numerationFrom0: number;

  if (isNaturalNumberOrZero(compoundParameter.oneElement.position__numerationFrom0)) {
    oneElementPosition__numerationFrom0 = compoundParameter.oneElement.position__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.oneElement.position__numerationFrom1)) {
    oneElementPosition__numerationFrom0 = compoundParameter.oneElement.position__numerationFrom1 - 1;
  } else if (compoundParameter.oneElement.isLastOne === true) {
    oneElementPosition__numerationFrom0 = workpiece.length - 1;
  } else if (isNotUndefined(compoundParameter.oneElement.finder)) {

    const oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne: number | null =
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          workpiece, compoundParameter.oneElement.finder
        );

    if (isNull(oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne)) {

      /* [ Theory ]
       * The `in` check is required only to make TypeScript not complain because it does not see that if
       *   `compoundParameter.oneElement.finder` is defined, the `mustThrowErrorIfElementNotFoundOrMatchesAreMultiple`
       *   defined too (while TypeScript does not threat any errors). */
      if (
        "mustThrowErrorIfElementNotFoundOrMatchesAreMultiple" in compoundParameter.oneElement &&
        compoundParameter.oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple
      ) {

        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "compoundParameter",
            parameterNumber: 1,
            messageSpecificPart:
                "The elements count satisfying to `oneElement.finder` predicate are not exactly one. " +
                "This error has been thrown because the `oneElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` " +
                  "option has been set to true."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "swapArrayElements(compoundParameter)"
        });

      }


      return workpiece;

    }


    oneElementPosition__numerationFrom0 = oneElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne;

  } else {

    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "compoundParameter",
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
      occurrenceLocation: "swapArrayElements(compoundParameter)"
    });

  }


  let otherElementPosition__numerationFrom0: number;

  if (isNaturalNumberOrZero(compoundParameter.otherElement.position__numerationFrom0)) {
    otherElementPosition__numerationFrom0 = compoundParameter.otherElement.position__numerationFrom0;
  } else if (isNaturalNumber(compoundParameter.otherElement.position__numerationFrom1)) {
    otherElementPosition__numerationFrom0 = compoundParameter.otherElement.position__numerationFrom1 - 1;
  } else if (compoundParameter.otherElement.isLastOne === true) {
    otherElementPosition__numerationFrom0 = workpiece.length - 1;
  } else if (isNotUndefined(compoundParameter.otherElement.finder)) {

    const otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne: number | null =
        getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
          workpiece, compoundParameter.otherElement.finder
        );

    if (isNull(otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne)) {

      /* [ Theory ]
       * The `in` check is required only to make TypeScript not complain because it does not see that if
       *   `compoundParameter.otherElement.finder` is defined, the `mustThrowErrorIfElementNotFoundOrMatchesAreMultiple`
       *   defined too (while TypeScript does not threat any errors). */
      if (
        "mustThrowErrorIfElementNotFoundOrMatchesAreMultiple" in compoundParameter.otherElement &&
        compoundParameter.otherElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple
      ) {

        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "compoundParameter",
            parameterNumber: 1,
            messageSpecificPart:
                "The elements count satisfying to `otherElement.finder` predicate are not exactly one. " +
                "This error has been thrown because the `otherElement.mustThrowErrorIfElementNotFoundOrMatchesAreMultiple` " +
                  "option has been set to true."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "swapArrayElements(compoundParameter)"
        });

      }


      return workpiece;

    }

    otherElementPosition__numerationFrom0 = otherElementPosition__numerationFrom0__nullIfMatchesAreNotExactlyOne;

  } else {

    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterName: "compoundParameter",
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
      occurrenceLocation: "swapArrayElements(compoundParameter)"
    });

  }


  if (oneElementPosition__numerationFrom0 === otherElementPosition__numerationFrom0) {

    if (compoundParameter.mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter",
          parameterNumber: 1,
          messageSpecificPart:
              "The specified positions of both elements are referring to same position. " +
              "This error has been thrown because the `oneElement.mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition` " +
                "option has been set to true."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "swapArrayElements(compoundParameter)"
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

import isNaturalNumberOrZero from "../../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNotUndefined from "../../TypeGuards/EmptyTypes/isNotUndefined";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function replaceArrayElementsByIndexesImmutably<ArrayElement>(
  sourceDataAndOptions:
      Readonly<
        { targetArray: ReadonlyArray<ArrayElement>; } &
        (
          {
            index: number;
            newElement: ArrayElement;
            replacements?: never;
          } |
          {
            index?: never;
            newElement?: never;
            replacements: ReadonlyArray<{
              index: number;
              newElement: ArrayElement;
            }>;
          }
        )
      >
): Array<ArrayElement> {

  const workpiece: Array<ArrayElement> = [ ...sourceDataAndOptions.targetArray ];
  let replacements: ReadonlyArray<{ index: number; newElement: ArrayElement; }>;

  if (Array.isArray(sourceDataAndOptions.replacements)) {

    replacements = sourceDataAndOptions.replacements;

  } else if (isNaturalNumberOrZero(sourceDataAndOptions.index) && isNotUndefined(sourceDataAndOptions.newElement)) {

    replacements = [ { index: sourceDataAndOptions.index, newElement: sourceDataAndOptions.newElement } ];

  } else {

    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "sourceDataAndOptions",
        messageSpecificPart:
            "It has not been correctly specified how to replace the array elements. " +
            "The valid alternatives are:\n" +
            "● The combination of:\n " +
              "○ \"index\": must the either natural number or 0\n" +
              "○ \"newElement\": must corresponding to type of elements of the target array\n" +
            "● \"replacements\": The array of objects with above \"index\" and \"newElement\" properties and same " +
              "limitations"
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "addElementsToArray(compoundParameter)"
    });

  }

  for (const replacement of replacements) {
    workpiece[replacement.index] = replacement.newElement;
  }

  return workpiece;

}

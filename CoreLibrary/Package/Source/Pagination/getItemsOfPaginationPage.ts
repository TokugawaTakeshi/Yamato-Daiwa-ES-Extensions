import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import cropArray from "../Arrays/03-RetrievingOfSubarrays/cropArray";
import isNaturalNumberOrZero from "../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";


export default function getItemsOfPaginationPage<Item>(
  compoundParameter: Readonly<
      {
        items: ReadonlyArray<Item>;
        itemsCountPerPaginationPage: number;
      } & (
        {
          targetPageNumber__numerationFrom1: number;
          targetPageNumber__numerationFrom0?: undefined;
        } | {
          targetPageNumber__numerationFrom0: number;
          targetPageNumber__numerationFrom1?: undefined;
        }
      )
    >
): Array<Item> {

  let targetPageNumber__numerationFrom0: number;

  if (isNaturalNumberOrZero(compoundParameter.targetPageNumber__numerationFrom0)) {

    targetPageNumber__numerationFrom0 = compoundParameter.targetPageNumber__numerationFrom0;

  } else if (isNaturalNumber(compoundParameter.targetPageNumber__numerationFrom1)) {

    targetPageNumber__numerationFrom0 = compoundParameter.targetPageNumber__numerationFrom1 - 1;

  } else {

    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart:
            "Target page number must be specified ever via \"targetPageNumber__numerationFrom0\" with the positive " +
              "integer or via \"compoundParameter.targetPageNumber__numerationFrom1\" with the natural number."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "PaginationCollection.getItemsOfPage(compoundParameter)"
    });

  }


  return cropArray({
    targetArray: compoundParameter.items,
    startingElementNumber__numerationFrom0: targetPageNumber__numerationFrom0 * compoundParameter.itemsCountPerPaginationPage,
    elementsCount: compoundParameter.itemsCountPerPaginationPage,
    mutably: false,
    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
  });

}

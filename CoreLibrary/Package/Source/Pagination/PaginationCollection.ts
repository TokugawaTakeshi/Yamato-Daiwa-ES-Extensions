import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import cropArray from "../Arrays/03-RetrievingOfSubarrays/cropArray";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";


class PaginationCollection<Item> {

  public readonly pagesCount: number;

  private readonly itemsByPages: ReadonlyArray<Array<Item>> = [];

  public constructor(compoundParameter: PaginationCollection.CompoundParameter<Item>) {

    const { items, itemsCountPerPaginationPage }: PaginationCollection.CompoundParameter<Item> = compoundParameter;
    const itemsByPages: Array<Array<Item>> = [];

    this.pagesCount = Math.ceil(items.length / itemsCountPerPaginationPage);

    for (let pageIndex: number = 0; pageIndex < this.pagesCount; pageIndex++) {

      itemsByPages[pageIndex] = cropArray({
        targetArray: compoundParameter.items,
        fromStart: true,
        startingElementNumber__numerationFrom0: pageIndex * itemsCountPerPaginationPage,
        elementsCount: compoundParameter.itemsCountPerPaginationPage,
        mutably: false,
        mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false
      });

    }

    this.itemsByPages = itemsByPages;

  }


  public getItemsOfSpecificPage(
    compoundParameter: Readonly<{ targetPageNumber: number; numerationFrom: 0 | 1; }>
  ): Array<Item> {

    const targetPageIndex: number = compoundParameter.numerationFrom === 0 ?
        compoundParameter.targetPageNumber : compoundParameter.targetPageNumber - 1;
    const itemsOfTargetPage: Array<Item> | undefined = this.itemsByPages[targetPageIndex];

    if (isUndefined(itemsOfTargetPage)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
            `There is not page with number ${ compoundParameter.targetPageNumber } ` +
              `(numeration from ${ compoundParameter.numerationFrom }).`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "paginationCollection.getItemsOfSpecificPage(compoundParameter)"
      });
    }


    return itemsOfTargetPage;

  }

}


namespace PaginationCollection {

  export type CompoundParameter<Item> = Readonly<{
    items: Array<Item>;
    itemsCountPerPaginationPage: number;
  }>;

}


export default PaginationCollection;

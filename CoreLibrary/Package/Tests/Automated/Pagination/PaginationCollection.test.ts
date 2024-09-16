import { PaginationCollection } from "../../../Source";
import getSampleArrayForPagination from "./getSampleArrayForPagination";
import Assert from "assert";


describe("PaginationCollection", (): void => {

  const items: Array<string> = getSampleArrayForPagination();

  const itemsCountPerPaginationPage: number = 10;

  const paginationCollection: PaginationCollection<string> = new PaginationCollection<string>({
    items,
    itemsCountPerPaginationPage
  });

  it("Has 3 pages", (): void => {
    Assert.strictEqual(paginationCollection.pagesCount, 3);
  });

  describe("Items count in each page", (): void => {

    it("1st page has 20 items", (): void => {

      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 1, numerationFrom: 1 }).length,
        itemsCountPerPaginationPage
      );

      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 0, numerationFrom: 0 }).length,
        itemsCountPerPaginationPage
      );

    });

    it("2nd page has 20 items", (): void => {

      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 2, numerationFrom: 1 }).length,
        itemsCountPerPaginationPage
      );
      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 1, numerationFrom: 0 }).length,
        itemsCountPerPaginationPage
      );

    });

    it("3rd page has 6 items", (): void => {

      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 3, numerationFrom: 1 }).length,
        6
      );
      Assert.strictEqual(
        paginationCollection.getItemsOfSpecificPage({ targetPageNumber: 2, numerationFrom: 0 }).length,
        6
      );

    });

  });

  describe("Cheking of the first and last elements of each page", (): void => {

    it("The first and last items of the 1st page are matching with expected ones", (): void => {

      const itemsOf0thtPage__numerationFrom0: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 0, targetPageNumber: 0 });

      const itemsOf1stPage__numerationFrom1: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 1, targetPageNumber: 1 });

      Assert.strictEqual(itemsOf0thtPage__numerationFrom0[0], "Alfa");
      Assert.strictEqual(itemsOf0thtPage__numerationFrom0[itemsCountPerPaginationPage - 1], "Juliett");

      Assert.strictEqual(itemsOf1stPage__numerationFrom1[0], "Alfa");
      Assert.strictEqual(itemsOf1stPage__numerationFrom1[itemsCountPerPaginationPage - 1], "Juliett");

    });

    it("The first and last items of the 2nd page are matching with expected ones", (): void => {

      const itemsOf1stPage__numerationFrom0: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 0, targetPageNumber: 1 });

      const itemsOf2ndPage__numerationFrom1: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 1, targetPageNumber: 2 });

      Assert.strictEqual(itemsOf1stPage__numerationFrom0[0], "Kilo");
      Assert.strictEqual(itemsOf1stPage__numerationFrom0[itemsCountPerPaginationPage - 1], "Tango");

      Assert.strictEqual(itemsOf2ndPage__numerationFrom1[0], "Kilo");
      Assert.strictEqual(itemsOf2ndPage__numerationFrom1[itemsCountPerPaginationPage - 1], "Tango");

    });

    it("The first and last items of the 3rd page are matching with expected ones", (): void => {

      const itemsOf2ndPage__numerationFrom0: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 0, targetPageNumber: 2 });

      const itemsOf3rdPage__numerationFrom1: Array<string> = paginationCollection.
          getItemsOfSpecificPage({ numerationFrom: 1, targetPageNumber: 3 });

      Assert.strictEqual(itemsOf2ndPage__numerationFrom0[0], "Uniform");
      Assert.strictEqual(itemsOf2ndPage__numerationFrom0[5], "Zulu");

      Assert.strictEqual(itemsOf3rdPage__numerationFrom1[0], "Uniform");
      Assert.strictEqual(itemsOf3rdPage__numerationFrom1[5], "Zulu");

    });

  });

});

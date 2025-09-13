import { getItemsOfPaginationPage, Logger } from "../../../Source";
import getSampleArrayForPagination from "./getSampleArrayForPagination";
import Testing from "node:test";
import Assert from "assert";


const items: Array<string> = getSampleArrayForPagination();
const itemsCountPerPaginationPage: number = 10;


Promise.all([

  Testing.suite(
    "Items Count in Each Page",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "1st Page has 20 Items",
          (): void => {

            Assert.strictEqual(
              getItemsOfPaginationPage({
                items,
                itemsCountPerPaginationPage,
                targetPageNumber__numerationFrom0: 0
              }).length,
              itemsCountPerPaginationPage
            );

            Assert.strictEqual(
              getItemsOfPaginationPage({
                items,
                itemsCountPerPaginationPage,
                targetPageNumber__numerationFrom1: 1
              }).length,
              itemsCountPerPaginationPage
            );

          }
        ),

        Testing.test(
          "2nd Page has 20 Items",
          (): void => {

            Assert.strictEqual(
              getItemsOfPaginationPage({
                items,
                itemsCountPerPaginationPage,
                targetPageNumber__numerationFrom0: 1
              }).length,
              itemsCountPerPaginationPage
            );

            Assert.strictEqual(
              getItemsOfPaginationPage({
                items,
                itemsCountPerPaginationPage,
                targetPageNumber__numerationFrom1: 2
              }).length,
              itemsCountPerPaginationPage
            );

          }
        ),

        Testing.test(
          "3rd Page has 6 Items",
          (): void => {

          Assert.strictEqual(
            getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom0: 2
            }).length,
            6
          );

          Assert.strictEqual(
            getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom1: 3
            }).length,
            6
          );

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "Checking of First and Last Elements of each Page",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "The First and Last Items of the 1st Page are Matching with Expected Ones",
          (): void => {

            const itemsOf0thtPage__numerationFrom0: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom0: 0
            });

            const itemsOf1stPage__numerationFrom1: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom1: 1
            });

            Assert.strictEqual(itemsOf0thtPage__numerationFrom0[0], "Alfa");
            Assert.strictEqual(itemsOf0thtPage__numerationFrom0[itemsCountPerPaginationPage - 1], "Juliett");

            Assert.strictEqual(itemsOf1stPage__numerationFrom1[0], "Alfa");
            Assert.strictEqual(itemsOf1stPage__numerationFrom1[itemsCountPerPaginationPage - 1], "Juliett");

          }
        ),

        Testing.test(
          "The First and Last Items of the 2nd Page are Matching with Expected Ones",
          (): void => {

            const itemsOf1stPage__numerationFrom0: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom0: 1
            });

            const itemsOf2ndPage__numerationFrom1: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom1: 2
            });

            Assert.strictEqual(itemsOf1stPage__numerationFrom0[0], "Kilo");
            Assert.strictEqual(itemsOf1stPage__numerationFrom0[itemsCountPerPaginationPage - 1], "Tango");

            Assert.strictEqual(itemsOf2ndPage__numerationFrom1[0], "Kilo");
            Assert.strictEqual(itemsOf2ndPage__numerationFrom1[itemsCountPerPaginationPage - 1], "Tango");

          }
        ),

        Testing.test(
          "The First and Last Items of the 3rd Page are Matching with Expected Ones",
          (): void => {

            const itemsOf2ndPage__numerationFrom0: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom0: 2
            });

            const itemsOf3rdPage__numerationFrom1: Array<string> = getItemsOfPaginationPage({
              items,
              itemsCountPerPaginationPage,
              targetPageNumber__numerationFrom1: 3
            });

            Assert.strictEqual(itemsOf2ndPage__numerationFrom0[0], "Uniform");
            Assert.strictEqual(itemsOf2ndPage__numerationFrom0[5], "Zulu");

            Assert.strictEqual(itemsOf3rdPage__numerationFrom1[0], "Uniform");
            Assert.strictEqual(itemsOf3rdPage__numerationFrom1[5], "Zulu");

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

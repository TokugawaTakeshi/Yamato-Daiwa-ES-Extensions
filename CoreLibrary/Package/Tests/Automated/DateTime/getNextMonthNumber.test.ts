import { getNextMonthNumber, MonthsNames } from "../../../Source";
import { strictEqual } from "assert";


describe("getNextMonthNumber", (): void => {

  describe("By number from 0 of reference month number", (): void => {

    it("Returned month if from 0", (): void => {

      type ExperimentalSample = Readonly<{
        currentMonthNumber__numerationFrom0: number;
        nextMonthNumber__numerationFrom0: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { currentMonthNumber__numerationFrom0: 0, nextMonthNumber__numerationFrom0: 1 },
        { currentMonthNumber__numerationFrom0: 1, nextMonthNumber__numerationFrom0: 2 },
        { currentMonthNumber__numerationFrom0: 2, nextMonthNumber__numerationFrom0: 3 },
        { currentMonthNumber__numerationFrom0: 3, nextMonthNumber__numerationFrom0: 4 },
        { currentMonthNumber__numerationFrom0: 4, nextMonthNumber__numerationFrom0: 5 },
        { currentMonthNumber__numerationFrom0: 5, nextMonthNumber__numerationFrom0: 6 },
        { currentMonthNumber__numerationFrom0: 6, nextMonthNumber__numerationFrom0: 7 },
        { currentMonthNumber__numerationFrom0: 7, nextMonthNumber__numerationFrom0: 8 },
        { currentMonthNumber__numerationFrom0: 8, nextMonthNumber__numerationFrom0: 9 },
        { currentMonthNumber__numerationFrom0: 9, nextMonthNumber__numerationFrom0: 10 },
        { currentMonthNumber__numerationFrom0: 10, nextMonthNumber__numerationFrom0: 11 },
        { currentMonthNumber__numerationFrom0: 11, nextMonthNumber__numerationFrom0: 0 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthNumber__numerationFrom0: sample.currentMonthNumber__numerationFrom0,
          firstMonthNumberInRelationToReturnableValue: 0
        }), sample.nextMonthNumber__numerationFrom0);
      }
    });

    it("Returned month if from 1", (): void => {

      type ExperimentalSample = Readonly<{
        currentMonthNumber__numerationFrom0: number;
        nextMonthNumber__numerationFrom1: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { currentMonthNumber__numerationFrom0: 0, nextMonthNumber__numerationFrom1: 2 },
        { currentMonthNumber__numerationFrom0: 1, nextMonthNumber__numerationFrom1: 3 },
        { currentMonthNumber__numerationFrom0: 2, nextMonthNumber__numerationFrom1: 4 },
        { currentMonthNumber__numerationFrom0: 3, nextMonthNumber__numerationFrom1: 5 },
        { currentMonthNumber__numerationFrom0: 4, nextMonthNumber__numerationFrom1: 6 },
        { currentMonthNumber__numerationFrom0: 5, nextMonthNumber__numerationFrom1: 7 },
        { currentMonthNumber__numerationFrom0: 6, nextMonthNumber__numerationFrom1: 8 },
        { currentMonthNumber__numerationFrom0: 7, nextMonthNumber__numerationFrom1: 9 },
        { currentMonthNumber__numerationFrom0: 8, nextMonthNumber__numerationFrom1: 10 },
        { currentMonthNumber__numerationFrom0: 9, nextMonthNumber__numerationFrom1: 11 },
        { currentMonthNumber__numerationFrom0: 10, nextMonthNumber__numerationFrom1: 12 },
        { currentMonthNumber__numerationFrom0: 11, nextMonthNumber__numerationFrom1: 1 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthNumber__numerationFrom0: sample.currentMonthNumber__numerationFrom0,
          firstMonthNumberInRelationToReturnableValue: 1
        }), sample.nextMonthNumber__numerationFrom1);
      }
    });
  });

  describe("By number from 1 of reference month number", (): void => {

    it("Returned month if from 0", (): void => {

      type ExperimentalSample = Readonly<{
        currentMonthNumber__numerationFrom1: number;
        nextMonthNumber__numerationFrom0: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { currentMonthNumber__numerationFrom1: 1, nextMonthNumber__numerationFrom0: 1 },
        { currentMonthNumber__numerationFrom1: 2, nextMonthNumber__numerationFrom0: 2 },
        { currentMonthNumber__numerationFrom1: 3, nextMonthNumber__numerationFrom0: 3 },
        { currentMonthNumber__numerationFrom1: 4, nextMonthNumber__numerationFrom0: 4 },
        { currentMonthNumber__numerationFrom1: 5, nextMonthNumber__numerationFrom0: 5 },
        { currentMonthNumber__numerationFrom1: 6, nextMonthNumber__numerationFrom0: 6 },
        { currentMonthNumber__numerationFrom1: 7, nextMonthNumber__numerationFrom0: 7 },
        { currentMonthNumber__numerationFrom1: 8, nextMonthNumber__numerationFrom0: 8 },
        { currentMonthNumber__numerationFrom1: 9, nextMonthNumber__numerationFrom0: 9 },
        { currentMonthNumber__numerationFrom1: 10, nextMonthNumber__numerationFrom0: 10 },
        { currentMonthNumber__numerationFrom1: 11, nextMonthNumber__numerationFrom0: 11 },
        { currentMonthNumber__numerationFrom1: 12, nextMonthNumber__numerationFrom0: 0 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthNumber__numerationFrom1: sample.currentMonthNumber__numerationFrom1,
          firstMonthNumberInRelationToReturnableValue: 0
        }), sample.nextMonthNumber__numerationFrom0);
      }
    });

    it("Returned month if from 1", (): void => {

      type ExperimentalSample = Readonly<{
        currentMonthNumber__numerationFrom1: number;
        nextMonthNumber__numerationFrom1: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { currentMonthNumber__numerationFrom1: 1, nextMonthNumber__numerationFrom1: 2 },
        { currentMonthNumber__numerationFrom1: 2, nextMonthNumber__numerationFrom1: 3 },
        { currentMonthNumber__numerationFrom1: 3, nextMonthNumber__numerationFrom1: 4 },
        { currentMonthNumber__numerationFrom1: 4, nextMonthNumber__numerationFrom1: 5 },
        { currentMonthNumber__numerationFrom1: 5, nextMonthNumber__numerationFrom1: 6 },
        { currentMonthNumber__numerationFrom1: 6, nextMonthNumber__numerationFrom1: 7 },
        { currentMonthNumber__numerationFrom1: 7, nextMonthNumber__numerationFrom1: 8 },
        { currentMonthNumber__numerationFrom1: 8, nextMonthNumber__numerationFrom1: 9 },
        { currentMonthNumber__numerationFrom1: 9, nextMonthNumber__numerationFrom1: 10 },
        { currentMonthNumber__numerationFrom1: 10, nextMonthNumber__numerationFrom1: 11 },
        { currentMonthNumber__numerationFrom1: 11, nextMonthNumber__numerationFrom1: 12 },
        { currentMonthNumber__numerationFrom1: 12, nextMonthNumber__numerationFrom1: 1 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthNumber__numerationFrom1: sample.currentMonthNumber__numerationFrom1,
          firstMonthNumberInRelationToReturnableValue: 1
        }), sample.nextMonthNumber__numerationFrom1);
      }
    });
  });

  describe("By month name", (): void => {

    it("Returned month if from 0", (): void => {

      type ExperimentalSample = Readonly<{
        monthName: MonthsNames;
        nextMonthNumber__numerationFrom0: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { monthName: MonthsNames.january, nextMonthNumber__numerationFrom0: 1 },
        { monthName: MonthsNames.february, nextMonthNumber__numerationFrom0: 2 },
        { monthName: MonthsNames.march, nextMonthNumber__numerationFrom0: 3 },
        { monthName: MonthsNames.april, nextMonthNumber__numerationFrom0: 4 },
        { monthName: MonthsNames.may, nextMonthNumber__numerationFrom0: 5 },
        { monthName: MonthsNames.june, nextMonthNumber__numerationFrom0: 6 },
        { monthName: MonthsNames.july, nextMonthNumber__numerationFrom0: 7 },
        { monthName: MonthsNames.august, nextMonthNumber__numerationFrom0: 8 },
        { monthName: MonthsNames.september, nextMonthNumber__numerationFrom0: 9 },
        { monthName: MonthsNames.october, nextMonthNumber__numerationFrom0: 10 },
        { monthName: MonthsNames.november, nextMonthNumber__numerationFrom0: 11 },
        { monthName: MonthsNames.december, nextMonthNumber__numerationFrom0: 0 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthName: sample.monthName,
          firstMonthNumberInRelationToReturnableValue: 0
        }), sample.nextMonthNumber__numerationFrom0);
      }
    });

    it("Returned month if from 1", (): void => {

      type ExperimentalSample = Readonly<{
        monthName: MonthsNames;
        nextMonthNumber__numerationFrom1: number;
      }>;

      const experimentalSample: Array<ExperimentalSample> = [
        { monthName: MonthsNames.january, nextMonthNumber__numerationFrom1: 2 },
        { monthName: MonthsNames.february, nextMonthNumber__numerationFrom1: 3 },
        { monthName: MonthsNames.march, nextMonthNumber__numerationFrom1: 4 },
        { monthName: MonthsNames.april, nextMonthNumber__numerationFrom1: 5 },
        { monthName: MonthsNames.may, nextMonthNumber__numerationFrom1: 6 },
        { monthName: MonthsNames.june, nextMonthNumber__numerationFrom1: 7 },
        { monthName: MonthsNames.july, nextMonthNumber__numerationFrom1: 8 },
        { monthName: MonthsNames.august, nextMonthNumber__numerationFrom1: 9 },
        { monthName: MonthsNames.september, nextMonthNumber__numerationFrom1: 10 },
        { monthName: MonthsNames.october, nextMonthNumber__numerationFrom1: 11 },
        { monthName: MonthsNames.november, nextMonthNumber__numerationFrom1: 12 },
        { monthName: MonthsNames.december, nextMonthNumber__numerationFrom1: 1 }
      ];

      for (const sample of experimentalSample) {
        strictEqual(getNextMonthNumber({
          referenceMonthName: sample.monthName,
          firstMonthNumberInRelationToReturnableValue: 1
        }), sample.nextMonthNumber__numerationFrom1);
      }
    });
  });
});

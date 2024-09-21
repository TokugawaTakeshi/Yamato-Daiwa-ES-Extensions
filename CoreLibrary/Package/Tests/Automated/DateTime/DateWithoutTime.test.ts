import { DateWithoutTime, MonthsNames } from "../../../Source";
import Assert from "assert";


describe("DateWithoutTime", (): void => {

  describe("Initialization", (): void => {

    it("With Native Date Object", (): void => {

      const sample1: DateWithoutTime = new DateWithoutTime({ nativeDateObject: new Date(2013, 0, 8) });

      Assert.strictEqual(sample1.year, 2013);
      Assert.strictEqual(sample1.monthNumber__numerationFrom0, 0);
      Assert.strictEqual(sample1.monthNumber__numerationFrom1, 1);
      Assert.strictEqual(sample1.monthNumber__numerationFrom1__2Digits, "01");
      Assert.strictEqual(sample1.monthName, MonthsNames.january);
      Assert.strictEqual(sample1.dayOfMonth, 8);
      Assert.strictEqual(sample1.dayOfMonth__2Digits, "08");


      const sample2: DateWithoutTime = new DateWithoutTime({ nativeDateObject: new Date(2014, 11, 1) });

      Assert.strictEqual(sample2.year, 2014);
      Assert.strictEqual(sample2.monthNumber__numerationFrom0, 11);
      Assert.strictEqual(sample2.monthNumber__numerationFrom1, 12);
      Assert.strictEqual(sample2.monthNumber__numerationFrom1__2Digits, "12");
      Assert.strictEqual(sample2.monthName, MonthsNames.december);
      Assert.strictEqual(sample2.dayOfMonth, 1);
      Assert.strictEqual(sample2.dayOfMonth__2Digits, "01");

    });

    it("With ISO8601 String", (): void => {

      const dateWithoutTime: DateWithoutTime = new DateWithoutTime({ ISO8601String: "08 January 2013" });

      Assert.strictEqual(dateWithoutTime.year, 2013);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom0, 0);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1, 1);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1__2Digits, "01");
      Assert.strictEqual(dateWithoutTime.monthName, MonthsNames.january);
      Assert.strictEqual(dateWithoutTime.dayOfMonth, 8);
      Assert.strictEqual(dateWithoutTime.dayOfMonth__2Digits, "08");

    });

    it("With Milliseconds Amount since UNIX Epoch", (): void => {

      const nativeDate: Date = new Date(2013, 0, 8);
      const millisecondsAmount: number = nativeDate.getTime();
      const dateWithoutTime: DateWithoutTime = new DateWithoutTime({ millisecondsElapsedSinceUNIX_Epoch: millisecondsAmount });

      Assert.strictEqual(dateWithoutTime.year, 2013);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom0, 0);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1, 1);
      Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1__2Digits, "01");
      Assert.strictEqual(dateWithoutTime.monthName, MonthsNames.january);
      Assert.strictEqual(dateWithoutTime.dayOfMonth, 8);
      Assert.strictEqual(dateWithoutTime.dayOfMonth__2Digits, "08");

    });

  });

  // describe("Mutating", (): void => {
  //
  //   describe("setAltogether", (): void => {
  //
  //     describe("mutably", (): void => {
  //
  //       it("Month has been defined by name", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setAltogether({
  //           year: 2023,
  //           monthName: MonthsNames.january,
  //           dayOfMonth: 15
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 0", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setAltogether({
  //           year: 2023,
  //           monthNumber__numerationFrom0: 0,
  //           dayOfMonth: 15
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 1", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setAltogether({
  //           year: 2023,
  //           monthNumber__numerationFrom1: 1,
  //           dayOfMonth: 15
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //     });
  //
  //     describe("immutably", (): void => {
  //
  //       it("Month has been defined by name", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         const newInstance: DateWithoutTime = initialInstance.setAltogether(
  //           {
  //             year: 2023,
  //             monthName: MonthsNames.january,
  //             dayOfMonth: 15
  //           },
  //           { immutably: true }
  //         );
  //
  //         it("Updating was as expected", (): void => {
  //
  //           Assert.strictEqual(newInstance.year, 2023);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(newInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(newInstance.dayOfMonth, 15);
  //           Assert.strictEqual(newInstance.dayOfMonth__2Digits, "15");
  //
  //         });
  //
  //         it("Initial instance has not been mutated", (): void => {
  //
  //           Assert.strictEqual(initialInstance.year, 2022);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 7);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 8);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "08");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.august);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 1);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "01");
  //
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 0", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         const newInstance: DateWithoutTime = initialInstance.setAltogether(
  //           {
  //             year: 2023,
  //             monthName: MonthsNames.january,
  //             dayOfMonth: 15
  //           },
  //           { immutably: true }
  //         );
  //
  //         it("Updating was as expected", (): void => {
  //
  //           Assert.strictEqual(newInstance.year, 2023);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(newInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(newInstance.dayOfMonth, 15);
  //           Assert.strictEqual(newInstance.dayOfMonth__2Digits, "15");
  //
  //         });
  //
  //         it("Initial instance has not been mutated", (): void => {
  //
  //           Assert.strictEqual(initialInstance.year, 2022);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 7);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 8);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "08");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.august);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 1);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "01");
  //
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 1", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         const newInstance: DateWithoutTime = initialInstance.setAltogether(
  //           {
  //             year: 2023,
  //             monthName: MonthsNames.january,
  //             dayOfMonth: 15
  //           },
  //           { immutably: true }
  //         );
  //
  //         it("Updating was as expected", (): void => {
  //
  //           Assert.strictEqual(newInstance.year, 2023);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(newInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(newInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(newInstance.dayOfMonth, 15);
  //           Assert.strictEqual(newInstance.dayOfMonth__2Digits, "15");
  //
  //         });
  //
  //         it("Initial instance has not been mutated", (): void => {
  //
  //           Assert.strictEqual(initialInstance.year, 2022);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 7);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 8);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "08");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.august);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 1);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "01");
  //
  //         });
  //
  //       });
  //
  //     });
  //
  //   });
  //
  //   describe("setLastDayOfSpecificMonthAndYear", (): void => {
  //
  //     describe("mutably", (): void => {
  //
  //       it("Month has been defined by name", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setLastDayOfSpecificMonthAndYear({
  //           year: 2023,
  //           monthName: MonthsNames.january
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 0", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setAltogether({
  //           year: 2023,
  //           monthNumber__numerationFrom0: 0,
  //           dayOfMonth: 15
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //       it("Month number has been defined from 1", (): void => {
  //
  //         const initialInstance: DateWithoutTime = new DateWithoutTime({
  //           year: 2022,
  //           monthName: MonthsNames.august,
  //           dayOfMonth: 1
  //         });
  //
  //         initialInstance.setAltogether({
  //           year: 2023,
  //           monthNumber__numerationFrom1: 1,
  //           dayOfMonth: 15
  //         });
  //
  //         it("Updating was as expected", (): void => {
  //           Assert.strictEqual(initialInstance.year, 2023);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom0, 0);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1, 1);
  //           Assert.strictEqual(initialInstance.monthNumber__numerationFrom1__2Digits, "01");
  //           Assert.strictEqual(initialInstance.monthName, MonthsNames.january);
  //           Assert.strictEqual(initialInstance.dayOfMonth, 15);
  //           Assert.strictEqual(initialInstance.dayOfMonth__2Digits, "15");
  //         });
  //
  //       });
  //
  //     });
  //
  //   });
  //
  // });

});

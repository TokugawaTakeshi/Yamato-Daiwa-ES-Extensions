import { DateWithoutTime, MonthsNames } from "../../../Source";
import Assert from "assert";
import { describe, test } from "node:test";


(async (): Promise<void> => {

  await describe("DateWithoutTime", async (): Promise<void> => {

    await describe("Initialization", async (): Promise<void> => {

      await test("With Native Date Object", (): void => {

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

      await test("With ISO8601 String", (): void => {

        const dateWithoutTime: DateWithoutTime = new DateWithoutTime({ ISO8601String: "08 January 2013" });

        Assert.strictEqual(dateWithoutTime.year, 2013);
        Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom0, 0);
        Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1, 1);
        Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1__2Digits, "01");
        Assert.strictEqual(dateWithoutTime.monthName, MonthsNames.january);
        Assert.strictEqual(dateWithoutTime.dayOfMonth, 8);
        Assert.strictEqual(dateWithoutTime.dayOfMonth__2Digits, "08");

      });

      await test("With Milliseconds Amount since UNIX Epoch", (): void => {

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
  //       test("Month has been defined by name", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //       test("Month number has been defined from 0", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //       test("Month number has been defined from 1", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //       test("Month has been defined by name", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //         test("Initial instance has not been mutated", (): void => {
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
  //       test("Month number has been defined from 0", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //         test("Initial instance has not been mutated", (): void => {
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
  //       test("Month number has been defined from 1", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //         test("Initial instance has not been mutated", (): void => {
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
  //       test("Month has been defined by name", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //       test("Month number has been defined from 0", (): void => {
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
  //         test("Updating was as expected", (): void => {
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
  //       test("Month number has been defined from 1", (): void => {
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
  //         test("Updating was as expected", (): void => {
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

})().catch((error: unknown): void => console.error(error));


// function formatDate({ year, monthNumber__numerationFrom1, dayOfMonth }: DateWithoutTime): string {
//   return `${ year }年${ monthNumber__numerationFrom1 }月${ dayOfMonth }日`;
// }
//
// console.log("=== US/Pacific =====================================================");
// TimezoneMock.register("US/Pacific");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// console.log("=== US/Eastern =====================================================");
// TimezoneMock.register("US/Eastern");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// console.log("=== Brazil/East =====================================================");
// TimezoneMock.register("Brazil/East");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// console.log("=== UTC =============================================================");
// TimezoneMock.register("UTC");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// console.log("=== Europe/London ===================================================");
// TimezoneMock.register("Europe/London");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// console.log("=== Australia/Adelaide ==============================================");
// TimezoneMock.register("Australia/Adelaide");
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toLocaleString());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).toISO8601String());
// console.log(new DateWithoutTime({ ISO8601String: "2024-07-27" }).format(formatDate));
//
// TimezoneMock.unregister();

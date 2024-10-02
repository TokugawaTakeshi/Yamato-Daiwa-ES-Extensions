import { DateWithoutTime } from "../../../Source";
import Assert from "assert";
import { describe, test } from "node:test";
import TimezoneMock from "timezone-mock";


(async (): Promise<void> => {

  await describe("Date is Same for Each Time Zone", async (): Promise<void> => {

    const TARGET_YEAR: number = 2024;
    const TARGET_MONTH_NUMBER__NUMERATION_FROM_1: number = 7;
    const TARGET_DAY_OF_MONTH: number = 27;

    const targetDateISO_8601_String: string = [
      TARGET_YEAR,
      TARGET_MONTH_NUMBER__NUMERATION_FROM_1.toString().padStart(2, "0"),
      TARGET_DAY_OF_MONTH.toString().padStart(2, "0")
    ].join("-");

    const targetDateMillisecondsAmountElapsedSinceUNIX_Epoch: number = new Date(
      Date.UTC(
        TARGET_YEAR,
        TARGET_MONTH_NUMBER__NUMERATION_FROM_1 - 1,
        TARGET_DAY_OF_MONTH
      )
    ).getTime();

    const timeZones: ReadonlyArray<TimezoneMock.TimeZone> = [
      "UTC",
      "US/Pacific",
      "US/Eastern",
      "Brazil/East",
      "Europe/London",
      "Australia/Adelaide"
    ];

    for (const timeZone of timeZones) {

      await describe(timeZone, async (): Promise<void> => {

        TimezoneMock.register(timeZone);

        let sampleDataWithoutTime: DateWithoutTime;
        const definitionsOfSameDateWithoutTime: ReadonlyMap<string, DateWithoutTime.DateDefinition> = new Map([
          [
            "When defined via native Date object",
            { nativeDateObject: new Date(TARGET_YEAR, TARGET_MONTH_NUMBER__NUMERATION_FROM_1 - 1, TARGET_DAY_OF_MONTH) }
          ],
          [
            "When defined via ISO8601 string",
            { ISO8601String: targetDateISO_8601_String }
          ],
          [
            "When defined via milliseconds amount elapsed since UNIX Epoch",
            { millisecondsElapsedSinceUNIX_Epoch: targetDateMillisecondsAmountElapsedSinceUNIX_Epoch }
          ],
          [
            "When defined via clear API",
            {
              year: TARGET_YEAR,
              monthNumber__numerationFrom1: TARGET_MONTH_NUMBER__NUMERATION_FROM_1,
              dayOfMonth: TARGET_DAY_OF_MONTH
            }
          ]
        ]);


        await Promise.all(
          Array.
              from(definitionsOfSameDateWithoutTime.entries()).
              map(
                ([ testCase, dateDefinition ]: [ string, DateWithoutTime.DateDefinition ]): Promise<void> =>
                    test(testCase, (): void => {

                      sampleDataWithoutTime = new DateWithoutTime(dateDefinition);

                      Assert.strictEqual(sampleDataWithoutTime.year, TARGET_YEAR);
                      Assert.strictEqual(
                        sampleDataWithoutTime.monthNumber__numerationFrom1,
                        TARGET_MONTH_NUMBER__NUMERATION_FROM_1
                      );
                      Assert.strictEqual(sampleDataWithoutTime.dayOfMonth, TARGET_DAY_OF_MONTH);

                      Assert.strictEqual(sampleDataWithoutTime.toISO8601String(), targetDateISO_8601_String);

                    })
              )
        );

      });

    }

    TimezoneMock.unregister();


    // await describe("Initialization", async (): Promise<void> => {
    //
    //   await test("With Native Date Object", (): void => {
    //
    //     const sample1: DateWithoutTime = new DateWithoutTime({ nativeDateObject: new Date(2013, 0, 8) });
    //
    //     Assert.strictEqual(sample1.year, 2013);
    //     Assert.strictEqual(sample1.monthNumber__numerationFrom0, 0);
    //     Assert.strictEqual(sample1.monthNumber__numerationFrom1, 1);
    //     Assert.strictEqual(sample1.monthNumber__numerationFrom1__2Digits, "01");
    //     Assert.strictEqual(sample1.monthName, MonthsNames.january);
    //     Assert.strictEqual(sample1.dayOfMonth, 8);
    //     Assert.strictEqual(sample1.dayOfMonth__2Digits, "08");
    //
    //
    //     const sample2: DateWithoutTime = new DateWithoutTime({ nativeDateObject: new Date(2014, 11, 1) });
    //
    //     Assert.strictEqual(sample2.year, 2014);
    //     Assert.strictEqual(sample2.monthNumber__numerationFrom0, 11);
    //     Assert.strictEqual(sample2.monthNumber__numerationFrom1, 12);
    //     Assert.strictEqual(sample2.monthNumber__numerationFrom1__2Digits, "12");
    //     Assert.strictEqual(sample2.monthName, MonthsNames.december);
    //     Assert.strictEqual(sample2.dayOfMonth, 1);
    //     Assert.strictEqual(sample2.dayOfMonth__2Digits, "01");
    //
    //   });
    //
    //
    //   await test("With Milliseconds Amount since UNIX Epoch", (): void => {
    //
    //     const nativeDate: Date = new Date(2013, 0, 8);
    //     const millisecondsAmount: number = nativeDate.getTime();
    //     const dateWithoutTime: DateWithoutTime = new DateWithoutTime({ millisecondsElapsedSinceUNIX_Epoch: millisecondsAmount });
    //
    //     Assert.strictEqual(dateWithoutTime.year, 2013);
    //     Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom0, 0);
    //     Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1, 1);
    //     Assert.strictEqual(dateWithoutTime.monthNumber__numerationFrom1__2Digits, "01");
    //     Assert.strictEqual(dateWithoutTime.monthName, MonthsNames.january);
    //     Assert.strictEqual(dateWithoutTime.dayOfMonth, 8);
    //     Assert.strictEqual(dateWithoutTime.dayOfMonth__2Digits, "08");
    //
    //   });
    //
    // });

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

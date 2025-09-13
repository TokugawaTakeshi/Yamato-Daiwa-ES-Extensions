import { getPreviousMonthNumber, Logger } from "../../../Source";
import { MonthsNames } from "fundamental-constants";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "By Number from 0 of Reference Month Number",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "Returned Month Number is from 0",
          (): void => {

            type ExperimentalSample = Readonly<{
              currentMonthNumber__numerationFrom0: number;
              previousMonthNumber__numerationFrom0: number;
            }>;

            const experimentalSample: Array<ExperimentalSample> = [
              { currentMonthNumber__numerationFrom0: 0, previousMonthNumber__numerationFrom0: 11 },
              { currentMonthNumber__numerationFrom0: 1, previousMonthNumber__numerationFrom0: 0 },
              { currentMonthNumber__numerationFrom0: 2, previousMonthNumber__numerationFrom0: 1 },
              { currentMonthNumber__numerationFrom0: 3, previousMonthNumber__numerationFrom0: 2 },
              { currentMonthNumber__numerationFrom0: 4, previousMonthNumber__numerationFrom0: 3 },
              { currentMonthNumber__numerationFrom0: 5, previousMonthNumber__numerationFrom0: 4 },
              { currentMonthNumber__numerationFrom0: 6, previousMonthNumber__numerationFrom0: 5 },
              { currentMonthNumber__numerationFrom0: 7, previousMonthNumber__numerationFrom0: 6 },
              { currentMonthNumber__numerationFrom0: 8, previousMonthNumber__numerationFrom0: 7 },
              { currentMonthNumber__numerationFrom0: 9, previousMonthNumber__numerationFrom0: 8 },
              { currentMonthNumber__numerationFrom0: 10, previousMonthNumber__numerationFrom0: 9 },
              { currentMonthNumber__numerationFrom0: 11, previousMonthNumber__numerationFrom0: 10 }
            ];

            for (const sample of experimentalSample) {
              Assert.strictEqual(
                getPreviousMonthNumber({
                  referenceMonthNumber__numerationFrom0: sample.currentMonthNumber__numerationFrom0,
                  firstMonthNumberInRelationToReturnableValue: 0
                }),
                sample.previousMonthNumber__numerationFrom0
              );
            }

          }
        ),

        Testing.test(
          "Returned Month Number is from 1",
          (): void => {

            type ExperimentalSample = Readonly<{
              currentMonthNumber__numerationFrom0: number;
              previousMonthNumber__numerationFrom1: number;
            }>;

            const experimentalSample: Array<ExperimentalSample> = [
              { currentMonthNumber__numerationFrom0: 0, previousMonthNumber__numerationFrom1: 12 },
              { currentMonthNumber__numerationFrom0: 1, previousMonthNumber__numerationFrom1: 1 },
              { currentMonthNumber__numerationFrom0: 2, previousMonthNumber__numerationFrom1: 2 },
              { currentMonthNumber__numerationFrom0: 3, previousMonthNumber__numerationFrom1: 3 },
              { currentMonthNumber__numerationFrom0: 4, previousMonthNumber__numerationFrom1: 4 },
              { currentMonthNumber__numerationFrom0: 5, previousMonthNumber__numerationFrom1: 5 },
              { currentMonthNumber__numerationFrom0: 6, previousMonthNumber__numerationFrom1: 6 },
              { currentMonthNumber__numerationFrom0: 7, previousMonthNumber__numerationFrom1: 7 },
              { currentMonthNumber__numerationFrom0: 8, previousMonthNumber__numerationFrom1: 8 },
              { currentMonthNumber__numerationFrom0: 9, previousMonthNumber__numerationFrom1: 9 },
              { currentMonthNumber__numerationFrom0: 10, previousMonthNumber__numerationFrom1: 10 },
              { currentMonthNumber__numerationFrom0: 11, previousMonthNumber__numerationFrom1: 11 }
            ];

            for (const sample of experimentalSample) {
              Assert.strictEqual(
                getPreviousMonthNumber({
                  referenceMonthNumber__numerationFrom0: sample.currentMonthNumber__numerationFrom0,
                  firstMonthNumberInRelationToReturnableValue: 1
                }),
                sample.previousMonthNumber__numerationFrom1
              );
            }

          }
        ),

        Testing.suite(
          "By Number from 1 of Reference Month Number",
          async (): Promise<void> => {

            await Promise.all([

              Testing.test(
                "Returned Month Number is from 0",
                (): void => {

                  type ExperimentalSample = Readonly<{
                    currentMonthNumber__numerationFrom1: number;
                    previousMonthNumber__numerationFrom0: number;
                  }>;

                  const experimentalSample: Array<ExperimentalSample> = [
                    { currentMonthNumber__numerationFrom1: 1, previousMonthNumber__numerationFrom0: 11 },
                    { currentMonthNumber__numerationFrom1: 2, previousMonthNumber__numerationFrom0: 0 },
                    { currentMonthNumber__numerationFrom1: 3, previousMonthNumber__numerationFrom0: 1 },
                    { currentMonthNumber__numerationFrom1: 4, previousMonthNumber__numerationFrom0: 2 },
                    { currentMonthNumber__numerationFrom1: 5, previousMonthNumber__numerationFrom0: 3 },
                    { currentMonthNumber__numerationFrom1: 6, previousMonthNumber__numerationFrom0: 4 },
                    { currentMonthNumber__numerationFrom1: 7, previousMonthNumber__numerationFrom0: 5 },
                    { currentMonthNumber__numerationFrom1: 8, previousMonthNumber__numerationFrom0: 6 },
                    { currentMonthNumber__numerationFrom1: 9, previousMonthNumber__numerationFrom0: 7 },
                    { currentMonthNumber__numerationFrom1: 10, previousMonthNumber__numerationFrom0: 8 },
                    { currentMonthNumber__numerationFrom1: 11, previousMonthNumber__numerationFrom0: 9 },
                    { currentMonthNumber__numerationFrom1: 12, previousMonthNumber__numerationFrom0: 10 }
                  ];

                  for (const sample of experimentalSample) {
                    Assert.strictEqual(
                      getPreviousMonthNumber({
                        referenceMonthNumber__numerationFrom1: sample.currentMonthNumber__numerationFrom1,
                        firstMonthNumberInRelationToReturnableValue: 0
                      }),
                      sample.previousMonthNumber__numerationFrom0
                    );
                  }

                }
              ),

              Testing.test(
                "Returned Month Number is from 1",
                (): void => {

                  type ExperimentalSample = Readonly<{
                    currentMonthNumber__numerationFrom1: number;
                    nextMonthNumber__numerationFrom1: number;
                  }>;

                  const experimentalSample: Array<ExperimentalSample> = [
                    { currentMonthNumber__numerationFrom1: 1, nextMonthNumber__numerationFrom1: 12 },
                    { currentMonthNumber__numerationFrom1: 2, nextMonthNumber__numerationFrom1: 1 },
                    { currentMonthNumber__numerationFrom1: 3, nextMonthNumber__numerationFrom1: 2 },
                    { currentMonthNumber__numerationFrom1: 4, nextMonthNumber__numerationFrom1: 3 },
                    { currentMonthNumber__numerationFrom1: 5, nextMonthNumber__numerationFrom1: 4 },
                    { currentMonthNumber__numerationFrom1: 6, nextMonthNumber__numerationFrom1: 5 },
                    { currentMonthNumber__numerationFrom1: 7, nextMonthNumber__numerationFrom1: 6 },
                    { currentMonthNumber__numerationFrom1: 8, nextMonthNumber__numerationFrom1: 7 },
                    { currentMonthNumber__numerationFrom1: 9, nextMonthNumber__numerationFrom1: 8 },
                    { currentMonthNumber__numerationFrom1: 10, nextMonthNumber__numerationFrom1: 9 },
                    { currentMonthNumber__numerationFrom1: 11, nextMonthNumber__numerationFrom1: 10 },
                    { currentMonthNumber__numerationFrom1: 12, nextMonthNumber__numerationFrom1: 11 }
                  ];

                  for (const sample of experimentalSample) {
                    Assert.strictEqual(
                      getPreviousMonthNumber({
                        referenceMonthNumber__numerationFrom1: sample.currentMonthNumber__numerationFrom1,
                        firstMonthNumberInRelationToReturnableValue: 1
                      }),
                      sample.nextMonthNumber__numerationFrom1
                    );
                  }

                }
              )

            ]);

          }
        ),

        Testing.suite(
          "By Month name",
          async (): Promise<void> => {

            await Promise.all([
              Testing.test(
                "Returned Month Number is from 0",
                (): void => {

                  type ExperimentalSample = Readonly<{
                    monthName: MonthsNames;
                    previousMonthNumber__numerationFrom0: number;
                  }>;

                  const experimentalSample: Array<ExperimentalSample> = [
                    { monthName: MonthsNames.january, previousMonthNumber__numerationFrom0: 11 },
                    { monthName: MonthsNames.february, previousMonthNumber__numerationFrom0: 0 },
                    { monthName: MonthsNames.march, previousMonthNumber__numerationFrom0: 1 },
                    { monthName: MonthsNames.april, previousMonthNumber__numerationFrom0: 2 },
                    { monthName: MonthsNames.may, previousMonthNumber__numerationFrom0: 3 },
                    { monthName: MonthsNames.june, previousMonthNumber__numerationFrom0: 4 },
                    { monthName: MonthsNames.july, previousMonthNumber__numerationFrom0: 5 },
                    { monthName: MonthsNames.august, previousMonthNumber__numerationFrom0: 6 },
                    { monthName: MonthsNames.september, previousMonthNumber__numerationFrom0: 7 },
                    { monthName: MonthsNames.october, previousMonthNumber__numerationFrom0: 8 },
                    { monthName: MonthsNames.november, previousMonthNumber__numerationFrom0: 9 },
                    { monthName: MonthsNames.december, previousMonthNumber__numerationFrom0: 10 }
                  ];

                  for (const sample of experimentalSample) {
                    Assert.strictEqual(
                      getPreviousMonthNumber({
                        referenceMonthName: sample.monthName,
                        firstMonthNumberInRelationToReturnableValue: 0
                      }),
                      sample.previousMonthNumber__numerationFrom0
                    );
                  }

                }
              ),
              Testing.test(
                "Returned Month Number is from 1",
                (): void => {

                  type ExperimentalSample = Readonly<{
                    monthName: MonthsNames;
                    previousMonthNumber__numerationFrom1: number;
                  }>;

                  const experimentalSample: Array<ExperimentalSample> = [
                    { monthName: MonthsNames.january, previousMonthNumber__numerationFrom1: 12 },
                    { monthName: MonthsNames.february, previousMonthNumber__numerationFrom1: 1 },
                    { monthName: MonthsNames.march, previousMonthNumber__numerationFrom1: 2 },
                    { monthName: MonthsNames.april, previousMonthNumber__numerationFrom1: 3 },
                    { monthName: MonthsNames.may, previousMonthNumber__numerationFrom1: 4 },
                    { monthName: MonthsNames.june, previousMonthNumber__numerationFrom1: 5 },
                    { monthName: MonthsNames.july, previousMonthNumber__numerationFrom1: 6 },
                    { monthName: MonthsNames.august, previousMonthNumber__numerationFrom1: 7 },
                    { monthName: MonthsNames.september, previousMonthNumber__numerationFrom1: 8 },
                    { monthName: MonthsNames.october, previousMonthNumber__numerationFrom1: 9 },
                    { monthName: MonthsNames.november, previousMonthNumber__numerationFrom1: 10 },
                    { monthName: MonthsNames.december, previousMonthNumber__numerationFrom1: 11 }
                  ];

                  for (const sample of experimentalSample) {
                    Assert.strictEqual(
                      getPreviousMonthNumber({
                        referenceMonthName: sample.monthName,
                        firstMonthNumberInRelationToReturnableValue: 1
                      }),
                      sample.previousMonthNumber__numerationFrom1
                    );
                  }

                }
              )
            ]);

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);

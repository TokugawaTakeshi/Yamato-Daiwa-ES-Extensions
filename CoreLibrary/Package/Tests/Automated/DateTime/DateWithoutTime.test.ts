import { DateWithoutTime, Logger } from "../../../Source";
import Assert from "assert";
import { suite, test } from "node:test";
import TimezoneMock from "timezone-mock";


suite(
  "Date is Same for Each Time Zone",
  async (): Promise<void> => {

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

      /* eslint-disable-next-line no-await-in-loop -- To guarantee the correct time zone, must be executed sequentially. */
      await suite(timeZone, async (): Promise<void> => {

        TimezoneMock.register(timeZone);

        let sampleDataWithoutTime: DateWithoutTime;
        const definitionsOfSameDateWithoutTime: ReadonlyMap<string, DateWithoutTime.DateDefinition> = new Map([
          [
            "When Defined via Native Date Object",
            { nativeDateObject: new Date(TARGET_YEAR, TARGET_MONTH_NUMBER__NUMERATION_FROM_1 - 1, TARGET_DAY_OF_MONTH) }
          ],
          [
            "When Defined via ISO8601 String",
            { ISO8601String: targetDateISO_8601_String }
          ],
          [
            "When Defined via Milliseconds Amount Elapsed Since UNIX Epoch",
            { millisecondsElapsedSinceUNIX_Epoch: targetDateMillisecondsAmountElapsedSinceUNIX_Epoch }
          ],
          [
            "When Defined via Clear API",
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
                async ([ testCase, dateDefinition ]: [ string, DateWithoutTime.DateDefinition ]): Promise<void> =>
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

  }
).catch(Logger.logPromiseError);

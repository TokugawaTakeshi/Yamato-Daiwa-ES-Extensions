import { getYearOfPreviousMonth } from "../../../Source";
import Assert from "assert";
import Testing from "node:test";
import Logger from "../../../Source/Logging/Logger";


type Sample = Readonly<{
  monthNumber__numerationFrom0: number;
  monthNumber__numerationFrom1: number;
  yearOfPreviousMonth: number;
}>;

const referenceYear: number = 2022;

const experimentalSamples: Array<Sample> = [
  { monthNumber__numerationFrom0: 0, monthNumber__numerationFrom1: 1, yearOfPreviousMonth: referenceYear - 1 },
  { monthNumber__numerationFrom0: 1, monthNumber__numerationFrom1: 2, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 2, monthNumber__numerationFrom1: 3, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 3, monthNumber__numerationFrom1: 4, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 4, monthNumber__numerationFrom1: 5, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 5, monthNumber__numerationFrom1: 6, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 6, monthNumber__numerationFrom1: 7, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 7, monthNumber__numerationFrom1: 8, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 8, monthNumber__numerationFrom1: 9, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 9, monthNumber__numerationFrom1: 10, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 10, monthNumber__numerationFrom1: 11, yearOfPreviousMonth: referenceYear },
  { monthNumber__numerationFrom0: 11, monthNumber__numerationFrom1: 12, yearOfPreviousMonth: referenceYear }
];


Promise.all(
  experimentalSamples.map(

    async (
      { monthNumber__numerationFrom0, monthNumber__numerationFrom1, yearOfPreviousMonth }: Sample
    ): Promise<void> =>

        Testing.test(

          `Year of Previous Month in Relation to ${ monthNumber__numerationFrom1 }/${ referenceYear } ` +
            `is ${ yearOfPreviousMonth }`,

          (): void => {

            Assert.strictEqual(
              getYearOfPreviousMonth({
                referenceYear,
                referenceMonthNumber__numerationFrom0: monthNumber__numerationFrom0
              }),
              yearOfPreviousMonth
            );

            Assert.strictEqual(
              getYearOfPreviousMonth({
                referenceYear,
                referenceMonthNumber__numerationFrom1: monthNumber__numerationFrom1
              }),
              yearOfPreviousMonth
            );

          }

        )

  )
).catch(Logger.logPromiseError);

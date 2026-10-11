import { getYearOfNextMonth, Logger } from "../../../Source";
import Assert from "assert";
import Testing from "node:test";


type Sample = Readonly<{
  monthNumber__numerationFrom0: number;
  monthNumber__numerationFrom1: number;
  yearOfNextMonth: number;
}>;

const referenceYear: number = 2022;

const experimentalSamples: Array<Sample> = [
  { monthNumber__numerationFrom0: 0, monthNumber__numerationFrom1: 1, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 1, monthNumber__numerationFrom1: 2, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 2, monthNumber__numerationFrom1: 3, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 3, monthNumber__numerationFrom1: 4, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 4, monthNumber__numerationFrom1: 5, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 5, monthNumber__numerationFrom1: 6, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 6, monthNumber__numerationFrom1: 7, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 7, monthNumber__numerationFrom1: 8, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 8, monthNumber__numerationFrom1: 9, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 9, monthNumber__numerationFrom1: 10, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 10, monthNumber__numerationFrom1: 11, yearOfNextMonth: referenceYear },
  { monthNumber__numerationFrom0: 11, monthNumber__numerationFrom1: 12, yearOfNextMonth: referenceYear + 1 }
];


Promise.all(
  experimentalSamples.map(

    async (
      { monthNumber__numerationFrom0, monthNumber__numerationFrom1, yearOfNextMonth }: Sample
    ): Promise<void> =>

        Testing.test(

          `Year of Next Month in Relation to ${ monthNumber__numerationFrom1 }/${ referenceYear } is ${ yearOfNextMonth }`,

          (): void => {

            Assert.strictEqual(
              getYearOfNextMonth({
                referenceYear,
                referenceMonthNumber__numerationFrom0: monthNumber__numerationFrom0
              }),
              yearOfNextMonth
            );

            Assert.strictEqual(
              getYearOfNextMonth({
                referenceYear,
                referenceMonthNumber__numerationFrom1: monthNumber__numerationFrom1
              }),
              yearOfNextMonth
            );

          }

        )

  )
).catch(Logger.logPromiseError);

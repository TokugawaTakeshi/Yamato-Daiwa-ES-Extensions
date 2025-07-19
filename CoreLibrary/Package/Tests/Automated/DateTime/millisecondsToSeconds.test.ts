import { Logger, millisecondsToSeconds } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


type Sample = Readonly<{ millisecondsAmount: number; secondsAmount: number; }>;

const samples: ReadonlyArray<Sample> = [
  { millisecondsAmount: 5, secondsAmount: 0.005 },
  { millisecondsAmount: 50, secondsAmount: 0.05 },
  { millisecondsAmount: 500, secondsAmount: 0.5 },
  { millisecondsAmount: 1000, secondsAmount: 1 },
  { millisecondsAmount: 2000, secondsAmount: 2 }
];

Promise.all([
  samples.map(
    async ({ millisecondsAmount, secondsAmount }: Sample): Promise<void> => Testing.test(
      `${ millisecondsAmount } milliseconds is ${ secondsAmount } seconds`,
      (): void => {
        Assert.strictEqual(millisecondsToSeconds(millisecondsAmount), secondsAmount);
      }
    )
  )
]).catch(Logger.logPromiseError);

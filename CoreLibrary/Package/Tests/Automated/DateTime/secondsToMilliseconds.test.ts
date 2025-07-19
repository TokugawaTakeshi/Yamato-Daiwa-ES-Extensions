import { Logger, secondsToMilliseconds } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


type Sample = Readonly<{ secondsAmount: number; millisecondsAmount: number; }>;

const samples: ReadonlyArray<Sample> = [
  { secondsAmount: 0.005, millisecondsAmount: 5 },
  { secondsAmount: 0.05, millisecondsAmount: 50 },
  { secondsAmount: 0.5, millisecondsAmount: 500 },
  { secondsAmount: 1, millisecondsAmount: 1000 },
  { secondsAmount: 2, millisecondsAmount: 2000 }
];

Promise.all([
  samples.map(
    async ({ secondsAmount, millisecondsAmount }: Sample): Promise<void> => Testing.test(
      `${ secondsAmount } seconds is ${ millisecondsAmount } seconds`,
      (): void => {
        Assert.strictEqual(secondsToMilliseconds(secondsAmount), millisecondsAmount);
      }
    )
  )
]).catch(Logger.logPromiseError);

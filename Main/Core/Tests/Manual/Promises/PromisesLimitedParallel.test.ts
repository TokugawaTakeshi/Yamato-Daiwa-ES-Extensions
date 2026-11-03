/* global NodeJS -- Unknown by eslint by default even with `globals: { ...globals.node }`. */

import { secondsToMilliseconds } from "../../../Source";
import PromisesLimitedParallel from "../../../Source/Promises/PromisesLimitedParallel";


/* eslint-disable-next-line prefer-const --
 * Looks like the ESLint bug - the variable cannot be `const` if not initialized immediately. */
let stopwatch: NodeJS.Timeout;

const promisesLimitedParallel: PromisesLimitedParallel =

    new PromisesLimitedParallel({

      initialAsynchronousFunctions: [

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-1, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(4)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-2, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-3, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #2-1, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #2-2, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            )

      ],

      maximalParallelPromisesCount: 3,

      mustClearNotExecutedFunctionsQueueIfErrorOccurred: false,

      onAllPromisesSettled(): void { clearTimeout(stopwatch); }

    }).

        startExecutionIfHasNotStartedYet();


let secondsPassed: number = 0;

stopwatch =
    setInterval(
      (): void => {

        secondsPassed++;
        console.log(`${ secondsPassed } s`);

        if (secondsPassed === 3) {

          promisesLimitedParallel.enqueueAsynchronousFunctions([

            async (): Promise<void> =>
                new Promise<void>(
                  (resolve: () => void): void => {
                    setTimeout(
                      (): void => {
                        console.log("Function #3-1, executing complete.");
                        resolve();
                      },
                      secondsToMilliseconds(2)
                    );
                  }
                ),

            async (): Promise<void> =>
                new Promise<void>(
                  (resolve: () => void): void => {
                    setTimeout(
                      (): void => {
                        console.log("Function #3-2, executing complete.");
                        resolve();
                      },
                      secondsToMilliseconds(2)
                    );
                  }
                )

          ]);

        }

      },
      secondsToMilliseconds(1)
    );

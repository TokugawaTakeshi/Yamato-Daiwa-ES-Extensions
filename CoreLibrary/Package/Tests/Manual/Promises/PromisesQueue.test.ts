import { PromisesQueue } from "../../../Source";
import Logger from "../../../Source/Logging/Logger";


const promisesQueue: PromisesQueue = new PromisesQueue([
  async (): Promise<void> => new Promise<void>(
    (resolve: () => void): void => {
      setTimeout(
        (): void => {
          console.log("First function execution complete");
          resolve();
        },
        3000
      );
    }
  ),
  async (): Promise<void> => new Promise<void>(
    (resolve: () => void): void => {
      setTimeout(
        (): void => {
          console.log("Second function execution complete");
          resolve();
        },
        3000
      );
    }
  ),
  async (): Promise<void> => new Promise<void>(
    (resolve: () => void): void => {
      setTimeout(
        (): void => {
          console.log("Third function execution complete");
          resolve();
        },
        3000
      );
    }
  )
]);


promisesQueue.startExecutionIfHasNotStartedYet({
  behaviourOnSomePromiseFailed: PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED.throwingTheError
}).catch(Logger.logPromiseError);


setTimeout(
  (): void => {
    promisesQueue.addFunctionToQueue(
      async (): Promise<void> => new Promise<void>(
        (resolve: () => void): void => {
          setTimeout(
            (): void => {
              console.log("Forth function execution complete");
              resolve();
            },
            5000
          );
        }
      )
    );
  }
);

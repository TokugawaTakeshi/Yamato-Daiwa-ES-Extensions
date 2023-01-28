import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";


class PromisesQueue {

  private isExecutingNow: boolean = false;
  private mustExecuteNextAsynchronousFunction: boolean = true;
  private asynchronousFunctionsQueue: Array<(...parameters: ReadonlyArray<unknown>) => Promise<void>> = [];


  public static errorHandler(error: unknown): void {
    Logger.logError({
      errorType: UnexpectedEventError.NAME,
      title: UnexpectedEventError.localization.defaultTitle,
      description: "The promise queue execution has failed.",
      occurrenceLocation: "promisesQueue.startExecutionIfHasNotStartedYet(namedParameters)",
      caughtError: error
    });
  }


  public constructor(
    initialAsynchronousFunctions: ReadonlyArray<(...parameters: ReadonlyArray<unknown>) => Promise<void>> = []
  ) {
    this.asynchronousFunctionsQueue.push(...initialAsynchronousFunctions);
  }


  public async startExecutionIfHasNotStartedYet(
    namedParameters: Readonly<{ behaviourOnSomePromiseFailed: PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED; }>
  ): Promise<void> {

    if (this.isExecutingNow) {
      return;
    }


    this.isExecutingNow = true;

    for (const asynchronousFunction of this.asynchronousFunctionsQueue) {

      try {

        /* eslint-disable-next-line no-await-in-loop --
         * Because it is a queue, all asynchronous functions must be executed sequentially. */
        await asynchronousFunction();

      } catch (error: unknown) {

        switch (namedParameters.behaviourOnSomePromiseFailed) {

          case PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED.throwingTheError: {
            throw error;
          }


          case PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED.loggingAndProceedingToNextPromise: {

            Logger.logError({
              errorType: "AsynchronousProcessingFailedError",
              title: "Asynchronous processing failed error",
              description: "The error occurred during execution of one of promised.",
              occurrenceLocation: "promisesQueue.startExecutionIfHasNotStartedYet(namedParameters)",
              caughtError: error
            });

          }

        }

      }


      if (!this.mustExecuteNextAsynchronousFunction) {
        this.isExecutingNow = false;
        this.asynchronousFunctionsQueue = [];
        break;
      }

    }


    this.isExecutingNow = false;
    this.asynchronousFunctionsQueue = [];

  }

  public addFunctionToQueue(newAsynchronousFunction: (...parameters: ReadonlyArray<unknown>) => Promise<void>): void {
    this.asynchronousFunctionsQueue.push(newAsynchronousFunction);
  }


  public async addFunctionAndStartExecutionIfHasNotStartedYet(
    namedParameters: Readonly<{
      newAsynchronousFunction: (...parameters: ReadonlyArray<unknown>) => Promise<void>;
      behaviourOnSomePromiseFailed: PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED;
    }>
  ): Promise<void> {
    this.addFunctionToQueue(namedParameters.newAsynchronousFunction);
    return this.startExecutionIfHasNotStartedYet({
      behaviourOnSomePromiseFailed: namedParameters.behaviourOnSomePromiseFailed
    });
  }

  public stopExecutionOnceCurrentPromiseFinished(): void {
    this.mustExecuteNextAsynchronousFunction = false;
  }

}


namespace PromisesQueue {

  export enum BEHAVIOUR_ON_SOME_PROMISE_FAILED {
    throwingTheError = "THROWING_THE_ERROR",
    loggingAndProceedingToNextPromise = "LOGGING_AND_PROCEEDING_TO_NEXT_PROMISE"
  }

}


export default PromisesQueue;

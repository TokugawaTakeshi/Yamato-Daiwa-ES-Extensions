import addElementsToSet from "../Sets/addElementsToSet";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default class PromisesLimitedParallel {

  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private readonly asynchronousFunctionsQueue: Array<() => Promise<unknown>> = [];
  private readonly currentlyExecutedAsynchronousFunctions: Set<() => Promise<unknown>> = new Set();

  private readonly maximalParallelPromisesCount: number;
  private readonly mustClearNotExecutedFunctionsQueueIfErrorOccurred: boolean;

  private readonly onAllPromisesSettled?: () => unknown;
  private readonly onPromiseRejected?: (error: unknown) => unknown;

  #isExecutingNow: boolean = false;


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public constructor(
    {
      initialAsynchronousFunctions = [],
      maximalParallelPromisesCount,
      mustClearNotExecutedFunctionsQueueIfErrorOccurred,
      onAllPromisesSettled,
      onPromiseRejected
    }: Readonly<{
      initialAsynchronousFunctions?: ReadonlyArray<() => Promise<unknown>>;
      maximalParallelPromisesCount: number;
      mustClearNotExecutedFunctionsQueueIfErrorOccurred: boolean;
      onAllPromisesSettled?: () => unknown;
      onPromiseRejected?: (error: unknown) => unknown;
    }>
  ) {

    if (!isNaturalNumber(maximalParallelPromisesCount)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance:
            new InvalidParameterValueError({
              parameterName: "sourceDataAndOptions",
              parameterNumber: 1,
              messageSpecificPart:
                  "The `maximalParallelPromisesCount` property must be specified with a natural number."
            }),
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "PromisesLimitedParallel.constructor(sourceDataAndOptions)"
      });
    }

    this.asynchronousFunctionsQueue = [ ...initialAsynchronousFunctions ];
    this.maximalParallelPromisesCount = maximalParallelPromisesCount;
    this.mustClearNotExecutedFunctionsQueueIfErrorOccurred = mustClearNotExecutedFunctionsQueueIfErrorOccurred;

    this.onAllPromisesSettled = onAllPromisesSettled;
    this.onPromiseRejected = onPromiseRejected;

  }


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public startExecutionIfHasNotStartedYet(
    newAsynchronousFunctions: ReadonlyArray<() => Promise<unknown>> = []
  ): this {

    this.asynchronousFunctionsQueue.push(...newAsynchronousFunctions);

    if (this.#isExecutingNow) {
      return this;
    }


    this.#isExecutingNow = true;

    addElementsToSet({
      targetSet: this.currentlyExecutedAsynchronousFunctions,
      newElements: this.asynchronousFunctionsQueue.splice(0, this.maximalParallelPromisesCount),
      mutably: true
    });

    for (const asynchronousFunction of this.currentlyExecutedAsynchronousFunctions) {
      this.executeAsynchronousFunction(asynchronousFunction);
    }

    return this;

  }

  public enqueueAsynchronousFunctions(
    newAsynchronousFunctions: ReadonlyArray<() => Promise<unknown>>
  ): void {
    this.asynchronousFunctionsQueue.push(...newAsynchronousFunctions);
  }


  /* ━━━ Public Getters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get isExecutingNow(): boolean {
    return this.#isExecutingNow;
  }

  public get currentlyExecutedFunctionsCount(): number {
    return this.currentlyExecutedAsynchronousFunctions.size;
  }

  public get queuedFunctionsCount(): number {
    return this.asynchronousFunctionsQueue.length;
  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private executeAsynchronousFunction(asynchronousFunction: () => Promise<unknown>): void {

    asynchronousFunction().
        catch(
          (error: unknown): void => {

            Logger.logPromiseError(error);
            this.onPromiseRejected?.(error);

            if (this.mustClearNotExecutedFunctionsQueueIfErrorOccurred) {
              this.asynchronousFunctionsQueue.splice(0, this.asynchronousFunctionsQueue.length);
            }

          }
        ).
        finally(
          (): void => {

            this.currentlyExecutedAsynchronousFunctions.delete(asynchronousFunction);

            if (this.asynchronousFunctionsQueue.length > 0) {

              if (this.currentlyExecutedAsynchronousFunctions.size < this.maximalParallelPromisesCount) {

                const nextAsynchronousFunction: () => Promise<unknown> =
                    this.asynchronousFunctionsQueue.splice(0, 1)[0];

                this.currentlyExecutedAsynchronousFunctions.add(nextAsynchronousFunction);

                this.executeAsynchronousFunction(nextAsynchronousFunction);

              }

            } else if (this.currentlyExecutedAsynchronousFunctions.size === 0) {
              this.onAllPromisesSettled?.();
            }
          }
        );

  }

}

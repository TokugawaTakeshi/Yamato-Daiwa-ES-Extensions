import {
  Timer,
  Logger,
  AlgorithmMismatchError,
  secondsToMilliseconds
} from "@yamato-daiwa/es-extensions";


export default class BrowserJS_Timer extends Timer {

  #nativeTimeoutID!: number;
  #secondsLeft: number = this.period__seconds;


  public constructor(
    compoundParameter: Readonly<{
      period__seconds: number;
      onElapsed?: (outcome: Timer.Outcomes) => void;
    }>
  ) {
    super(compoundParameter);
  }


  public countDown(
    compoundParameter?: Readonly<{ asynchronousCompletion?: Timer.AsynchronousCompletions.promise; }>
  ): Promise<Timer.Outcomes>;

  public countDown(
    compoundParameter: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.callback; }>
  ): void;

  /* eslint-disable-next-line @typescript-eslint/promise-function-async --
   * In this case, the function could return or not return the promise. If to make this function async, the return type signature
   * will become invalid. */
  public countDown(
    {
      asynchronousCompletion = Timer.AsynchronousCompletions.promise
    }: {
      asynchronousCompletion?: Timer.AsynchronousCompletions;
    } | {
      asynchronousCompletion: Timer.AsynchronousCompletions.callback;
    } = {}
    /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type --
    *  In this case function could return or not return the value depending on parameter. */
  ): Promise<Timer.Outcomes> | void {

    const promise: Promise<Timer.Outcomes> = new Promise<Timer.Outcomes>((resolve: (outcome: Timer.Outcomes) => void): void => {

      this.#nativeTimeoutID = window.setInterval((): void => {

        if (this.mustStop) {
          window.clearInterval(this.#nativeTimeoutID);
          resolve(Timer.Outcomes.stopped);
          return;
        }


        this.#secondsLeft = this.#secondsLeft - 1;

        if (this.#secondsLeft === 0) {
          window.clearInterval(this.#nativeTimeoutID);
          resolve(Timer.Outcomes.elapsed);
        }

      }, secondsToMilliseconds(1));
    });

    if (asynchronousCompletion === Timer.AsynchronousCompletions.promise) {
      return promise;
    }


    promise.
        then((outcome: Timer.Outcomes): void => { this.onElapsed?.(outcome); }).
        catch((error: unknown): void => {
          Logger.logError({
            errorType: AlgorithmMismatchError.NAME,
            title: AlgorithmMismatchError.localization.defaultTitle,
            description: "Error occurred before times has elapsed.",
            occurrenceLocation: "browserJS_Timer.countDown(parametersObject)",
            caughtError: error
          });
        });
  }

}

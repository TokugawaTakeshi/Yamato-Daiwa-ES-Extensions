import {
  Timer,
  Logger,
  AlgorithmMismatchError,
  secondsToMilliseconds
} from "@yamato-daiwa/es-extensions";


export default class BrowserJS_Timer extends Timer {

  #nativeTimeoutID!: number;
  #secondsLeft: number = this.period__seconds;
  #isActive: boolean = false;


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

  public countDown(
    {
      asynchronousCompletion = Timer.AsynchronousCompletions.promise
    }: {
      asynchronousCompletion?: Timer.AsynchronousCompletions;
    } | {
      asynchronousCompletion: Timer.AsynchronousCompletions.callback;
    } = {}
  ): Promise<Timer.Outcomes> | void {

    if (this.isActive) {
      return;
    }


    this.#isActive = true;

    const promise: Promise<Timer.Outcomes> = new Promise<Timer.Outcomes>(
      (resolve: (outcome: Timer.Outcomes) => void): void => {

        this.#nativeTimeoutID = window.setInterval(
          (): void => {

            if (this.mustStop) {

              this.#isActive = false;
              window.clearInterval(this.#nativeTimeoutID);

              resolve(Timer.Outcomes.stopped);

              return;

            }


            this.#secondsLeft = this.#secondsLeft - 1;

            if (this.#secondsLeft < 0) {

              this.#isActive = false;
              this.#secondsLeft = this.period__seconds;

              window.clearInterval(this.#nativeTimeoutID);

              resolve(Timer.Outcomes.elapsed);

            }

          },
          secondsToMilliseconds(1)
        );
      }
    );

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


  public resetAndRestart(
    compoundParameter?: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.promise; }>
  ): Promise<Timer.Outcomes>;

  public resetAndRestart(
    compoundParameter: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.callback; }>
  ): void;

  public resetAndRestart(
    {
      asynchronousCompletion = Timer.AsynchronousCompletions.promise
    }: {
      asynchronousCompletion?: Timer.AsynchronousCompletions;
    } | {
      asynchronousCompletion: Timer.AsynchronousCompletions.callback;
    } = {}
  ): Promise<Timer.Outcomes> | void {

    window.clearInterval(this.#nativeTimeoutID);
    this.#isActive = false;
    this.#secondsLeft = this.period__seconds;

    if (asynchronousCompletion === Timer.AsynchronousCompletions.promise) {
      return this.countDown({ asynchronousCompletion: Timer.AsynchronousCompletions.promise });
    }


    this.countDown({ asynchronousCompletion: Timer.AsynchronousCompletions.callback });

  }


  public get isActive(): boolean {
    return this.#isActive;
  }

}

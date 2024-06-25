abstract class Timer {

  protected readonly period__seconds: number;
  protected readonly onElapsed?: (outcome: Timer.Outcomes) => void;

  protected mustStop: boolean = false;


  protected constructor(
    compoundParameter: Readonly<{
      period__seconds: number;
      onElapsed?: (outcome: Timer.Outcomes) => void;
    }>
  ) {
    this.period__seconds = compoundParameter.period__seconds;
    this.onElapsed = compoundParameter.onElapsed;
  }


  public abstract countDown(
    compoundParameter?: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.promise; }>
  ): Promise<Timer.Outcomes>;

  public abstract countDown(
    compoundParameter: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.callback; }>
  ): void;


  public abstract resetAndRestart(
    compoundParameter?: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.promise; }>
  ): Promise<Timer.Outcomes>;

  public abstract resetAndRestart(
    compoundParameter: Readonly<{ asynchronousCompletion: Timer.AsynchronousCompletions.callback; }>
  ): void;


  public abstract get isActive(): boolean;

}


namespace Timer {

  export enum Outcomes {
    elapsed = "ELAPSED",
    stopped = "STOPPED"
  }

  export enum AsynchronousCompletions {
    promise = "PROMISE",
    callback = "CALLBACK"
  }

}


export default Timer;

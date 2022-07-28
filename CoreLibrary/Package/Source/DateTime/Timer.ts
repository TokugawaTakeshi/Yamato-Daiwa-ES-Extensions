export default abstract class Timer {

  protected readonly period__seconds: number;
  protected readonly onElapsed: () => unknown;


  protected constructor(
    namedParameters: {
      period__seconds: number;
      onElapsed: () => unknown;
    }
  ) {
    this.period__seconds = namedParameters.period__seconds;
    this.onElapsed = namedParameters.onElapsed;
  }


  public abstract start(): void;
  public abstract stop(): void;
  public abstract restart(): void;
}

export default abstract class Timer {

  protected readonly period__seconds: number;
  protected readonly onElapsed: () => unknown;

  public constructor(
      parametersObject: {
        period__seconds: number;
        onElapsed: () => unknown;
      }
  ) {
    this.period__seconds = parametersObject.period__seconds;
    this.onElapsed = parametersObject.onElapsed;
  }


  public abstract start(): void;
  public abstract stop(): void;
  public abstract restart(): void;
}

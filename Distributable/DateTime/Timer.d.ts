export default abstract class Timer {
    protected readonly period__seconds: number;
    protected readonly onElapsed: () => unknown;
    constructor(parametersObject: {
        period__seconds: number;
        onElapsed: () => unknown;
    });
    abstract start(): void;
    abstract stop(): void;
    abstract restart(): void;
}

export default class Timer {
    constructor(parametersObject) {
        this.period__seconds = parametersObject.period__seconds;
        this.onElapsed = parametersObject.onElapsed;
    }
}

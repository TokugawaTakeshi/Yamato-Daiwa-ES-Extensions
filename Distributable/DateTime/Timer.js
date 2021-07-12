"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(parametersObject) {
        this.period__seconds = parametersObject.period__seconds;
        this.onElapsed = parametersObject.onElapsed;
    }
}
exports.default = Timer;

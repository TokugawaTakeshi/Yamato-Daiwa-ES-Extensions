"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timer_1 = require("../../DateTime/Timer");
const secondsToMilliseconds_1 = require("../../DateTime/secondsToMilliseconds");
class NodeJS_Timer extends Timer_1.default {
    start() {
        this.timeout = setTimeout(this.onElapsed.bind(this), secondsToMilliseconds_1.default(this.period__seconds));
    }
    stop() {
        clearTimeout(this.timeout);
    }
    restart() {
        this.stop();
        this.start();
    }
}
exports.default = NodeJS_Timer;

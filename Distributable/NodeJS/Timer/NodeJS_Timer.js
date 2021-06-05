import Timer from "../../DateTime/Timer";
export default class NodeJS_Timer extends Timer {
    start() {
        this.timeout = setTimeout(this.onElapsed.bind(this), this.period__seconds);
    }
    stop() {
        clearTimeout(this.timeout);
    }
    restart() {
        this.stop();
        this.start();
    }
}

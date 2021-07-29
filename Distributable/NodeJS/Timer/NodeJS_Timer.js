import Timer from "../../DateTime/Timer";
import secondsToMilliseconds from "../../DateTime/secondsToMilliseconds";
export default class NodeJS_Timer extends Timer {
    start() {
        this.timeout = setTimeout(this.onElapsed.bind(this), secondsToMilliseconds(this.period__seconds));
    }
    stop() {
        clearTimeout(this.timeout);
    }
    restart() {
        this.stop();
        this.start();
    }
}

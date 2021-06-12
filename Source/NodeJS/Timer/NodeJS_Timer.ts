import Timer from "../../DateTime/Timer";
import Timeout = NodeJS.Timeout;
import secondsToMilliseconds from "../../DateTime/secondsToMilliseconds";


export default class NodeJS_Timer extends Timer {

  private timeout!: Timeout;


  public start(): void {
    this.timeout = setTimeout(this.onElapsed.bind(this), secondsToMilliseconds(1000*this.period__seconds));
  }

  public stop(): void {
    clearTimeout(this.timeout);
  }


  public restart(): void {
    this.stop();
    this.start();
  }
}

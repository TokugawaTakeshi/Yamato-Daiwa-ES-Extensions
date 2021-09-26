import { Timer, secondsToMilliseconds } from "@yamato-daiwa/es-extensions";
import Timeout = NodeJS.Timeout;


export default class NodeJS_Timer extends Timer {

  private timeout!: Timeout;


  public start(): void {
    this.timeout = setTimeout(this.onElapsed.bind(this), secondsToMilliseconds(this.period__seconds));
  }

  public stop(): void {
    clearTimeout(this.timeout);
  }


  public restart(): void {
    this.stop();
    this.start();
  }
}

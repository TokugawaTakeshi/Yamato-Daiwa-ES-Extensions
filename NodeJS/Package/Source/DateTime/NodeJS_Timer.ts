import { Timer, secondsToMilliseconds } from "@yamato-daiwa/es-extensions";
import Timeout = NodeJS.Timeout;


export default class NodeJS_Timer extends Timer {

  private nativeTimeout!: Timeout;


  public start(): void {
    this.nativeTimeout = setTimeout(this.onElapsed.bind(this), secondsToMilliseconds(this.period__seconds));
  }

  public stop(): void {
    clearTimeout(this.nativeTimeout);
  }


  public restart(): void {
    this.stop();
    this.start();
  }
}

import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import type { Timer } from "@yamato-daiwa/es-extensions";
import BrowserJS_Timer from "../../Source/DateTime/BrowserJS_Timer";
import provideMockBrowserEnvironment from "jsdom-global";


provideMockBrowserEnvironment();

const sampleTimer: Timer = new BrowserJS_Timer({
  period__seconds: 3
});

sampleTimer.countDown().
    then((outcome: Timer.Outcomes): void => {
      Logger.logInfo({
        title: "Timer elapsed",
        description: `With result: ${ outcome }`
      });
    }).
    catch((error: Error): void => {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: "Timer error occurred",
        occurrenceLocation: "className.methodName(parametersObject)",
        caughtError: error
      });
    });

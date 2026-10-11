import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import type { Timer } from "@yamato-daiwa/es-extensions";
import { NodeJS_Timer } from "../../Source";


const sampleTimer: Timer = new NodeJS_Timer({
  period__seconds: 3
});

sampleTimer.countDown().
    then((outcome: Timer.Outcomes): void => {
      Logger.logInfo({
        title: "Timer elapsed",
        description: `With result: ${ outcome }`
      });
    }).
    catch((error: unknown): void => {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: "Timer error occurred",
        occurrenceLocation: "NodeJS_Timer.test.ts",
        caughtError: error
      });
    });

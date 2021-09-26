import { Logger } from "@yamato-daiwa/es-extensions";
import LoggerLocalization__Russian from "./LoggerLocalization__Russian";


export default function localizeLogger(): void {
  Logger.setLocalization(LoggerLocalization__Russian);
}

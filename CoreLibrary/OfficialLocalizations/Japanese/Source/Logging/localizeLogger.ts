import { Logger } from "@yamato-daiwa/es-extensions";
import LoggerLocalization__Japanese from "./LoggerLocalization__Japanese";


export default function localizeLogger(): void {
  Logger.setLocalization(LoggerLocalization__Japanese);
}

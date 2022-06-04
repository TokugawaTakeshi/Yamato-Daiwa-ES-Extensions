import  { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";
import InvalidConsoleCommandErrorLocalization__Russian from "./InvalidConsoleCommandErrorLocalization.russian";


export default function localizeInvalidConsoleCommandError(): void {
  InvalidConsoleCommandError.localization = InvalidConsoleCommandErrorLocalization__Russian;
}

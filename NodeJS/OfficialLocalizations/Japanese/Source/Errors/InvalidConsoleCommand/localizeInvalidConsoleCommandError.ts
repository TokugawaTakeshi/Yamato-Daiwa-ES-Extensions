import  { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";
import InvalidConsoleCommandErrorLocalization__Japanese from "./InvalidConsoleCommandErrorLocalization.japanese";


export default function localizeInvalidConsoleCommandError(): void {
  InvalidConsoleCommandError.localization = InvalidConsoleCommandErrorLocalization__Japanese;
}

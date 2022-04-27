import { FileReadingFailedError } from "@yamato-daiwa/es-extensions";
import FileReadingFailedErrorLocalization__Russian from "./FileReadingFailedErrorLocalization.russian";


export default function localizeConfigFileNotFoundError(): void {
  FileReadingFailedError.localization = FileReadingFailedErrorLocalization__Russian;
}

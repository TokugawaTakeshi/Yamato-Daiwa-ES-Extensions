import { FileReadingFailedError } from "@yamato-daiwa/es-extensions";
import FileReadingFailedErrorLocalization__Russian from "./FileReadingFailedErrorLocalization.russian";


export default function localizeFileReadingFailedError(): void {
  FileReadingFailedError.localization = FileReadingFailedErrorLocalization__Russian;
}

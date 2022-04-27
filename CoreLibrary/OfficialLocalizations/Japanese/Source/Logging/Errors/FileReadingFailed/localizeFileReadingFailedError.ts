import { FileReadingFailedError } from "@yamato-daiwa/es-extensions";
import FileReadingFailedErrorLocalization__Japanese from "./FileReadingFailedErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  FileReadingFailedError.localization = FileReadingFailedErrorLocalization__Japanese;
}

import { FileWritingFailedError } from "@yamato-daiwa/es-extensions";
import FileWritingFailedErrorLocalization__Russian from "./FileWritingFailedErrorLocalization.russian";


export default function localizeFileWritingFailedError(): void {
  FileWritingFailedError.localization = FileWritingFailedErrorLocalization__Russian;
}

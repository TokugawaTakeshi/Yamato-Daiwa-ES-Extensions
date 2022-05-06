import { FileWritingFailedError } from "@yamato-daiwa/es-extensions";
import FileWritingFailedErrorLocalization__Japanese from "./FileWritingFailedErrorLocalization.japanese";


export default function localizeFileWritingFailedError(): void {
  FileWritingFailedError.localization = FileWritingFailedErrorLocalization__Japanese;
}

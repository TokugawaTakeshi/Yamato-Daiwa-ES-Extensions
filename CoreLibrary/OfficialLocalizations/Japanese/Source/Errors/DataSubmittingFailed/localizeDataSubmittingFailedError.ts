import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import DataSubmittingFailedErrorLocalization__Japanese from "./DataSubmittingFailedErrorLocalization.japanese";


export default function localizeDataSubmittingFailedError(): void {
  DataSubmittingFailedError.localization = DataSubmittingFailedErrorLocalization__Japanese;
}

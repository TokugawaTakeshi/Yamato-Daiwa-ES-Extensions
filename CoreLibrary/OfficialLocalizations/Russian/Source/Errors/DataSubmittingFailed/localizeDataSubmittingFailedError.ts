import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import DataSubmittingFailedErrorLocalization__Russian from "./DataSubmittingFailedErrorLocalization.russian";


export default function localizeDataSubmittingFailedError(): void {
  DataSubmittingFailedError.localization = DataSubmittingFailedErrorLocalization__Russian;
}

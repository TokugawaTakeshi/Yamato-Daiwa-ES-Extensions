import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import DataSubmittingFailedErrorLocalization__Japanese from "./DataSubmittingFailedErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  DataSubmittingFailedError.localization = DataSubmittingFailedErrorLocalization__Japanese;
}

import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";
import DataRetrievingFailedErrorLocalization__Japanese from "./DataRetrievingFailedErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__Japanese;
}

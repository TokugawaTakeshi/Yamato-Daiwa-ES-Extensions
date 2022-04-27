import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";
import DataRetrievingFailedErrorLocalization__Russian from "./DataRetrievingFailedErrorLocalization.russian";


export default function localizeConfigFileNotFoundError(): void {
  DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__Russian;
}

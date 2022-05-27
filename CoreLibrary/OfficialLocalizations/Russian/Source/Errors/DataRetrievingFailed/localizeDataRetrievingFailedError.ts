import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";
import DataRetrievingFailedErrorLocalization__Russian from "./DataRetrievingFailedErrorLocalization.russian";


export default function localizeDataRetrievingFailedError(): void {
  DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__Russian;
}

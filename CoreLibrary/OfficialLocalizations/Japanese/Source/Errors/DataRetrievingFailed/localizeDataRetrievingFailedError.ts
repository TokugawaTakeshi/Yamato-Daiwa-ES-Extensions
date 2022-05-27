import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";
import DataRetrievingFailedErrorLocalization__Japanese from "./DataRetrievingFailedErrorLocalization.japanese";


export default function localizeDataRetrievingFailedError(): void {
  DataRetrievingFailedError.localization = DataRetrievingFailedErrorLocalization__Japanese;
}

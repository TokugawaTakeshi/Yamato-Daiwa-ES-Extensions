import { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import InvalidExternalDataErrorLocalization__Japanese from "./InvalidExternalDataErrorLocalization.japanese";


export default function localizeInvalidExternalDataError(): void {
  InvalidExternalDataError.localization = InvalidExternalDataErrorLocalization__Japanese;
}

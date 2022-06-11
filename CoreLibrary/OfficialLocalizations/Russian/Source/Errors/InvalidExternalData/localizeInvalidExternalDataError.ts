import { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import InvalidExternalDataErrorLocalization__Russian from "./InvalidExternalDataErrorLocalization.russian";


export default function localizeInvalidExternalDataError(): void {
  InvalidExternalDataError.localization = InvalidExternalDataErrorLocalization__Russian;
}

import { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";
import DOM_ElementRetrievingFailedErrorLocalization__Japanese from "./DOM_ElementRetrievingFailedErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  DOM_ElementRetrievingFailedError.localization = DOM_ElementRetrievingFailedErrorLocalization__Japanese;
}

import { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import InvalidParameterValueErrorLocalization__Russian from "./InvalidParameterValueErrorLocalization.russian";


export default function localizeInvalidParameterValueError(): void {
  InvalidParameterValueError.localization = InvalidParameterValueErrorLocalization__Russian;
}

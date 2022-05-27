import { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import InvalidParameterValueErrorLocalization__Japanese from "./InvalidParameterValueErrorLocalization.japanese";


export default function localizeInvalidParameterValueError(): void {
  InvalidParameterValueError.localization = InvalidParameterValueErrorLocalization__Japanese;
}

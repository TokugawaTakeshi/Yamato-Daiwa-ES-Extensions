import { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";
import IncompatiblePropertiesInObjectTypeParameterLocalizationJapanese from
      "./IncompatiblePropertiesInObjectTypeParameterLocalization.russian";


export default function localizeIncompatiblePropertiesInObjectTypeParameterError(): void {
  IncompatiblePropertiesInObjectTypeParameterError.localization =
      IncompatiblePropertiesInObjectTypeParameterLocalizationJapanese;
}

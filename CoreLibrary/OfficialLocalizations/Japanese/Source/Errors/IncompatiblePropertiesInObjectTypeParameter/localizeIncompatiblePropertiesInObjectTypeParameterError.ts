import { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";
import IncompatiblePropertiesInObjectTypeParameterLocalizationJapanese from
      "./IncompatiblePropertiesInObjectTypeParameterLocalization.japanese";


export default function localizeIncompatiblePropertiesInObjectTypeParameterError(): void {
  IncompatiblePropertiesInObjectTypeParameterError.localization =
      IncompatiblePropertiesInObjectTypeParameterLocalizationJapanese;
}

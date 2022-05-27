import { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import InvalidConfigErrorLocalization__Russian from "./InvalidConfigErrorLocalization.russian";


export default function localizeInvalidConfigError(): void {
  InvalidConfigError.localization = InvalidConfigErrorLocalization__Russian;
}

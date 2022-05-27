import { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import InvalidConfigErrorLocalization__Japanese from "./InvalidConfigErrorLocalization.japanese";


export default function localizeInvalidConfigError(): void {
  InvalidConfigError.localization = InvalidConfigErrorLocalization__Japanese;
}

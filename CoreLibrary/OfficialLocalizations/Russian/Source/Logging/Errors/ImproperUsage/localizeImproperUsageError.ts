import { ImproperUsageError } from "@yamato-daiwa/es-extensions";
import ImproperUsageErrorLocalization__Russian from "./ImproperUsageErrorLocalization.russian";


export default function localizeConfigFileNotFoundError(): void {
  ImproperUsageError.localization = ImproperUsageErrorLocalization__Russian;
}

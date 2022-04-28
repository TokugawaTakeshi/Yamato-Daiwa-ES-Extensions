import { ImproperUsageError } from "@yamato-daiwa/es-extensions";
import ImproperUsageErrorLocalization__Japanese from "./ImproperUsageErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  ImproperUsageError.localization = ImproperUsageErrorLocalization__Japanese;
}

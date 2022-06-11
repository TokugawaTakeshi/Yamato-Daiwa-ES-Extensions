import { ImproperUsageError } from "@yamato-daiwa/es-extensions";
import ImproperUsageErrorLocalization__Japanese from "./ImproperUsageErrorLocalization.japanese";


export default function localizeImproperUsageError(): void {
  ImproperUsageError.localization = ImproperUsageErrorLocalization__Japanese;
}

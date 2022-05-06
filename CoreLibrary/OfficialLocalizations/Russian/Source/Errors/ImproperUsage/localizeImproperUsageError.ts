import { ImproperUsageError } from "@yamato-daiwa/es-extensions";
import ImproperUsageErrorLocalization__Russian from "./ImproperUsageErrorLocalization.russian";


export default function localizeImproperUsageError(): void {
  ImproperUsageError.localization = ImproperUsageErrorLocalization__Russian;
}

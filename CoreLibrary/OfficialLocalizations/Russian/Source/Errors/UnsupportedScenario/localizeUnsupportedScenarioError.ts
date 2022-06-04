import { UnsupportedScenarioError } from "@yamato-daiwa/es-extensions";
import UnsupportedScenarioErrorLocalization__Russian from "./UnsupportedScenarioErrorLocalization.russian";


export default function localizeUnsupportedScenarioErrorError(): void {
  UnsupportedScenarioError.localization = UnsupportedScenarioErrorLocalization__Russian;
}

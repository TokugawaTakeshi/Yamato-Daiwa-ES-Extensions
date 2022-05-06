import { UnsupportedScenarioError } from "@yamato-daiwa/es-extensions";
import UnsupportedScenarioErrorLocalization__Japanese from "./UnsupportedScenarioErrorLocalization.japanese";


export default function localizeUnsupportedScenarioErrorError(): void {
  UnsupportedScenarioError.localization = UnsupportedScenarioErrorLocalization__Japanese;
}

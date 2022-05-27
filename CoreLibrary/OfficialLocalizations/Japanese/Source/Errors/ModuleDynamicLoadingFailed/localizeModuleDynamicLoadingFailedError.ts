import { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";
import ModuleDynamicLoadingFailedErrorLocalization__Japanese from "./ModuleDynamicLoadingFailedErrorLocalization.japanese";


export default function localizeModuleDynamicLoadingFailedError(): void {
  ModuleDynamicLoadingFailedError.localization = ModuleDynamicLoadingFailedErrorLocalization__Japanese;
}

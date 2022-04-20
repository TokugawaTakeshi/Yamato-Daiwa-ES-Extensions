import { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";
import ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese from
    "./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization.japanese";


export default function localizeClassRedundantSubsequentInitializationError(): void {
  ClassRequiredInitializationHasNotBeenExecutedError.localization =
      ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese;
}

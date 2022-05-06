import { InterProcessInteractionFailedError } from "@yamato-daiwa/es-extensions";
import InterProcessInteractionFailedErrorLocalization__Japanese from
      "./InterProcessInteractionFailedErrorLocalization.japanese";


export default function localizeInterProcessInteractionFailedError(): void {
  InterProcessInteractionFailedError.localization = InterProcessInteractionFailedErrorLocalization__Japanese;
}

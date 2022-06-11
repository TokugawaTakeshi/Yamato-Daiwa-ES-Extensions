import { InterProcessInteractionFailedError } from "@yamato-daiwa/es-extensions-nodejs";
import InterProcessInteractionFailedErrorLocalization__Russian from "./InterProcessInteractionFailedErrorLocalization.russian";


export default function localizeInterProcessInteractionFailedError(): void {
  InterProcessInteractionFailedError.localization = InterProcessInteractionFailedErrorLocalization__Russian;
}

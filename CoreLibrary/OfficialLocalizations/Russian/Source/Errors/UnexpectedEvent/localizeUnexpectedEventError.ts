import { UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import UnexpectedEventErrorLocalization__Russian from "./UnexpectedEventErrorLocalization.russian";


export default function localizeUnexpectedEventError(): void {
  UnexpectedEventError.localization = UnexpectedEventErrorLocalization__Russian;
}

import { UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import UnexpectedEventErrorLocalization__Japanese from "./UnexpectedEventErrorLocalization.japanese";


export default function localizeUnexpectedEventError(): void {
  UnexpectedEventError.localization = UnexpectedEventErrorLocalization__Japanese;
}

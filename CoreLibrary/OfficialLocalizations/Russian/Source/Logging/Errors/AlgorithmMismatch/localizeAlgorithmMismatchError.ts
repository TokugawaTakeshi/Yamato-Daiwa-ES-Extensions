import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import AlgorithmMismatchErrorLocalization__Russian from "./AlgorithmMismatchErrorLocalization.russian";


export default function localizeAlgorithmMismatchError(): void {
  AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__Russian;
}

import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import AlgorithmMismatchErrorLocalization__Japanese from "./AlgorithmMismatchErrorLocalization.japanese";


export default function localizeAlgorithmMismatchError(): void {
  AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__Japanese;
}

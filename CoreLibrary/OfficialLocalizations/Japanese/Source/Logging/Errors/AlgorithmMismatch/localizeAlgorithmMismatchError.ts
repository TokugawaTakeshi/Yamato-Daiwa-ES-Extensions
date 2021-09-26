import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import AlgorithmMismatchErrorLocalization__Japanese from "./AlgorithmMismatchErrorLocalization__Japanese";


export default function localizeAlgorithmMismatchError(): void {
  AlgorithmMismatchError.setLocalization(AlgorithmMismatchErrorLocalization__Japanese)
}

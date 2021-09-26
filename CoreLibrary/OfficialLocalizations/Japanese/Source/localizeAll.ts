import localizeLogger from "./Logging/localizeLogger";
import localizeAlgorithmMismatchError from "./Logging/Errors/AlgorithmMismatch/localizeAlgorithmMismatchError";
import localizeClassRedundantSubsequentInitializationError
  from "./Logging/Errors/ClassRedundantSubsequentInitialization/localizeClassRedundantSubsequentInitializationError";


export default function localizeAll(): void {

  localizeLogger();

  localizeAlgorithmMismatchError();
  localizeClassRedundantSubsequentInitializationError();
}

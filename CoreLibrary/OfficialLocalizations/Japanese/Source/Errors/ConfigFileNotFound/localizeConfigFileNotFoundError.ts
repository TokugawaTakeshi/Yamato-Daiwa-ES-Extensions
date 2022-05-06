import { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import ConfigFileNotFoundErrorLocalization__Japanese from "./ConfigFileNotFoundErrorLocalization.japanese";


export default function localizeConfigFileNotFoundError(): void {
  ConfigFileNotFoundError.localization = ConfigFileNotFoundErrorLocalization__Japanese;
}

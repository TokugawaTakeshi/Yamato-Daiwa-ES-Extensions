import { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import ConfigFileNotFoundErrorLocalization__Russian from "./ConfigFileNotFoundErrorLocalization__Russian";


export default function localizeConfigFileNotFoundError(): void {
  ConfigFileNotFoundError.localization = ConfigFileNotFoundErrorLocalization__Russian;
}

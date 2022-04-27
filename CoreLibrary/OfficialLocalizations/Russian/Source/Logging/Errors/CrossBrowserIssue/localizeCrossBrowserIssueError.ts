import { CrossBrowserIssueError } from "@yamato-daiwa/es-extensions";
import CrossBrowserIssueErrorLocalization__Russian from "./CrossBrowserIssueErrorLocalization.russian";


export default function localizeConfigFileNotFoundError(): void {
  CrossBrowserIssueError.localization = CrossBrowserIssueErrorLocalization__Russian;
}

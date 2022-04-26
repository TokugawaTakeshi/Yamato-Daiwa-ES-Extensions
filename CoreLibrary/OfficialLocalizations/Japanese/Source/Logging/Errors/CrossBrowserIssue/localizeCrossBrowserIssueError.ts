import { CrossBrowserIssueError } from "@yamato-daiwa/es-extensions";
import CrossBrowserIssueErrorLocalization__Japanese from "./CrossBrowserIssueErrorLocalization__Japanese";


export default function localizeConfigFileNotFoundError(): void {
  CrossBrowserIssueError.localization = CrossBrowserIssueErrorLocalization__Japanese;
}

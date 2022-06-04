import { CrossBrowserIssueError } from "@yamato-daiwa/es-extensions";
import CrossBrowserIssueErrorLocalization__Japanese from "./CrossBrowserIssueErrorLocalization.japanese";


export default function localizeCrossBrowserIssueError(): void {
  CrossBrowserIssueError.localization = CrossBrowserIssueErrorLocalization__Japanese;
}

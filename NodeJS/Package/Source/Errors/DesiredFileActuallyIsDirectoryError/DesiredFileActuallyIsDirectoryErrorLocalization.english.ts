import type DesiredFileActuallyIsDirectoryError from "./DesiredFileActuallyIsDirectoryError";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const DesiredFileActuallyIsDirectoryErrorLocalization__English: DesiredFileActuallyIsDirectoryError.Localization = {
  defaultTitle: "Desired file actually is the directory",
  genericDescription:
      (namedParameters: DesiredFileActuallyIsDirectoryError.Localization.DescriptionTemplateNamedParameters): string =>
          `Contrary to expectations, path '${ namedParameters.targetPath }' refers to directory, not file.` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default DesiredFileActuallyIsDirectoryErrorLocalization__English;

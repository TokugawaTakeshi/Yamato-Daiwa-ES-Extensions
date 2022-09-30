import type ConfigFileNotFoundError from "./ConfigFileNotFoundError";
import insertSubstring from "../../Strings/insertSubstring";


const ConfigFileNotFoundErrorLocalization__English: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Configuration file not found",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {

    let messageCommonPart: string;

    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      messageCommonPart = `None of below '${ namedParameters.targetTechnologyName }' configuration files found.\n` +
          `${ namedParameters.configFilePathOrMultipleOfThem.join(", ") }`;
    } else {
      messageCommonPart = `The '${ namedParameters.targetTechnologyName }' configuration file not found at ` +
          `'${ namedParameters.configFilePathOrMultipleOfThem }'.`;
    }

    return `${ messageCommonPart }` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`;
  }
};


export default ConfigFileNotFoundErrorLocalization__English;

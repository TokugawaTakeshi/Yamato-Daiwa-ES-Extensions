import ConfigFileNotFoundError from "./ConfigFileNotFoundError";


const ConfigFileNotFoundErrorLocalization__English: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Configuration file not found",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {

    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      return `None of below '${namedParameters.targetTechnologyName}' configuration files found.\n` +
          `${namedParameters.configFilePathOrMultipleOfThem.join(", ")}`;
    }

    return `The '${namedParameters.targetTechnologyName}' configuration file not found at ` +
        `'${namedParameters.configFilePathOrMultipleOfThem}'.`;
  }
};


export default ConfigFileNotFoundErrorLocalization__English;
